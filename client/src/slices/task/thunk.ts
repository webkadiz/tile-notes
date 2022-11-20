import {createAsyncThunk} from '@reduxjs/toolkit'
import {find} from 'lodash'
import * as api from '../../api'
import type {RootState} from '../../store'
import {
    createTaskWithDefaults,
    localStorageCreateTask,
    localStorageGetTaskAll,
    localStorageRemoveTask,
    localStorageUpdateTask,
    syncCreatedTasks,
    syncUpdatedTasks,
} from './utils'
import {
    type TaskId,
    type Task,
    type TaskContents,
    type Coauthor,
    setTasksAction,
    createTaskAction,
    updateTaskAction,
    removeTaskAction,
    addCoauthorAction,
    CoauthorPayload,
    removeCoauthorAction,
} from './slice'
import { selectSocket } from '../app'
import socketService from '../../services/socket-service'

export const syncTasks = createAsyncThunk(
    'task/syncTasks',
    async (_, {dispatch}) => {
        const tasksLocal = localStorageGetTaskAll()

        try {
            const response = (await api.getTaskAllRequest()).data

            if (response.error) throw new Error(response.message)

            if (!response) return

            const tasksServer = response.data
            const tasks = [
                ...(await syncCreatedTasks(tasksLocal, tasksServer)),
                ...(await syncUpdatedTasks(tasksLocal, tasksServer)),
            ]

            console.log('synced', tasks)

            dispatch(setTasksAction(tasks))

            localStorage.setItem('tasks', JSON.stringify(tasks))
        } catch (e) {
            dispatch(setTasksAction(tasksLocal))
        }
    }
)

export const createTaskWithStoring = createAsyncThunk(
    'task/createTaskWithStoring',
    async (taskContents: TaskContents, {dispatch, getState}) => {
        const task = createTaskWithDefaults(taskContents)

        try {
            localStorageCreateTask(task)
            dispatch(createTaskAction(task))

            const response = (await api.createTaskRequest(task)).data

            if (response.error) throw new Error(response.message)

            socketService.getSocket()?.emit('taskChanging', {taskId: task.id})
        } catch (e) {
            return (e as Error).message
        }
    }
)

export const updateTaskWithStoring = createAsyncThunk(
    'task/updateTaskWithStoring',
    async (taskId: TaskId, {getState, dispatch}) => {
        const state = getState() as RootState
        const tasks = state.task.tasks
        const task = find(tasks, {id: taskId})

        if (!task) return

        try {
            localStorageUpdateTask(task)

            const response = (await api.updateTaskRequest(task)).data

            if (response.error) throw new Error(response.message)

            socketService.getSocket()?.emit('taskChanging', {taskId: task.id})
        } catch (e) {
            return (e as Error).message
        }
    }
)

export const updateTaskWithUpdatedAt = createAsyncThunk(
    'task/updateTaskWithUpdatedAt',
    (
        task: {
            id: Task['id']
            title?: Task['title']
            content?: Task['content']
        },
        {dispatch}
    ) => {
        dispatch(
            updateTaskAction({...task, updatedAt: new Date().toISOString()})
        )
    }
)

export const removeTaskWithStoring = createAsyncThunk(
    'task/removeTaskWithStoring',
    async (taskId: TaskId, {dispatch, getState}) => {
        try {
            localStorageRemoveTask(taskId)
            dispatch(removeTaskAction(taskId))

            const response = (await api.removeTaskRequest(taskId)).data

            if (response.error) throw new Error(response.message)

            socketService.getSocket()?.emit('taskChanging', {taskId})
        } catch (e) {
            return (e as Error).message
        }
    }
)

export const addCoauthor = createAsyncThunk(
    'task/addCoauthor',
    async (payload: CoauthorPayload, {dispatch, getState}) => {
        const state = getState() as RootState
        const task = state.task.tasks.find((task) => task.id === payload.taskId)

        if (!task) return

        try {
            const response = (await api.addCoauthor(payload)).data

            if (response.error) throw new Error(response.message)

            dispatch(addCoauthorAction(payload))
            socketService.getSocket()?.emit('addCoauthor', {taskId: task.id, login: payload.login})
        } catch (e) {
            return (e as Error).message
        }
    }
)

export const removeCoauthor = createAsyncThunk(
    'task/removeCoauthor',
    async (payload: CoauthorPayload, {dispatch, getState}) => {
        const state = getState() as RootState
        const task = state.task.tasks.find((task) => task.id === payload.taskId)

        if (!task) return

        try {
            const response = (await api.removeCoauthor(payload)).data

            if (response.error) throw new Error(response.message)

            dispatch(removeCoauthorAction(payload))
            socketService.getSocket()?.emit('removeCoauthor', {taskId: task.id, login: payload.login})
        } catch (e) {
            return (e as Error).message
        }
    }
)
