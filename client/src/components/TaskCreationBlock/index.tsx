import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import type {AppDispatch} from '../../store'
import {createTaskWithStoring} from '../../slices/task'
import BaseTaskInput from '../BaseTaskInput'
import TaskCard from '../TaskCard'
import TaskContentInput from '../TaskContentInput'
import TaskTitleInput from '../TaskTitleInput/TaskTitleInput'
import TaskToolbar from '../TaskToolbar'
import styles from './index.module.scss'

export default function TaskCreationBlock() {
    const [isFold, setIsFold] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const dispatch = useDispatch<AppDispatch>()

    const createTask = () => {
        if (content || title) {
            dispatch(createTaskWithStoring({title, content}))
            setTitle('')
            setContent('')
        }
    }

    const foldCardAndCreate = () => {
        createTask()
        setIsFold(true)
    }

    const windowFoldCardAndCreate = (e: MouseEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) {
            foldCardAndCreate()
        }
    }

    const onCreateHandler = () => {
        createTask()

        const textareaContent = containerRef.current?.querySelector(
            '.textareaContent'
        ) as HTMLTextAreaElement

        textareaContent.focus()
    }

    const unfoldCard = () => {
        setIsFold(false)
    }

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value)

    const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setContent(e.target.value)

    useEffect(() => {
        window.addEventListener('click', windowFoldCardAndCreate)

        return () =>
            window.removeEventListener('click', windowFoldCardAndCreate)
    })

    return (
        <div className={styles.taskCreationContainer} ref={containerRef}>
            <TaskCard
                className="w-100"
                elevation={isFold ? 1 : 2}
                hoverElevation={isFold ? 1 : 2}
                withToolbar={!isFold}
            >
                {isFold && (
                    <BaseTaskInput
                        onFocus={unfoldCard}
                        placeholder="Заметка..."
                    />
                )}
                {!isFold && (
                    <>
                        <TaskTitleInput value={title} onChange={changeTitle} />
                        <TaskContentInput
                            autoFocus
                            placeholder="Заметка..."
                            value={content}
                            onChange={changeContent}
                        />
                        <TaskToolbar
                            onCreate={onCreateHandler}
                            onClose={foldCardAndCreate}
                        />
                    </>
                )}
            </TaskCard>
        </div>
    )
}
