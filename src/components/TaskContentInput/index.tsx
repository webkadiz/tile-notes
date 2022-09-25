import ReactDOM from 'react-dom'
import cn from 'classnames/bind'
import {TextareaHTMLAttributes, useEffect, useRef} from 'react'
import styles from './index.module.scss'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>

const cx = cn.bind(styles)

export default function TaskContentInput(props: Props) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const textareaSampleRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (textareaSampleRef.current && textareaRef.current) {
            const height = textareaSampleRef.current.scrollHeight

            textareaRef.current.style.height = `${height + 5}px`
        }
    }, [props.value])

    return (
        <>
            <textarea
                className={cx('textareaContent')}
                ref={textareaRef}
                {...props}
            ></textarea>
            {ReactDOM.createPortal(
                <textarea
                    value={props.value}
                    className={cx('textareaSample')}
                    ref={textareaSampleRef}
                    readOnly
                    rows={1}
                ></textarea>,
                document.querySelector('#content-sample') as Element
            )}
        </>
    )
}
