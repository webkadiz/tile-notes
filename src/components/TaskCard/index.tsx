import cn from 'classnames'
import React from 'react'

import styles from './index.module.scss'

type Props = {
    className?: string
    children?: React.ReactNode
}

export default function TaskCard(props: Props) {
    return (
        <div className={cn(styles.card, props.className)}>{props.children}</div>
    )
}
