import TaskCreationBlock from '../components/TaskCreationBlock'
import TaskList from '../components/TaskList'

export default function TaskApp() {
    return (
        <div className="app">
            <TaskCreationBlock />
            <TaskList />
        </div>
    )
}
