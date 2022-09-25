import React from 'react'
import {useSelector} from 'react-redux'
import {useMediaQuery} from 'react-responsive'
import {selectRecalculate, selectTasks} from '../../slices/task'
import TaskItem from '../TaskItem'
import styles from './index.module.scss'

export default function TaskList() {
    const tasks = useSelector(selectTasks)
    const recalculate = useSelector(selectRecalculate)
    let taskPerRow = 3
    taskPerRow = useMediaQuery({maxWidth: 780}) ? 2 : taskPerRow
    taskPerRow = useMediaQuery({maxWidth: 530}) ? 1 : taskPerRow

    return (
        <div className={styles.container}>
            {tasks.map((task, idx) => (
                <TaskItem
                    prevTask={tasks[idx - taskPerRow] || {}}
                    task={task}
                    recalculate={recalculate}
                    key={task.id}
                    taskPerRow={taskPerRow}
                    idx={idx}
                />
            ))}
        </div>
    )
}
