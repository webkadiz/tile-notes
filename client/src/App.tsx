import {Provider} from 'react-redux'
import store from './store'
import './global.scss'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import TaskApp from './pages/TaskApp'
import Sign from './pages/Sign'

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/app" element={<TaskApp />} />
                    <Route path="/sign" element={<Sign />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </Provider>
    )
}

export default App
