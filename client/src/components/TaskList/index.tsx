import {useSelector} from 'react-redux'
import {useMediaQuery} from 'react-responsive'
import {selectRecalculate, selectTasks} from '../../slices/task'
import TaskItem from '../TaskItem'
import {
    ONE_CARD_PER_ROW_BREAKPOINT,
    TWO_CARD_PER_ROW_BREAKPOINT,
} from '../../constants'
import styles from './index.module.scss'

export default function TaskList() {
    const tasks = useSelector(selectTasks)
    const recalculate = useSelector(selectRecalculate)
    let taskPerRow = 3
    taskPerRow = useMediaQuery({maxWidth: TWO_CARD_PER_ROW_BREAKPOINT})
        ? 2
        : taskPerRow
    taskPerRow = useMediaQuery({maxWidth: ONE_CARD_PER_ROW_BREAKPOINT})
        ? 1
        : taskPerRow

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
