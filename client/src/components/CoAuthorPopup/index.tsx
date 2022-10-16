import Popup from '../Popup'
import styled from 'styled-components'
import {HTMLAttributes} from 'react'

type Props = {} & HTMLAttributes<HTMLDivElement>

const CoAuthorPopup = (props: Props) => {
    return (
        <Popup>
            <div className={props.className}></div>
        </Popup>
    )
}

const SCoAuthorPopup = styled(CoAuthorPopup)``

export default SCoAuthorPopup
