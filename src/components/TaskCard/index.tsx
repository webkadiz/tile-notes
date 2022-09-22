import React, {HTMLAttributes} from 'react'
import cn from 'classnames/bind'
import styles from './index.module.scss'

type Props = {
    flat?: boolean
    className?: string
    children?: React.ReactNode
} & HTMLAttributes<HTMLDivElement>

const cx = cn.bind(styles)

export default React.forwardRef(function TaskCard(
    props: Props,
    ref: React.Ref<HTMLDivElement>
) {
    const {flat, className, ...restProps} = props

    const classes = cx(
        {
            flat,
        },
        'card',
        className
    )

    return (
        <div className={classes} ref={ref} {...restProps}>
            {props.children}
        </div>
    )
})
