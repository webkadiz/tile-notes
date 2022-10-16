import axios from 'axios'
import type {TaskId, Task, TaskContents} from './slices/task'
import type {UserCreds, UserInfo, UserState, UserToken} from './slices/user'

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
    return axios.get<Response<Task[]>>('/api/task', {
        headers: genHeaders(),
    })
}

export const createTaskRequest = (task: TaskContents) => {
    return axios.post<Response<Task>>('/api/task', task, {
        headers: genHeaders(),
    })
}

export const updateTaskRequest = (task: Task) => {
    return axios.put<Response<undefined>>('/api/task', task, {
        headers: genHeaders(),
    })
}

export const removeTaskRequest = (taskId: TaskId) => {
    return axios.delete<Response<undefined>>('/api/task', {
        data: {
            id: taskId,
        },
        headers: genHeaders(),
    })
}

export const isAuth = () => {
    return axios.get<Response<undefined>>('/api/is-auth', {
        headers: genHeaders(),
    })
}

export const signup = (userCreds: UserCreds) => {
    return axios.post<Response<UserState>>('/api/signup', userCreds)
}

export const signin = (userCreds: UserCreds) => {
    return axios.post<Response<UserState>>('/api/signin', userCreds)
}

export const getUserInfo = () => {
    return axios.get<Response<UserInfo>>('/api/user-info', {
        headers: genHeaders(),
    })
}
