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
            listeners: ['mousedown', 'keydown'],
            ...options
        })
    }

    onMousedown(event) {
        if (isResize(event)) {
            resizing(event, this.$root)
        }

        if (isSelect(event)) {
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
            this.selection.select($next)
        }
    }

    prepare() {
        this.selection = new TableSelection()
        this.emitter.subscribe('formulaInput', this.formulaInput.bind(this))
    }

    formulaInput(data) {
        // console.log(this.selection.current.$el.innerText = data)
        this.selection.current.text(data)
    }

    init() {
        super.init()
        const firstCell = this.$root.find('[data-id="1:1"]')
        this.selection.select(firstCell)
    }


    toHTML() {
        return createTable(Table.rowsCount)
    }
}
