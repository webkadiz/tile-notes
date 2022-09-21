import React, {useEffect, useRef, useState} from 'react'
import BaseTaskInput from '../BaseTaskInput'
import TaskCard from '../TaskCard'
import TaskContentInput from '../TaskContentInput'
import TaskTitleInput from '../TaskTitleInput/TaskTitleInput'

import styles from './index.module.scss'

export default function TaskCreationBlock() {
    const [isFold, setIsFold] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)

    const foldCard = (e: MouseEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) setIsFold(true)
    }

    const unfoldCard = () => {
        setIsFold(false)
    }

    useEffect(() => {
        window.addEventListener('click', foldCard)

        return () => window.removeEventListener('click', foldCard)
    }, [])

    return (
        <div className={styles.taskCreationContainer} ref={containerRef}>
            <TaskCard className="w-100">
                {isFold && <BaseTaskInput onFocus={unfoldCard} />}
                {!isFold && (
                    <>
                        <TaskTitleInput className="mb-2" autoFocus />
                        <TaskContentInput />
                    </>
                )}
            </TaskCard>
        </div>
    )
}
