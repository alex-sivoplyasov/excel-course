import {$} from '@core/dom';
import {range} from '@core/utils';
import {Table} from '@/components/table/Table';

export function isResize(event) {
    return event.target.dataset.resize
}

export function isSelect(event) {
    return event.target.classList.contains('cell')
}

export function getCellsGroup(target, current) {
    const cols = range(target.col, current.col)
    const rows = range(target.row, current.row)
    const ids = cols.reduce( (accumulator, currentValue) => {
        rows.forEach( (element) => {
            accumulator.push(element + ':' + currentValue)
        })
        return accumulator
    }, [])
    return ids.map( id => $(`.cell[data-id="${id}"]`))
}

export function getNextElement(key, {row, col}) {
    switch (key) {
    case 'Enter':
        row < Table.rowsCount ? row++ : row
        break
    case 'Tab':
        col < Table.columnsCount ? col++ : col
        break
    case 'ArrowRight':
        col < Table.columnsCount ? col++ : col
        break
    case 'ArrowLeft':
        col > 1 ? col-- : col
        break
    case 'ArrowUp':
        row > 1 ? row-- : row
        break
    case 'ArrowDown':
        row < Table.rowsCount ? row++ : row
        break
    }

    return $(`.cell[data-id="${row}:${col}"]`)
}
