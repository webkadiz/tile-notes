import React, {useEffect, useRef} from 'react'
import {useDispatch} from 'react-redux'
import cn from 'classnames/bind'
import TaskCard from '../TaskCard'
import TaskTextDisplay from '../TaskTextDisplay'
import TaskTitleInput from '../TaskTitleInput/TaskTitleInput'
import TaskContentInput from '../TaskContentInput'
import TaskPopupBackground from '../TaskPopupBackground'
import {
    type Task,
    updateTaskAction,
    updateTaskWithUpdatedAt,
    updateTaskWithStoring,
    removeTaskWithStoring,
    recalculateTasksAction,
} from '../../slices/task'
import {CARD_WIDTH, CARD_MARGIN} from '../../constants'
import {waitForElementTransition} from '../../utils'
import {type AppDispatch} from '../../store'
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
    const {
        task,
        task: {id},
        prevTask,
        recalculate,
        taskPerRow: perRow,
        idx,
    } = props
    const cardRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        console.log('use effect')
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
            updateTaskAction({
                id,
                offsetLeft,
                offsetTop,
                style: {
                    transform: `translateX(${offsetLeft}px) translateY(${offsetTop}px)`,
                },
            })
        )
    }, [task.isOpen, recalculate, prevTask.offsetTop, perRow])

    const openPopupCard = (e: React.MouseEvent) => {
        if (task.isOpen) return

        const {left = 0} = cardRef.current?.getBoundingClientRect() || {}
        const popupWidth = Math.min(window.innerWidth * 0.7, 600)
        const popupLeft = window.innerWidth / 2 - popupWidth / 2
        const totalTransformLeft = popupLeft - left + task.offsetLeft

        dispatch(
            updateTaskAction({
                id,
                isOpen: true,
                style: {
                    ...task.style,
                    transform: `translateX(${totalTransformLeft}px)`,
                    width: `${popupWidth}px`,
                },
            })
        )
    }

    const closePopupCard = () => {
        waitForElementTransition(cardRef.current as HTMLElement, () => {
            dispatch(recalculateTasksAction())
        })
        dispatch(updateTaskAction({id, isOpen: false}))
        dispatch(updateTaskWithStoring(id))
    }

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskWithUpdatedAt({id, title: e.target.value}))
    }

    const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateTaskWithUpdatedAt({id, content: e.target.value}))
    }

    const removeTaskHandler = () => {
        dispatch(removeTaskWithStoring(id))
    }

    return (
        <TaskCard
            ref={cardRef}
            elevation={task.isOpen ? 3 : 0}
            hoverElevation={1}
            style={task.style}
            className={cx('taskItemCard', {opened: task.isOpen})}
            withRemove
            isOpen={task.isOpen}
            onRemove={removeTaskHandler}
            onClick={openPopupCard}
        >
            <TaskPopupBackground
                isOpen={task.isOpen}
                closePopup={closePopupCard}
            />
            {task.isOpen ? (
                <>
                    <TaskTitleInput
                        value={task.title}
                        onChange={changeTitle}
                    />
                    <TaskContentInput
                        autoFocus
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
