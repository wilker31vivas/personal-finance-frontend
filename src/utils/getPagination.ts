export default function getPagination(current: number, total: number) {
    const delta = 1 // cuántas páginas mostrar a cada lado
    const range: (number | string)[] = []
    const rangeWithDots: (number | string)[] = []

    const left = Math.max(2, current - delta)
    const right = Math.min(total - 1, current + delta)

    range.push(1)

    if (left > 2) {
        range.push("...")
    }

    for (let i = left; i <= right; i++) {
        range.push(i)
    }

    if (right < total - 1) {
        range.push("...")
    }

    if (total > 1) {
        range.push(total)
    }

    return range
}
