// import {$} from '@core/dom'

// import {ACTIVE_CELL} from '@/redux/types';
import {activeCellAction} from '@/redux/actions';

export class TableSelection {
    static className = 'selected'
    constructor() {
        this.group = []
        this.current = null
    }

    //cell instance of DOM class
    select(cell, self) {
        const cellId = cell.data.id
        self.$dispatch(activeCellAction(cellId))
        this.clear()
        cell.addClass(TableSelection.className)
        this.group.push(cell)
        this.current = cell
        cell.focus()
    }

    selectGroup(cells) {
        this.clear()
        this.group = cells
        cells.forEach( cell => cell.addClass(TableSelection.className))
    }

    clear() {
        this.group.forEach( cell => {
            cell.removeClass(TableSelection.className)
        })
        this.group = []
    }
}
