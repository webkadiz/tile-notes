import {CSSProperties} from 'react'
import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../store'

export type Task = {
    id: number
    title: string
    content: string
    isOpen: boolean
    offsetLeft: number
    offsetTop: number
    style: CSSProperties
}

export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [
            {
                id: 1,
                title: 'test1',
                content: 'content 1 434',
                isOpen: false,
                offsetLeft: 0,
                offsetTop: 0,
                style: {},
            },
            {
                id: 2,
                title: 'export const taskSlice',
                content:
                    '// Action creators are generated for each case reducer function \nexport const {increment, decrement, incrementByAmount} = counterSlice.actions',
                isOpen: false,
                offsetLeft: 0,
                offsetTop: 0,
                style: {},
            },
            {
                id: 3,
                title: 'test1 aa',
                content:
                    'content 1 434 \nffffff\naaaaaa\nfdfdfdfdf\n\n\n\nsdfsdf\n',
                isOpen: false,
                offsetLeft: 0,
                offsetTop: 0,
                style: {},
            },
            {
                id: 4,
                title: 'test1 fsdfsdfxcv',
                content: 'content 1 434',
                isOpen: false,
                offsetLeft: 0,
                offsetTop: 0,
                style: {},
            },
            {
                id: 5,
                title: 'test1 sdfasdf sdfg sdfg sdfgsdfgsdfgsdfgsdf sdfg sdf sdf sdf sdf',
                content: 'content 1 434',
                isOpen: false,
                offsetLeft: 0,
                offsetTop: 0,
                style: {},
            },
            {
                id: 6,
                title: 'test1 sdfadfsfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf',
                content: 'content 1 434',
                isOpen: false,
                offsetLeft: 0,
                offsetTop: 0,
                style: {},
            },
        ],
    },
    reducers: {
        updateTask(state, {payload: updatedTask}: PayloadAction<Task>) {
            const taskIdx = state.tasks.findIndex(
                (task) => task.id === updatedTask.id
            )

            if (~taskIdx) {
                state.tasks[taskIdx] = updatedTask
            }
        },
    },
})

export const {updateTask} = taskSlice.actions

export const selectTasks = (state: RootState) => state.task.tasks

export default taskSlice.reducer
