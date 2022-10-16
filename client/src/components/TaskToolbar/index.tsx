import cn from 'classnames/bind'
import CoAuthorIcon from '../../icons/CoAuthorIcon'
import styles from './index.module.scss'

type Props = {
    onCreate?: (e: React.MouseEvent) => void
    onClose?: (e: React.MouseEvent) => void
}

const cx = cn.bind(styles)

export default function TaskToolbar(props: Props) {
    const {onClose, onCreate} = props

    return (
        <div className={cx('toolbar')}>
            <div>
                <CoAuthorIcon />
            </div>
            <div>
                {onCreate && (
                    <button className="btn mr-1" onClick={onCreate}>
                        Создать
                    </button>
                )}
                {onClose && (
                    <button className="btn" onClick={onClose}>
                        Закрыть
                    </button>
                )}
            </div>
        </div>
    )
}
