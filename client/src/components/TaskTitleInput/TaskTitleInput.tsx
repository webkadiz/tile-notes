import {KeyboardEvent, useRef, InputHTMLAttributes} from 'react'
import BaseTaskInput from '../BaseTaskInput'

export default function TaskTitleInput(
    props: InputHTMLAttributes<HTMLInputElement>
) {
    const inputRef = useRef<HTMLInputElement>(null)

    const moveToContentArea = (e: KeyboardEvent) => {
        if (e.code === 'Enter') {
            const parent = inputRef.current?.parentElement
            const contentArea = parent?.querySelector(
                '.textareaContent'
            ) as HTMLTextAreaElement

            contentArea.focus()
        }
    }

    return (
        <BaseTaskInput
            titleMode
            placeholder="Введите заголовок"
            onKeyPress={moveToContentArea}
            ref={inputRef}
            {...props}
        />
    )
}
