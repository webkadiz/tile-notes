import {CSSProperties} from 'react'
import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import {find, findIndex} from 'lodash'
import type {RootState} from '../../store'
import {localStorageUpdateTask} from './utils'

export type TaskId = string

export type Task = {
    id: TaskId
    title: string
    content: string
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    coauthors: Coauthor[]
    isOpen: boolean
    height: number
    offsetLeft: number
    offsetTop: number
    style: CSSProperties
}

export type Coauthor = {
    login: string
    scope: string
}

export type CoauthorPayload = {
    taskId: TaskId
    login: Coauthor['login']
}

export type TaskContents = Pick<Task, 'title' | 'content'>

export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        recalculate: 0,
        tasks: [] as Task[],
    },
    reducers: {
        setTasks(state, {payload: tasks}: PayloadAction<Task[]>) {
            state.tasks = tasks
        },
        createTask(state, {payload: task}: PayloadAction<Task>) {
            state.tasks.unshift(task)

            state.recalculate++
        },
        updateTask(
            state,
            {payload: updatedTask}: PayloadAction<Partial<Task>>
        ) {
            const taskIdx = findIndex(state.tasks, {id: updatedTask.id})

            state.tasks[taskIdx] = {
                ...state.tasks[taskIdx],
                ...updatedTask,
            }
        },
        removeTask(state, {payload: taskId}: PayloadAction<TaskId>) {
            state.tasks = state.tasks.filter((task) => task.id !== taskId)

            state.recalculate++
        },
        addCoauthor(state, {payload}: PayloadAction<CoauthorPayload>) {
            const task = find(state.tasks, {id: payload.taskId})

            if (!task) return

            task.coauthors.push({login: payload.login, scope: 'editor'})
            localStorageUpdateTask(task)
        },
        removeCoauthor(state, {payload}: PayloadAction<CoauthorPayload>) {
            const task = find(state.tasks, {id: payload.taskId})

            if (!task) return

            task.coauthors = task.coauthors.filter(
                (coauthor) => coauthor.login !== payload.login
            )
            localStorageUpdateTask(task)
        },
        recalculateTasks(state) {
            state.recalculate++
        },
    },
})

export const {
    setTasks: setTasksAction,
    createTask: createTaskAction,
    updateTask: updateTaskAction,
    removeTask: removeTaskAction,
    addCoauthor: addCoauthorAction,
    removeCoauthor: removeCoauthorAction,
    recalculateTasks: recalculateTasksAction,
} = taskSlice.actions

export const selectTasks = (state: RootState) => state.task.tasks
export const selectRecalculate = (state: RootState) => state.task.recalculate

export default taskSlice.reducer
