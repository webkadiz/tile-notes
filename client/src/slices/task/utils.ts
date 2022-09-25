import {v4 as uuidv4} from 'uuid'
import {findIndex} from 'lodash'
import type {TaskId, Task, TaskContents} from './slice'

export const createTaskWithDefaults = (task: TaskContents) => {
    const id = uuidv4()
    const date = new Date().toISOString()

    return {
        ...task,
        id,
        createdAt: date,
        updatedAt: date,
        isOpen: false,
        height: 0,
        offsetLeft: 0,
        offsetTop: 0,
        style: {},
    }
}

export const localStorageGetTaskAll = () => {
    const tasksLocal = JSON.parse(localStorage.getItem('tasks') || '[]')

    return tasksLocal
}

export const localStorageCreateTask = (task: Task) => {
    const tasksLocal = JSON.parse(localStorage.getItem('tasks') || '[]')

    tasksLocal.unshift(task)

    localStorage.setItem('tasks', JSON.stringify(tasksLocal))
}

export const localStorageUpdateTask = (task: Task) => {
    const tasksLocal = JSON.parse(localStorage.getItem('tasks') || '[]')
    const taskForUpdateIdx = findIndex(tasksLocal, {id: task.id})

    tasksLocal[taskForUpdateIdx] = task

    localStorage.setItem('tasks', JSON.stringify(tasksLocal))
}

export const localStorageRemoveTask = (taskId: TaskId) => {
    const tasksLocal = JSON.parse(localStorage.getItem('tasks') || '[]')
    const tasksLocalRest = tasksLocal.filter((task: Task) => task.id !== taskId)

    localStorage.setItem('tasks', JSON.stringify(tasksLocalRest))
}
