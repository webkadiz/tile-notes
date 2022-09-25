import axios from 'axios'
import store from './store'
import {syncTasks} from './slices/task'

axios.defaults.baseURL = 'http://localhost:4000'

store.dispatch(syncTasks())

setInterval(() => {
    store.dispatch(syncTasks())
}, 1000 * 60 * 30)
