import axios from 'axios'
import type {TaskId, Task, TaskContents} from './slices/task'

type Response<T> = {
    error: boolean
    message: string
    data: T
}

export const getTaskAllRequest = () => {
    return axios.get<Response<Task[]>>('/api/task')
}

export const createTaskRequest = (task: TaskContents) => {
    return axios.post<Response<Task>>('/api/task', {data: task})
}

export const updateTaskRequest = (task: Task) => {
    return axios.put<Response<undefined>>('/api/task', {data: task})
}

export const removeTaskRequest = (taskId: TaskId) => {
    return axios.delete<Response<undefined>>('/api/task', {data: {id: taskId}})
}
