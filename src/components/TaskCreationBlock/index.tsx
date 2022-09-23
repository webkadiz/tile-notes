import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {createTask} from '../../slices/task'
import BaseTaskInput from '../BaseTaskInput'
import TaskCard from '../TaskCard'
import TaskContentInput from '../TaskContentInput'
import TaskTitleInput from '../TaskTitleInput/TaskTitleInput'

import styles from './index.module.scss'

export default function TaskCreationBlock() {
    const [isFold, setIsFold] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const dispatch = useDispatch()

    const foldCardAndCreate = (e: MouseEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) {
            console.log(content, title)
            if (content || title) {
                dispatch(createTask({title, content}))
                setTitle('')
                setContent('')
            }

            setIsFold(true)
        }
    }

    const unfoldCard = () => {
        setIsFold(false)
    }

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value)

    const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setContent(e.target.value)

    useEffect(() => {
        window.addEventListener('click', foldCardAndCreate)

        return () => window.removeEventListener('click', foldCardAndCreate)
    })

    return (
        <div className={styles.taskCreationContainer} ref={containerRef}>
            <TaskCard
                className="w-100"
                elevation={isFold ? 1 : 2}
                hoverElevation={isFold ? 1 : 2}
            >
                {isFold && <BaseTaskInput onFocus={unfoldCard} />}
                {!isFold && (
                    <>
                        <TaskTitleInput
                            className="mb-2"
                            autoFocus
                            value={title}
                            onChange={changeTitle}
                        />
                        <TaskContentInput
                            value={content}
                            onChange={changeContent}
                        />
                    </>
                )}
            </TaskCard>
        </div>
    )
}
