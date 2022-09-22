import cn from 'classnames'
import {HTMLAttributes} from 'react'

type Props = {
    value: string
} & HTMLAttributes<HTMLTextAreaElement>

export default function TaskContentInput(props: Props) {
    console.log('textarea')
    return <textarea className={cn('w-100')} {...props}></textarea>
}
