import {v4 as uuidv4} from 'uuid'
import {differenceBy, intersectionBy, property, findIndex, sortBy} from 'lodash'
import * as api from '../../api'
import type {TaskId, Task, TaskContents} from './slice'
import socketService from '../../services/socket-service'

export const createTaskWithDefaults = (task: TaskContents) => {
    const id = uuidv4()
    const date = new Date().toISOString()
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

    return {
        ...task,
        id,
        isDeleted: false,
        createdAt: date,
        updatedAt: date,
        isOpen: false,
        height: 0,
        offsetLeft: 0,
        offsetTop: 0,
        style: {},
        coauthors: [{login: userInfo.login, scope: 'own'}],
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

export const syncCreatedTasks = async (tasksLocal: Task[], tasksServer: Task[]) => {
    const newLocalTasks = sortBy(differenceBy(tasksLocal, tasksServer, property('id')), ['id'])
    const newServerTasks = sortBy(differenceBy(tasksServer, tasksLocal, property('id')), ['id'])
    console.log(newLocalTasks, newServerTasks, 'server new')

    for (const task of newLocalTasks) {
        if (task.isDeleted) continue

        await api.createTaskRequest(task)
        socketService.getSocket()?.emit('taskChanging', {taskId: task.id})
    }

    return [...newLocalTasks, ...newServerTasks]
}

export const syncUpdatedTasks = async (tasksLocal: Task[], tasksServer: Task[]) => {
    const tasks = []
    const tasksLocalForUpdate = sortBy(intersectionBy(
        tasksLocal,
        tasksServer,
        property('id')
    ), ['id'])
    const tasksServerForUpdate = sortBy(intersectionBy(
        tasksServer,
        tasksLocal,
        property('id')
    ), ['id'])

    console.log(tasksLocalForUpdate, tasksServerForUpdate, 'diff')

    for (let i = 0; i < tasksLocalForUpdate.length; i++) {
        if (
            new Date(tasksLocalForUpdate[i].updatedAt) >
            new Date(tasksServerForUpdate[i].updatedAt)
        ) {
            if (tasksLocalForUpdate[i].isDeleted) {
                await api.removeTaskRequest(tasksLocalForUpdate[i].id)
            } else {
                await api.updateTaskRequest(tasksLocalForUpdate[i])
            }

            socketService.getSocket()?.emit('taskChanging', {taskId: tasksLocalForUpdate[i].id})
            tasks.push(tasksLocalForUpdate[i])
        } else {
            tasks.push(tasksServerForUpdate[i])
        }
    }

    console.log(tasks, 'for update')
    return tasks
}
