import Popup from '../Popup'
import styled from 'styled-components'
import React, {HTMLAttributes, useState} from 'react'
import {type Props as PopupProps} from '../Popup'
import {Task} from '../../slices/task'
import {useDispatch} from 'react-redux'
import {AppDispatch} from '../../store'
import {Button, message} from 'antd'
import randomstring from 'randomstring'
import axios from 'axios'
import * as api from '../../api'

type Props = {
    task: Task
    element: React.RefObject<HTMLDivElement>
} & PopupProps &
    HTMLAttributes<HTMLDivElement>

const SharingPopup = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const task = props.task

    const shareTask = () => {
        const link = randomstring.generate()

        props.onClose()

        api.addSharingLink({taskId: task.id, link})
            .then(async () => {
                await navigator.clipboard.writeText(
                    `http://localhost:3000/task/${link}`
                )
                message.success('Ссылка скопирована с буфер обмена')
                console.log(`http://localhost:3000/task/${link}`)
            })
            .catch(() => {
                message.error('Не удалось добавить ссылку(')
            })
    }

    return (
        <Popup {...props}>
            <Button type="primary" onClick={shareTask}>
                Копировать ссылку
            </Button>
        </Popup>
    )
}

export default SharingPopup
