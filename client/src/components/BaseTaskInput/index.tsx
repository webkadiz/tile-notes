import {forwardRef, InputHTMLAttributes} from 'react'
import cn from 'classnames/bind'
import styles from './index.module.scss'

type Props = {
    titleMode?: boolean
} & InputHTMLAttributes<Element>

const cx = cn.bind(styles)

export default forwardRef<HTMLInputElement, Props>(function BaseTaskInput(
    props: Props,
    ref
) {
    const {titleMode, className, value, ...restProps} = props

    const classes = cx(
        {
            titleMode,
        },
        'baseInput',
        className
    )

    return <input className={classes} value={value} ref={ref} {...restProps} />
})
