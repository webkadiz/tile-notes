import {HTMLAttributes} from 'react'
import styled from 'styled-components'

const CoAuthorIcon = (props: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div {...props}>
            <svg
                width="36"
                height="29"
                viewBox="0 0 36 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M27 21.4898C12.5114 11.3878 2 21.4898 2 21.4898V27H27V21.4898Z"
                    strokeWidth="4"
                />
                <circle cx="14" cy="7" r="5" strokeWidth="4" />
                <path d="M30 5V17.0482" strokeWidth="4" />
                <path d="M23.5 11H35.5482" strokeWidth="4" />
                <path d="M14 14V15.9277" strokeWidth="4" />
            </svg>
        </div>
    )
}

const SCoAuthorIcon = styled(CoAuthorIcon)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    cursor: pointer;
    opacity: 0.71;
    border-radius: 50%;
    padding: 5px;
    transition: 0.2s;

    &:hover {
        opacity: 0.87;
        background-color: rgba(95, 99, 104, 0.157);
    }

    svg {
        width: 18px;
        stroke: #202124;
    }
`

export default SCoAuthorIcon
