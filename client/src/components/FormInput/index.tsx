import {InputHTMLAttributes} from 'react'
import cn from 'classnames'
import styles from './index.module.scss'

type Props = InputHTMLAttributes<HTMLInputElement>

export default function FormInput(props: Props) {
    return <input className={cn(styles.input, props.className)} {...props} />
}
