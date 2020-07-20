import {storage} from '@core/utils';

function toHTML(storageName, element) {
    const storageItem = storage(storageName)
    const id = getID(storageName)
    const openingDate = new Date( storageItem.openingDate)

    return `
        <li class="db__record">
             <a href="#excel/${id}"> ${storageItem.tableName} </a>
             <strong>${openingDate.toLocaleString()}</strong>
        </li>
    `
}

function getID(stateName) {
    return stateName.split(':')[1]
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
