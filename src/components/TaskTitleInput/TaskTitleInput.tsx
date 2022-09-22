import {useState} from 'react'
import {InputHTMLAttributes} from 'react'
import BaseTaskInput from '../BaseTaskInput'

export default function TaskTitleInput(props: InputHTMLAttributes<Element>) {
    return (
        <BaseTaskInput titleMode placeholder="Введите заголовок" {...props} />
    )
}
