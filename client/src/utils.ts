export function truncate(text: string, maxLength: number) {
    let truncatedText = text

    if (text.length > maxLength) {
        truncatedText = text.slice(0, maxLength) + '...'
    }

    return truncatedText
}

export function waitForElementTransition(
    element: HTMLElement | null,
    cb: (e: TransitionEvent) => void
) {
    if (!element) return

    const hd = (e: TransitionEvent) => {
        cb(e)

        element.removeEventListener('transitionend', hd)
    }

    element.addEventListener('transitionend', hd)
}
