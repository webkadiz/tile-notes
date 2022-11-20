import {Provider} from 'react-redux'
import store from './store'
import './global.scss'
import Router from './components/Router'
import 'antd/dist/antd.css'

function App() {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    )
}

export default App
