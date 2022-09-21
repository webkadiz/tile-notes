import cn from 'classnames/bind'
import {InputHTMLAttributes} from 'react'
import styles from './index.module.scss'

type Props = {
    titleMode?: boolean
} & InputHTMLAttributes<Element>

const cx = cn.bind(styles)

export default function BaseTaskInput(props: Props) {
    const {titleMode, className} = props

    const classes = cx(
        {
            titleMode,
        },
        'w-100',
        className
    )

    return <input {...props} className={classes} />
}
