import {HTMLAttributes} from 'react'
import {useDispatch} from 'react-redux'
import styled from 'styled-components'
import CloseIcon from '../../icons/CloseIcon'
import {removeCoauthor, Task, type Coauthor} from '../../slices/task'
import {AppDispatch} from '../../store'
import {message} from 'antd'

type Props = {
    task: Task
    coauthor: Coauthor
} & HTMLAttributes<HTMLDivElement>

const CoauthorComponent = (props: Props) => {
    const {task, coauthor} = props
    const dispatch = useDispatch<AppDispatch>()

    const deleteCoauthor = () => {
        dispatch(removeCoauthor({taskId: task.id, login: coauthor.login})).then(
            ({payload}) => {
                if (payload) message.error(payload as string)
                else message.success('Автор успешно удален')
            }
        )
    }

    return (
        <div className={props.className}>
            {coauthor.login}
            {coauthor.scope === 'own' && ' (Владелец)'}
            {coauthor.scope !== 'own' && <CloseIcon onClick={deleteCoauthor} />}
        </div>
    )
}

const SCoauthor = styled(CoauthorComponent)`
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
        width: 12px;
        height: 12px;
        cursor: pointer;
    }
`

export default SCoauthor
