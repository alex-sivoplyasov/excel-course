function toHTML() {
    return `
        <li class="db__record">
             <a href="#">Table 1</a>
             <strong>23.23.1234</strong>
        </li>
    `
}

export function getAllRecords() {

}

function getAllKeys() {
    const keys = []
    for ( let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
            continue
        }
        keys.push(key)
    }

    return keys
}

export function createRecordsTable() {
    const keys = getAllKeys()
    if (!keys.length)
        return 'Вы пока не создали ни одной аблицы'

    return `
        <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>

        <ul class="db__list">
            ${keys.map(toHTML).join('')}
        </ul>
    `
}
