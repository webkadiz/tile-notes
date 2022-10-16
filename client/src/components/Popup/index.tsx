import {HTMLAttributes} from 'react'
import styled from 'styled-components'

type Props = {} & HTMLAttributes<HTMLDivElement>

const Popup = (props: Props) => {
    return <div className={props.className}></div>
}

const SPopup = styled(Popup)``

export default SPopup
