export function parse(value = '') {
    if (value.startsWith('=') && !value.endsWith('+')) {
        console.log('old value ', value)
        value = eval(value.slice(1))
        console.log('new value', value)
    }
    return value
}
