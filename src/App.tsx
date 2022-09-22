import React from 'react'
import {Provider} from 'react-redux'
import store from './store'
import './global.scss'
import TaskCreationBlock from './components/TaskCreationBlock'
import TaskList from './components/TaskList'

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <TaskCreationBlock />
                <TaskList />
            </div>
        </Provider>
    )
}

export default App
