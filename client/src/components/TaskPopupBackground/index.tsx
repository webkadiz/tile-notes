import ReactDOM from 'react-dom'
import cn from 'classnames/bind'
import styles from './index.module.scss'

type Props = {
    isOpen: boolean
    closePopup: () => void
}

const cx = cn.bind(styles)

export default function TaskPopupBackground(props: Props) {
    const {isOpen, closePopup} = props

    return ReactDOM.createPortal(
        <div
            className={cx('overlay', {opened: isOpen})}
            onClick={closePopup}
        ></div>,
        document.querySelector('#task-popup') as Element
    )
}
