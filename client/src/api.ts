import axios from 'axios'
import type {TaskId, Task, TaskContents} from './slices/task'
import type {UserCreds, UserToken} from './slices/user'

type Response<T> = {
    error: boolean
    message: string
    data: T
}

const authHeader = () => {
    return {
        authorization: `bearer ${localStorage.getItem('token') || ''}`,
    }
}

const genHeaders = (headers: {[key: string]: string} = {}) => {
    return {
        ...authHeader(),
        ...headers,
    }
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

export const isAuth = () => {
    return axios.get<Response<undefined>>('/api/is-auth', {
        headers: genHeaders(),
    })
}

export const signup = (userCreds: UserCreds) => {
    return axios.post<Response<UserToken>>('/api/signup', userCreds)
}

export const signin = (userCreds: UserCreds) => {
    return axios.post<Response<UserToken>>('/api/signin', userCreds)
}
