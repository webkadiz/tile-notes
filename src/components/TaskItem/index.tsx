import React, {useState, useEffect, useRef} from 'react'
import {useDispatch} from 'react-redux'
import cn from 'classnames/bind'
import TaskCard from '../TaskCard'
import TaskTextDisplay from '../TaskTextDisplay'
import TaskTitleInput from '../TaskTitleInput/TaskTitleInput'
import TaskContentInput from '../TaskContentInput'
import TaskPopupBackground from '../TaskPopupBackground'
import {updateTask, removeTask, recalculateTasks, type Task} from '../../slices/task'
import {CARD_WIDTH, CARD_MARGIN} from '../../constants'
import {usePrevious} from '../../hooks'
import styles from './index.module.scss'
import { waitForElementTransition } from '../../utils'

type Props = {
    task: Task
    prevTask: Task
    recalculate: number
    taskPerRow: number
    idx: number
}

const cx = cn.bind(styles)

export default function TaskItem(props: Props) {
    const {task, prevTask, recalculate, taskPerRow: perRow, idx} = props
    const prevIsOpen = usePrevious(task.isOpen)
    const cardRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('use effect')
        console.log(task.isOpen, prevIsOpen, 'open', task.id)
        if (task.isOpen || prevTask.isOpen) return
        if (!cardRef.current) return

        let offsetTop = 0
        const offsetLeftIdx = idx % perRow
        const offsetLeft = (CARD_WIDTH + CARD_MARGIN) * offsetLeftIdx

        console.log(prevTask)
        let elementAbove = cardRef.current
        for (let i = 0; i < perRow; i++) {
            elementAbove =
                elementAbove &&
                (elementAbove.previousElementSibling as HTMLDivElement)
        }

        if (elementAbove) {
            offsetTop =
                prevTask.offsetTop + elementAbove.offsetHeight + CARD_MARGIN
        }

        console.log(cardRef.current.offsetHeight)
        dispatch(
            updateTask({
                ...task,
                // height: cardRef.current.offsetHeight,
                offsetLeft,
                offsetTop,
                style: {
                    transform: `translateX(${offsetLeft}px) translateY(${offsetTop}px)`,
                },
            })
        )
    }, [task.isOpen, recalculate, prevTask.offsetTop, prevTask.height, perRow])

    const openPopupCard = (e: React.MouseEvent) => {
        if (task.isOpen) return

        const {left = 0, width} = cardRef.current?.getBoundingClientRect() || {}
        const popupLeft = window.innerWidth / 2 - 300
        const totalTransformLeft = popupLeft - left + task.offsetLeft
        console.log(left, popupLeft, totalTransformLeft)

        dispatch(
            updateTask({
                ...task,
                isOpen: true,
                style: {
                    ...task.style,
                    transform: `translateX(${totalTransformLeft}px)`,
                    width: '600px',
                },
            })
        )
    }

    const closePopupCard = () => {
        waitForElementTransition(cardRef.current as HTMLElement, () => {
            console.log('end')
            console.log(task)
            dispatch(recalculateTasks())
        })
        dispatch(updateTask({...task, isOpen: false}))
    }

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTask({...task, title: e.target.value}))
    }

    const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateTask({...task, content: e.target.value}))
    }

    const removeTaskHandler = () => {
        dispatch(removeTask(task.id))
    }

    return (
        <TaskCard
            ref={cardRef}
            elevation={task.isOpen ? 3 : 0}
            hoverElevation={1}
            style={task.style}
            className={cx('taskItemCard', {opened: task.isOpen})}
            withClose
            onClose={removeTaskHandler}
            onClick={openPopupCard}
        >
            <TaskPopupBackground
                isOpen={task.isOpen}
                closePopup={closePopupCard}
            />
            {task.isOpen ? (
                <>
                    <TaskTitleInput value={task.title} onChange={changeTitle} />
                    <TaskContentInput
                        value={task.content}
                        onChange={changeContent}
                    />
                </>
            ) : (
                <>
                    <TaskTextDisplay text={task.title} titleMode />
                    <TaskTextDisplay text={task.content} contentMode />
                </>
            )}
        </TaskCard>
    )
}
