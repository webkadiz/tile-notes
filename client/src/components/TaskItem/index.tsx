import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import cn from 'classnames/bind'
import TaskCard from '../TaskCard'
import TaskTextDisplay from '../TaskTextDisplay'
import TaskTitleInput from '../TaskTitleInput/TaskTitleInput'
import TaskContentInput from '../TaskContentInput'
import TaskModalBackground from '../TaskModalBackground'
import TaskToolbar from '../TaskToolbar'
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
    const [showToolbar, setShowToolbar] = useState(false)
    const [isToolbarPopupOpen, setIsToolbarPopupOpen] = useState(false)

    useEffect(() => {
        if (idx !== 0) return

        waitForElementTransition(cardRef.current, () => {
            dispatch(recalculateTasksAction())
        })
    }, [])

    useEffect(() => {
        if (!task.isOpen) return

        modalCardPositionUpdate()
    }, [perRow])

    useEffect(() => {
        if (!cardRef.current) return
        if (prevTask.isOpen || task.isOpen) return

        let offsetTop = 0
        const offsetLeftIdx = idx % perRow
        const offsetLeft = (CARD_WIDTH + CARD_MARGIN) * offsetLeftIdx

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

    const modalCardPositionUpdate = () => {
        const {left = 0} = cardRef.current?.getBoundingClientRect() || {}
        const modalWidth = Math.min(window.innerWidth * 0.7, 600)
        const modalLeft = window.innerWidth / 2 - modalWidth / 2
        const totalTransformLeft = modalLeft - left + task.offsetLeft

        dispatch(
            updateTaskAction({
                id,
                isOpen: true,
                offsetLeft: totalTransformLeft,
                style: {
                    ...task.style,
                    transform: `translateX(${totalTransformLeft}px)`,
                    width: `${modalWidth}px`,
                },
            })
        )
    }

    const openModalCard = (e: React.MouseEvent) => {
        if (task.isOpen) return

        modalCardPositionUpdate()
    }

    const closeModalCard = () => {
        waitForElementTransition(cardRef.current as HTMLElement, () => {
            dispatch(recalculateTasksAction())
        })
        dispatch(updateTaskAction({id, isOpen: false}))
        dispatch(updateTaskWithStoring(id))
        setShowToolbar(false)
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

    const cardMouseEnter = () => {
        setShowToolbar(true)
    }

    const cardMouseLeave = () => {
        setShowToolbar(false)
    }

    const toolbarPopupOpen = () => {
        setIsToolbarPopupOpen(true)
    }

    const toolbarPopupClose = () => {
        setIsToolbarPopupOpen(false)
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
            onClick={openModalCard}
            onMouseEnter={cardMouseEnter}
            onMouseLeave={cardMouseLeave}
            withToolbar
        >
            <TaskModalBackground
                isOpen={task.isOpen}
                closeModal={closeModalCard}
            />
            {task.isOpen ? (
                <>
                    <TaskTitleInput value={task.title} onChange={changeTitle} />
                    <TaskContentInput
                        autoFocus
                        value={task.content}
                        onChange={changeContent}
                    />
                    <TaskToolbar
                        onClose={closeModalCard}
                        task={task}
                        taskCardIdx={idx}
                    />
                </>
            ) : (
                <>
                    <TaskTextDisplay text={task.title} titleMode />
                    <TaskTextDisplay text={task.content} contentMode />
                    {(showToolbar || isToolbarPopupOpen) && (
                        <TaskToolbar
                            task={task}
                            onPopupOpen={toolbarPopupOpen}
                            onPopupClose={toolbarPopupClose}
                            taskCardIdx={idx}
                        />
                    )}
                </>
            )}
        </TaskCard>
    )
}
