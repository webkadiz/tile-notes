import React from 'react'
import {useSelector} from 'react-redux'
import cn from 'classnames'
import {selectTasks} from '../../slices/task'
import TaskItem from '../TaskItem'
import styles from './index.module.scss'

export default function TaskList() {
    const tasks = useSelector(selectTasks)

    const taskPerRow = 3

    return (
        <div className={styles.container}>
            {tasks.map((task, idx) => (
                <TaskItem
                    task={task}
                    key={task.id}
                    taskPerRow={taskPerRow}
                    idx={idx}
                />
            ))}
        </div>
    )
}
