import React, {HTMLAttributes} from 'react'
import cn from 'classnames/bind'
import styles from './index.module.scss'

type Props = {
    elevation?: number
    hoverElevation?: number
    withClose?: boolean
    onClose?: () => void
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
        withClose = false,
        onClose,
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
            {withClose && <button className={cx('closeBtn')} onClick={onClose}><i className="fa-solid fa-xmark"></i></button>}
            {props.children}
        </div>
    )
})
