import {createAsyncThunk} from '@reduxjs/toolkit'
import {differenceBy, intersectionBy, property, find} from 'lodash'
import * as api from '../../api'
import type {RootState} from '../../store'
import {
    createTaskWithDefaults,
    localStorageCreateTask,
    localStorageGetTaskAll,
    localStorageRemoveTask,
    localStorageUpdateTask,
} from './utils'
import {
    type TaskId,
    type Task,
    type TaskContents,
    setTasksAction,
    createTaskAction,
    updateTaskAction,
    removeTaskAction,
} from './slice'

export const syncTasks = createAsyncThunk(
    'task/syncTasks',
    async (_, {dispatch}) => {
        const tasksLocal = localStorageGetTaskAll()

        try {
            const response = (await api.getTaskAllRequest()).data

            if (response.error) throw new Error(response.message)

            const tasksServer = response.data

            if (tasksLocal.length) {
                const tasksForCreate = differenceBy(
                    tasksLocal,
                    tasksServer,
                    property('id')
                )
                const tasksForDelete = differenceBy(
                    tasksServer,
                    tasksLocal,
                    property('id')
                )
                const tasksForUpdate = intersectionBy(
                    tasksLocal,
                    tasksServer,
                    property('id')
                )

                for (const task of tasksForCreate) {
                    api.createTaskRequest(task)
                }

                for (const task of tasksForDelete) {
                    api.removeTaskRequest(task.id)
                }

                for (const task of tasksForUpdate) {
                    api.updateTaskRequest(task)
                }

                dispatch(setTasksAction(tasksLocal))
            } else {
                dispatch(setTasksAction(tasksServer))
            }
        } catch (e) {
            dispatch(setTasksAction(tasksLocal))
        }
    }
)

export const createTaskWithStoring = createAsyncThunk(
    'task/createTaskWithStoring',
    async (taskContents: TaskContents, {dispatch}) => {
        const task = createTaskWithDefaults(taskContents)

        dispatch(createTaskAction(task))

        try {
            const response = (await api.createTaskRequest(task)).data

            if (response.error) throw new Error()
        } catch (e) {}

        localStorageCreateTask(task)
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
            const response = (await api.updateTaskRequest(task)).data

            if (response.error) throw new Error()
        } catch (e) {}

        localStorageUpdateTask(task)
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
    async (taskId: TaskId, {dispatch}) => {
        dispatch(removeTaskAction(taskId))

        try {
            const response = (await api.removeTaskRequest(taskId)).data

            if (response.error) throw new Error()
        } catch (e) {}

        localStorageRemoveTask(taskId)
    }
)
