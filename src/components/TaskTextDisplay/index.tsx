import {truncate} from '../../utils'
import cn from 'classnames/bind'
import styles from './index.module.scss'

console.log(styles)

type Props = {
    text: string
    titleMode?: boolean
    contentMode?: boolean
}

const cx = cn.bind(styles)

export default function TaskTitleDisplay(props: Props) {
    const {text, titleMode, contentMode} = props
    let truncatedText

    if (titleMode) {
        truncatedText = truncate(text, 50)
    } else if (contentMode) {
        truncatedText = truncate(text, 200)
    }

    const classes = cx({
        contentText: contentMode,
        titleText: titleMode,
    })

    return <div className={classes}>{truncatedText}</div>
}
