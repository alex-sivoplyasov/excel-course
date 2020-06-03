import {$} from '@core/dom'

export class TableSelection {
    constructor() {
        this.group = []
    }

    //cell instance of DOM class
    select(cell) {
        this.group.push(cell)
        const activeCell = $('.cell.selected')
        if (activeCell.$el)
            activeCell.removeClass('selected')

        cell.addClass('selected')
    }

    selectGroup() {

    }
}
