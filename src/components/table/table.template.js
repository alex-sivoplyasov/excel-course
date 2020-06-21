// import {$} from '@core/dom'

//Char codes for symbols
import {Table} from '@/components/table/Table';

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120

function createCell(row) {
    return function(_, col, width) {
        return `
            <div 
                class="cell" 
                contenteditable 
                data-col="${col + 1}" 
                data-id="${row + 1}:${col + 1}"
                style="width: ${width}"
                >
            </div>
        `
    }
}

function toColumn(state) {
    return function(element, index) {
        const width = getWidth(index + 1, state.colState)
        return `
        <div class="column" data-col="${index + 1}" data-type="resizable" style="width: ${width}">
            ${element}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
    }
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

function getWidth(index, state) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

export default function createTable(rowsCount = 10, state = {}) {
    const columnsCount = CODES.Z - CODES.A + 1
    Table.columnsCount = columnsCount
    const rows = []

    //create columns A-Z
    const cols = new Array(columnsCount)
        .fill('')
        .map(toChar)
        .map(toColumn(state))
        // .map( (element, index) => {
        //     const width = getWidth(index, state.colState)
        //     return toColumn(element, index, width)
        // })
        .join('')

    //Added colums to rows array
    rows.push(createRow(cols))

    //
    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(columnsCount)
            .fill('')
            // .map( (_, index) => {
            //     const width = getWidth(state, index)
            //     return createCell( index, i, width)
            // })
            .map(createCell(i))
            .join('')
        rows.push(createRow(cells, i + 1))
    }

    return rows.join('')
}
