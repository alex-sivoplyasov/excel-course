export function capitalize(string) {
    if (typeof string !== 'string')
        return ''
    return string[0].toUpperCase() + string.slice(1)
}

export function range(start, end) {
    if (start > end) {
        [start, end] = [end, start]
    }

    return new Array(end - start + 1)
        .fill('')
        .map( (_, index) => start + index)
}

export function storage(key, data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
    if ( typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }

    return a === b
}

export function toInlineStyles(style = {}) {
    return Object.keys(style)
        .map( key => {
            return `${camelCaseToDash(key)}:${style[key]}`
        })
        .join(';')
}

export function camelCaseToDash(str) {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}

export function debounce(fn, wait) {
    let timeout
    return function(...args) {
        const later = () => {
            clearTimeout(timeout)
            fn(...args)
        }
        clearTimeout()
        timeout = setTimeout(later, wait)
    }
}

export function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}

export function preventDefault(event) {
    event.preventDefault()
}
