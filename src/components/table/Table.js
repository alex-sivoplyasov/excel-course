import {ExcelComponent} from '@core/ExcelComponent';
import createTable from '@/components/table/table.template';
import {$} from '@core/dom'
import resizing from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {
    getCellsGroup,
    isResize,
    isSelect,
    getNextElement
} from '@/components/table/table.functions';


export class Table extends ExcelComponent {
    static className = 'excel__table'
    static rowsCount = 15
    static columnsCount = null

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    onMousedown(event) {
        if (isResize(event)) {
            resizing(event, this.$root)
            console.log('resize')
        }

        if (isSelect(event)) {
            this.$emit('table:select', $(event.target).text())
            if (event.shiftKey) {
                const target = $(event.target).id(true)
                const current = this.selection.current.id(true)
                const cells = getCellsGroup(target, current)
                this.selection.selectGroup(cells)
            } else {
                this.selection.select($(event.target))
            }
        }
    }

    onInput(event) {
        const text = event.target.textContent
        this.$emit('table:input', text)
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowUp',
            'ArrowLeft',
            'ArrowDown',
            'ArrowRight'
        ]

        const key = event.code

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const ids = this.selection.current.id(true)
            const $next = getNextElement(key, ids)
            this.selectCell($next)
            // this.selection.select($next)
            // this.$emit('table:select', $next.text())
        }
    }

    prepare() {
        this.selection = new TableSelection()
        this.$subscribe('formula:input', (data) => {
            this.selection.current.text(data)
        })

        this.$subscribe('formula:enter', (data) => {
            this.selection.current.focus()
        })
    }


    init() {
        super.init()
        const firstCell = this.$root.find('[data-id="1:1"]')
        this.selectCell(firstCell)
        // this.selection.select(firstCell)
        // this.$emit('table:select', firstCell.text())
    }

    selectCell(cell) {
        this.selection.select(cell)
        this.$emit('table:select', cell.text())
    }


    toHTML() {
        return createTable(Table.rowsCount)
    }
}
