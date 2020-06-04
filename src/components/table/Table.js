import {ExcelComponent} from '@core/ExcelComponent';
import createTable from '@/components/table/table.template';
import {$} from '@core/dom'
import resizing from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {isResize, isSelect} from '@/components/table/table.functions';
import {range} from '@core/utils';


export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Fromula',
            listeners: ['mousedown']
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
                const cols = range(target.col, current.col)
                const rows = range(target.row, current.row)
                const ids = cols.reduce( (accumulator, currentValue) => {
                    rows.forEach( (element) => {
                        accumulator.push(element + ':' + currentValue)
                    })
                    return accumulator
                }, [])

                const cells = ids.map( id => $(`.cell[data-id="${id}"]`))
                this.selection.selectGroup(cells)
            } else {
                this.selection.select($(event.target))
            }
        }
    }


    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const firstCell = this.$root.find('[data-id="1:1"]')
        this.selection.select(firstCell)
    }


    toHTML() {
        return createTable()
    }
}
