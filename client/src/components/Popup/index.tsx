import ReactDOM from 'react-dom'
import React, {HTMLAttributes, useEffect, useState} from 'react'
import styled from 'styled-components'

type PopupDivProps = {
    left: number
    top: number
}

export type Props = {
    isOpen: boolean
    taskCardIdx?: number
    onClose: () => void
    element: React.RefObject<HTMLDivElement>
} & HTMLAttributes<HTMLDivElement>

const Popup = (props: Props) => {
    const {isOpen, className, onClose = () => {}, element} = props
    const [left, setLeft] = useState(-100)
    const [top, setTop] = useState(-100)

    useEffect(() => {
        if (!isOpen) return

        if (element.current) {
            const {left, bottom} = element.current.getBoundingClientRect()

            setLeft(left)
            setTop(bottom)
        }

        console.log('popup effetct')
        const popupCloseHandler = (e: MouseEvent) => {
            const target = e.target as Element

            if (target.closest(SPopup.toString())) return

            window.removeEventListener('click', popupCloseHandler)
            onClose()
        }

        window.addEventListener('click', popupCloseHandler)
    }, [isOpen])

    const popupClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    return isOpen
        ? ReactDOM.createPortal(
              <SPopup
                  className={className}
                  left={left}
                  top={top}
                  onClick={popupClick}
              >
                  {props.children}
              </SPopup>,
              document.querySelector('#toolbar-popup') as Element
          )
        : null
}

const SPopup = styled.div<PopupDivProps>`
    position: absolute;
    left: ${(props) => props.left}px;
    top: ${(props) => props.top}px;
    padding: 16px;
    border: 1px solid grey;
    border-radius: 8px;
    background: white;
    z-index: 10;
`

export default Popup
