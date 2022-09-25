import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App'
import store from './store'
import {syncTasks} from './slices/task'

axios.defaults.baseURL = 'http://localhost:4000'

store.dispatch(syncTasks())
setInterval(() => {
    store.dispatch(syncTasks())
}, 1000 * 60 * 30)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
