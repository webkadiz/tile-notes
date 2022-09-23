import cn from 'classnames/bind'
import {HTMLAttributes, TextareaHTMLAttributes, useEffect, useRef} from 'react'
import styles from './index.module.scss'

type Props = {
    value: string
} & HTMLAttributes<HTMLTextAreaElement>

const cx = cn.bind(styles)

export default function TaskContentInput(props: Props) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        setTimeout(() => {
            if (textareaRef.current) {
                const height = textareaRef.current?.scrollHeight
                textareaRef.current.style.height = `${height + 5}px`
                console.log(height)
            }
        }, 200)
    }, [props.value])

    return (
        <textarea
            onTransitionEnd={() => console.log('end')}
            onAnimationEnd={() => console.log('anim end')}
            className={cx('text', 'w-100')}
            ref={textareaRef}
            {...props}
        ></textarea>
    )
}
