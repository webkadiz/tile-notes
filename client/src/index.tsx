import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App'

axios.defaults.baseURL = 'http://localhost:4000'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
