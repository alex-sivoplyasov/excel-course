// import {$} from '@core/dom'

export class TableSelection {
    static className = 'selected'
    constructor() {
        this.group = []
        this.current = null
    }

    //cell instance of DOM class
    select(cell) {
        this.clear()
        cell.addClass(TableSelection.className)
        this.group.push(cell)
        this.current = cell
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
