import {CSSProperties} from 'react'
import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import {findIndex, remove, matches} from 'lodash'
import type {RootState} from '../../store'

export type TaskId = string

export type Task = {
    id: TaskId
    title: string
    content: string
    createdAt: string
    updatedAt: string
    isOpen: boolean
    height: number
    offsetLeft: number
    offsetTop: number
    style: CSSProperties
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
    recalculateTasks: recalculateTasksAction,
} = taskSlice.actions

export const selectTasks = (state: RootState) => state.task.tasks
export const selectRecalculate = (state: RootState) => state.task.recalculate

export default taskSlice.reducer
