import {ExcelComponent} from '@core/ExcelComponent';
import createTable from '@/components/table/table.template';
import {$} from '@core/dom'
import resizing from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {isResize, isSelect} from '@/components/table/table.functions';


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
            this.selection.select($(event.target))
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
