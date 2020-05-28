import {ExcelComponent} from '@core/ExcelComponent';
import createTable from '@/components/table/table.template';
// import {$} from '@core/dom'
import resizing from '@/components/table/table.resize';


export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Fromula',
            listeners: ['click', 'mousedown', 'mouseup']
        })
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            resizing(event, this.$root)
        }
    }

    onMouseup() {

    }

    onClick(e) {
        if (e.target.classList.contains('cell')) {
            const activeCell = document.querySelector('.cell.selected')
            if (activeCell)
                activeCell.classList.remove('selected')
            e.target.classList.add('selected')
        }
    }

    toHTML() {
        return createTable()
    }
}
