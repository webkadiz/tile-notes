import {HTMLAttributes} from 'react'
import styled from 'styled-components'

function SharingIcon(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props}>
            <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="512.000000pt"
                height="512.000000pt"
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet"
            >
                <g
                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                >
                    <path
                        d="M3416 4690 c-81 -26 -144 -97 -178 -202 -19 -55 -22 -94 -26 -310 -5
-279 3 -258 -92 -258 -71 0 -282 -28 -420 -56 -290 -57 -544 -145 -825 -284
-331 -163 -586 -344 -849 -600 -294 -287 -502 -571 -676 -924 -219 -444 -329
-876 -346 -1361 -5 -143 -4 -164 13 -195 37 -71 132 -102 201 -66 16 8 70 67
121 131 542 678 1270 1145 2096 1345 234 57 443 90 676 106 l97 7 4 -249 c6
-303 17 -349 102 -442 53 -57 101 -77 186 -76 88 1 136 20 225 87 33 25 335
321 671 659 l612 613 45 95 c89 185 89 360 0 540 -35 72 -67 105 -692 731
-732 731 -706 709 -846 715 -38 2 -83 -1 -99 -6z"
                    />
                </g>
            </svg>
        </div>
    )
}

const StyledSharingIcon = styled(SharingIcon)`
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

export default StyledSharingIcon
