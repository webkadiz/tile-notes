import cn from 'classnames/bind'
import styles from './index.module.scss'

type Props = {
    onCreate?: (e: React.MouseEvent) => void
    onClose?: (e: React.MouseEvent) => void
}
const cx = cn.bind(styles)

export default function TaskToolbar(props: Props) {
    return (
        <div className={cx('toolbar')}>
            <div></div>
            <div>
                <button className="btn mr-1" onClick={props.onCreate}>Создать</button>
                <button className="btn" onClick={props.onClose}>Закрыть</button>
            </div>
        </div>
    )
}
