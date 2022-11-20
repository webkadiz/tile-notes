import Popup from '../Popup'
import styled from 'styled-components'
import React, {HTMLAttributes, useState} from 'react'
import {type Props as PopupProps} from '../Popup'
import {addCoauthor, Task, type Coauthor} from '../../slices/task'
import CoauthorComponent from '../Coauthor'
import {useDispatch} from 'react-redux'
import {AppDispatch} from '../../store'
import CheckIcon from '../../icons/CheckIcon'
import {message} from 'antd'

type Props = {
    task: Task
    element: React.RefObject<HTMLDivElement>
} & PopupProps &
    HTMLAttributes<HTMLDivElement>

const CoAuthorPopup = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const task = props.task
    const coauthors = task.coauthors
    const [newAuthor, setNewAuthor] = useState('')

    const changeNewAuthor = (e: React.ChangeEvent) => {
        const input = e.target as HTMLInputElement

        setNewAuthor(input.value.trim())
    }

    const saveAuthor = () => {
        console.log('save author')
        dispatch(addCoauthor({taskId: task.id, login: newAuthor})).then(
            ({payload}) => {
                if (payload) message.error(payload as string)
                else {
                    message.success('Автор успешно добавлен')
                    setNewAuthor('')
                }
            }
        )
    }

    return (
        <Popup {...props}>
            <div className={props.className}>
                {coauthors.map((coauthor) => (
                    <CoauthorComponent
                        key={coauthor.login}
                        task={task}
                        coauthor={coauthor}
                    />
                ))}
                <NewAuthorContainer>
                    <Input
                        autoFocus
                        placeholder="укажите имя"
                        value={newAuthor}
                        onChange={changeNewAuthor}
                    />
                    {newAuthor && (
                        <CheckIcon onClick={saveAuthor}>save</CheckIcon>
                    )}
                </NewAuthorContainer>
            </div>
        </Popup>
    )
}

const SCoAuthorPopup = styled(CoAuthorPopup)``

const Input = styled.input`
    padding: 0px 5px 5px 0px;
    border: none;
`

const NewAuthorContainer = styled.div`
    display: flex;

    svg {
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
`

export default SCoAuthorPopup
