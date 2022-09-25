import styles from './index.module.scss'

type Props = {
    onFocus: () => void
}

export default function TaskInput(props: Props) {
    return (
        <input
            className={styles.taskInput}
            placeholder="Заметка..."
            {...props}
        />
    )
}
