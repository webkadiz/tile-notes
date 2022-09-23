import React, {useState, useEffect, useRef} from 'react'
import {useDispatch} from 'react-redux'
import cn from 'classnames/bind'
import TaskCard from '../TaskCard'
import TaskTextDisplay from '../TaskTextDisplay'
import TaskTitleInput from '../TaskTitleInput/TaskTitleInput'
import TaskContentInput from '../TaskContentInput'
import TaskPopupBackground from '../TaskPopupBackground'
import {updateTask, recalculateTasks, type Task} from '../../slices/task'
import {CARD_WIDTH, CARD_MARGIN} from '../../constants'
import styles from './index.module.scss'

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
    const cardRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('use effect')
        console.log(task.isOpen, task)
        if (task.isOpen === true) return
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
                height: cardRef.current.offsetHeight,
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
        dispatch(recalculateTasks())
        cardRef.current?.addEventListener('transitionend', () => {
            dispatch(recalculateTasks())
            // dispatch(updateTask({...task, height: cardRef.current?.offsetHeight || 0,isOpen: false}))
            console.log('end')
        })
        dispatch(updateTask({...task, isOpen: false}))
    }

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTask({...task, title: e.target.value}))
    }

    const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateTask({...task, content: e.target.value}))
    }

    return (
        <TaskCard
            ref={cardRef}
            elevation={task.isOpen ? 3 : 0}
            hoverElevation={1}
            style={task.style}
            className={cx('taskItemCard', {opened: task.isOpen})}
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
