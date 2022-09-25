export function truncate(text: string, maxLength: number) {
    let truncatedText = text

    if (text.length > maxLength) {
        truncatedText = text.slice(0, maxLength) + '...'
    }

    return truncatedText
}

export function waitForElementTransition(
    element: HTMLElement,
    cb: (e: TransitionEvent) => void
) {
    const hd = (e: TransitionEvent) => {
        cb(e)

        element.removeEventListener('transitionend', hd)
    }

    element.addEventListener('transitionend', hd)
}
