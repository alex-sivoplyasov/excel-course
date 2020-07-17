export function parse(value = '') {
    if (value.startsWith('=') && !value.endsWith('+')) {
        value = eval(value.slice(1))
    }
    return value
}
