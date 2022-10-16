import {Provider} from 'react-redux'
import store from './store'
import './global.scss'
import Router from './components/Router'

function App() {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    )
}

export default App
