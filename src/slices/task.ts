import {CSSProperties} from 'react'
import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../store'

export type Task = {
    id: number
    title: string
    content: string
    isOpen: boolean
    height: number
    offsetLeft: number
    offsetTop: number
    style: CSSProperties
}

export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        recalculate: 0,
        tasks: [
            {
                id: 1,
                title: 'test1',
                content: 'content 1 434',
                isOpen: false,
                height: 0,
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
                height: 0,
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
                height: 0,
                offsetLeft: 0,
                offsetTop: 0,
                style: {},
            },
            {
                id: 4,
                title: 'test1 fsdfsdfxcv',
                content: 'content 1 434',
                isOpen: false,
                height: 0,
                offsetLeft: 0,
                offsetTop: 0,
                style: {},
            },
            {
                id: 5,
                title: 'test1 sdfasdf sdfg sdfg sdfgsdfgsdfgsdfgsdf sdfg sdf sdf sdf sdf',
                content: 'content 1 434',
                isOpen: false,
                height: 0,
                offsetLeft: 0,
                offsetTop: 0,
                style: {},
            },
            {
                id: 6,
                title: 'test1 sdfadfsfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf',
                content: 'content 1 434',
                isOpen: false,
                height: 0,
                offsetLeft: 0,
                offsetTop: 0,
                style: {},
            },
            {
                id: 7,
                title: 'test1 sdfadfsfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsssd dfsdf',
                content: 'cccc 34 asdfasdf\n\nadsfasdfasdf\n\nfsdfsdf',
                isOpen: false,
                height: 0,
                offsetLeft: 0,
                offsetTop: 0,
                style: {},
            },
        ],
    },
    reducers: {
        createTask(
            state,
            {
                payload: {title, content},
            }: PayloadAction<Pick<Task, 'title' | 'content'>>
        ) {
            const id = Math.floor(Math.random() * 1000)

            state.tasks.unshift({
                id,
                title,
                content,
                isOpen: false,
                height: 0,
                offsetLeft: 0,
                offsetTop: 0,
                style: {},
            })

            state.recalculate++
        },
        updateTask(state, {payload: updatedTask}: PayloadAction<Task>) {
            console.log(updatedTask.id)
            const taskIdx = state.tasks.findIndex(
                (task) => task.id === updatedTask.id
            )

            if (~taskIdx) {
                state.tasks[taskIdx] = updatedTask
            }
        },
        recalculateTasks(state) {
            state.recalculate++
        },
    },
    extraReducers: {
        'task/createTask': (state) => {
            console.log('extra')
            state.recalculate++
        },
    },
})

export const {createTask, updateTask, recalculateTasks} = taskSlice.actions
console.log(taskSlice.actions)

export const selectTasks = (state: RootState) => state.task.tasks
export const selectRecalculate = (state: RootState) => state.task.recalculate

export default taskSlice.reducer
