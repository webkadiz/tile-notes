import React, {HTMLAttributes} from 'react'
import cn from 'classnames/bind'
import styles from './index.module.scss'

type Props = {
    elevation?: number
    hoverElevation?: number
    className?: string
    children?: React.ReactNode
} & HTMLAttributes<HTMLDivElement>

const cx = cn.bind(styles)

export default React.forwardRef(function TaskCard(
    props: Props,
    ref: React.Ref<HTMLDivElement>
) {
    const {
        elevation = 0,
        hoverElevation = elevation,
        className,
        ...restProps
    } = props

    const classes = cx(
        'card',
        `elevation-${elevation}`,
        `hoverElevation-${hoverElevation}`,
        className
    )

    return (
        <div className={classes} ref={ref} {...restProps}>
            {props.children}
        </div>
    )
})
