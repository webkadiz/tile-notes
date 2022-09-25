import ReactDOM from 'react-dom'
import cn from 'classnames/bind'
import styles from './index.module.scss'

type Props = {
    isOpen: boolean
    closeModal: () => void
}

const cx = cn.bind(styles)

export default function TaskModalBackground(props: Props) {
    const {isOpen, closeModal} = props

    return ReactDOM.createPortal(
        <div
            className={cx('overlay', {opened: isOpen})}
            onClick={closeModal}
        ></div>,
        document.querySelector('#task-popup') as Element
    )
}
