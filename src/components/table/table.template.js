// import {$} from '@core/dom'

//Char codes for symbols
const CODES = {
    A: 65,
    Z: 90
}

function createCell(_, index) {
    return `
        <div class="cell" contenteditable data-index="${index + 1}"></div>
    `
}


function toColumn(element, index) {
    return `
        <div class="column" data-index="${index + 1}" data-type="resizable">
            ${element}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(columns, number = '') {
    // eslint-disable-next-line max-len
    const resizer = number ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
        <div class="row" data-type="resizable">
                <div class="row-info">
                    ${number}
                    ${resizer}
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
