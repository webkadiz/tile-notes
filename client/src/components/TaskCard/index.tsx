import React, {HTMLAttributes} from 'react'
import cn from 'classnames/bind'
import styles from './index.module.scss'

type Props = {
    elevation?: number
    hoverElevation?: number
    isOpen?: boolean
    withToolbar?: boolean
    withRemove?: boolean
    onRemove?: () => void
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
        isOpen,
        withToolbar = false,
        withRemove = false,
        onRemove,
        className,
        ...restProps
    } = props

    const classes = cx(
        withToolbar && 'withToolbar',
        'card',
        `elevation-${elevation}`,
        `hoverElevation-${hoverElevation}`,
        className
    )

    return (
        <div className={classes} ref={ref} {...restProps}>
            {!isOpen && withRemove && (
                <button className={cx('removeBtn')} onClick={onRemove} aria-label="Close Icon">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            )}
            {props.children}
        </div>
    )
})
