import React, {HTMLAttributes, useRef} from 'react'
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
    onClick?: (e: React.MouseEvent) => void
    children?: React.ReactNode
} & HTMLAttributes<HTMLDivElement>

const cx = cn.bind(styles)

export default React.forwardRef(function TaskCard(
    props: Props,
    ref: React.ForwardedRef<HTMLDivElement>
) {
    const removeBtnRef = useRef<HTMLButtonElement>(null)

    const {
        elevation = 0,
        hoverElevation = elevation,
        isOpen,
        withToolbar = false,
        withRemove = false,
        onRemove,
        className,
        onClick = (e: React.MouseEvent) => {},
        ...restProps
    } = props

    const classes = cx(
        withToolbar && 'withToolbar',
        'card',
        `elevation-${elevation}`,
        `hoverElevation-${hoverElevation}`,
        className
    )

    const onClickHandler = (e: React.MouseEvent) => {
        if (ref && 'current' in ref && ref.current?.contains(removeBtnRef.current)) return

        onClick(e)
    }

    return (
        <div className={classes} ref={ref} onClick={onClickHandler} {...restProps}>
            {!isOpen && withRemove && (
                <button
                    ref={removeBtnRef}
                    className={cx('removeBtn')}
                    onClick={onRemove}
                    aria-label="Close Icon"
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
            )}
            {props.children}
        </div>
    )
})
