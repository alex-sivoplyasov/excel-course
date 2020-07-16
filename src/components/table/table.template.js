import {Table} from '@/components/table/Table'
import {toInlineStyles} from '@core/utils'
import {defaultStyles} from '@/constants'
import {parse} from '@/components/table/parse'


const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function createCell(state, row) {
    return function(_, col) {
        const width = getWidth(col, state.colState)
        const id = `${row + 1}:${col + 1}`
        const content = getContent(id, state.cellsContent)
        const styles = toInlineStyles({...defaultStyles, ...state.stylesState[id]})

        return `
            <div 
                class="cell" 
                contenteditable 
                data-col="${col + 1}" 
                data-id="${id}"
                style="${styles};  width: ${width}"
                data-value="${content}"
                >
                ${parse(content)}
            </div>
        `
    }
}

function toColumn(el) {
    const {element, index, width} = el
    return `
        <div class="column" data-col="${index + 1}" data-type="resizable" style="width: ${width}">
            ${element}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(columns, number = '', state) {
    const resizer = number ?
        '<div class="row-resize" data-resize="row"></div>' :
        ''
    const height = number ?
        getHeight(number, state.rowState) :
        DEFAULT_HEIGHT
    return `
        <div class="row" data-type="resizable" data-row="${number}" style="height: ${height}">
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

function getHeight(index, state) {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function getWidth(index, state) {
    return (state[index + 1] || DEFAULT_WIDTH) + 'px'
}

function withWidthFrom(state) {
    return function(element, index) {
        return {
            element, index, width: getWidth(index, state.colState)
        }
    }
}

function getContent(id, state = {}) {
    // debugger
    return state[id] || ''
}

export default function createTable(rowsCount = 10, state = {}) {
    const columnsCount = CODES.Z - CODES.A + 1
    Table.columnsCount = columnsCount
    const rows = []

    //create columns A-Z
    const cols = new Array(columnsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(toColumn)
        .join('')

    //Added colums to rows array
    rows.push(createRow(cols))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(columnsCount)
            .fill('')
            .map(createCell(state, i))
            .join('')
        rows.push(createRow(cells, i + 1, state))
    }

    return rows.join('')
}

