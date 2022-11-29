import React, {HTMLAttributes, useRef, useState} from 'react'
import styled from 'styled-components'
import CoAuthorPopup from '../CoAuthorPopup'
import CoAuthorIcon from '../../icons/CoAuthorIcon'
import {type Task} from '../../slices/task'
import SharingIcon from '../../icons/SharingIcon'
import SharingPopup from '../SharingPopup'

type Props = {
    onCreate?: (e: React.MouseEvent) => void
    onClose?: (e: React.MouseEvent) => void
    onPopupOpen?: (e: React.MouseEvent) => void
    onPopupClose?: () => void
    task?: Task
    taskCardIdx?: number
} & HTMLAttributes<HTMLDivElement>

const TaskToolbar = (props: Props) => {
    const toolbarRef = useRef<HTMLDivElement>(null)
    const [isCoauthorPopupOpen, setIsCoauthorPopupOpen] = useState(false)
    const [isSharingPopupOpen, setIsSharingPopupOpen] = useState(false)
    const {
        onClose,
        onCreate,
        onPopupOpen = () => {},
        onPopupClose = () => {},
        taskCardIdx,
        task = null,
    } = props

    const coauthorPopupOpen = (e: React.MouseEvent) => {
        e.stopPropagation()

        onPopupOpen(e)
        setIsCoauthorPopupOpen(true)
    }

    const coauthorPopupClose = () => {
        onPopupClose()
        setIsCoauthorPopupOpen(false)
    }

    const sharingPopupOpen = (e: React.MouseEvent) => {
        e.stopPropagation()

        onPopupOpen(e)
        setIsSharingPopupOpen(true)
    }

    const sharingPopupClose = () => {
        onPopupClose()
        setIsSharingPopupOpen(false)
    }

    return (
        <div className={props.className} ref={toolbarRef}>
            {task && (
                <CoAuthorPopup
                    isOpen={isCoauthorPopupOpen}
                    onClose={coauthorPopupClose}
                    taskCardIdx={taskCardIdx}
                    task={task}
                    element={toolbarRef}
                />
            )}
            {task && (
                <SharingPopup
                    isOpen={isSharingPopupOpen}
                    onClose={sharingPopupClose}
                    taskCardIdx={taskCardIdx}
                    task={task}
                    element={toolbarRef}
                />
            )}
            <IconContainer>
                <div>
                    <CoAuthorIcon onClick={coauthorPopupOpen} />
                </div>
                <div>
                    <SharingIcon onClick={sharingPopupOpen} />
                </div>
            </IconContainer>
            <div>
                {onCreate && (
                    <button className="btn mr-1" onClick={onCreate}>
                        Создать
                    </button>
                )}
                {onClose && (
                    <button className="btn" onClick={onClose}>
                        Закрыть
                    </button>
                )}
            </div>
        </div>
    )
}

const IconContainer = styled.div`
    display: flex;
`

const STaskToolbar = styled(TaskToolbar)`
    position: relative;
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    position: absolute;
    bottom: 0;
    left: 0;
`

export default STaskToolbar
