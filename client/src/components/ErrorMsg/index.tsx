type Props = {
    message: string
}

export default function ErrorMsg(props: Props) {
    return <div className="error">{props.message}</div>
}
