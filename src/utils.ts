export function truncate(text: string, maxLength: number) {
    let truncatedText = text

    if (text.length > maxLength) {
        truncatedText = text.slice(0, maxLength) + '...'
    }

    return truncatedText
}
