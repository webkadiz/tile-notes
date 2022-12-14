import cn from 'classnames/bind'
import {truncate} from '../../utils'
import styles from './index.module.scss'

type Props = {
    text: string
    titleMode?: boolean
    contentMode?: boolean
}

const cx = cn.bind(styles)

export default function TaskTitleDisplay(props: Props) {
    const {text, titleMode, contentMode} = props
    let truncatedText = ''

    if (titleMode) {
        truncatedText = truncate(text, 50)
    } else if (contentMode) {
        truncatedText = truncate(text, 400)
    }

    const classes = cx({
        contentText: contentMode,
        titleText: titleMode,
    })

    return titleMode ? (
        <div className={classes}>{truncatedText}</div>
    ) : (
        <div
            className={classes}
            dangerouslySetInnerHTML={{__html: contentMode ? truncatedText : ''}}
        ></div>
    )
}
