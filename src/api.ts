import axios from 'axios'
import type {TaskId, Task} from './slices/task'

type Response<T> = {
    error: boolean
    message: string
    data: T
}

export const getTaskAllRequest = () => {
    return axios.get<Response<Task[]>>('/api/task')
}

export const createTaskRequest = (task: Pick<Task, 'title' | 'content'>) => {
    return axios.post<Response<Task>>('/api/task', {data: task})
}

export const updateTaskRequest = (task: Task) => {
    return axios.put<Response<undefined>>('/api/task', {data: task})
}

export const removeTaskRequest = (taskId: Task['id']) => {
    return axios.delete<Response<undefined>>('/api/task', {data: {id: taskId}})
}
