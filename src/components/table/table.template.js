// import {$} from '@core/dom'

//Char codes for symbols
const CODES = {
    A: 65,
    Z: 90
}

function createCell() {
    return `
        <div class="cell" contenteditable></div>
    `
}


function toColumn(element) {
    return `
        <div class="column">${element}</div>
    `
}

function createRow(columns, number = '') {
    return `
        <div class="row">
                <div class="row-info">
                    ${number}
                </div>

                <div class="row-data">
                    ${columns}
                </div>
            </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export default function createTable(rowsCount = 10) {
    const columnsCount = CODES.Z - CODES.A + 1
    const rows = []

    //create columns A-Z
    const cols = new Array(columnsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    //Added colums to rows array
    rows.push(createRow(cols))

    //Create empty cells
    const cells = new Array(columnsCount)
        .fill('')
        .map(createCell)
        .join('')

    //
    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(cells, i + 1))
    }

    return rows.join('')
}
