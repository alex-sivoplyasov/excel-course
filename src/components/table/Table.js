import {ExcelComponent} from '@core/ExcelComponent';
import createTable from '@/components/table/table.template';
import {$} from '@core/dom'

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
            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizable"')
            const type = $resizer.data.resize
            const coords = $parent.getCoords()
            const columnIndex = $parent.data.index
            const cells = this.$root.findAll(`.cell[data-index="${columnIndex}"]`)
            let delta
            let value

            document.onmousemove = e => {
                if ( type === 'col') {
                    delta = e.pageX - coords.right
                    value = coords.width + delta
                    $resizer.css({right: -delta + 'px'})
                } else {
                    delta = e.pageY - coords.bottom
                    value = coords.height + delta
                    $resizer.css({bottom: -delta + 'px'})
                }

                $resizer.addClass('resizing')
            }

            document.onmouseup = () => {
                document.onmouseup = null
                document.onmousemove = null
                if (type === 'col') {
                    $resizer.css({right: 0})
                    $parent.css({width: value + 'px'})
                    cells.forEach( element => {
                        $(element).css({width: value + 'px'})
                    })
                } else {
                    $parent.css({height: value + 'px'})
                    $resizer.css({bottom: 0})
                }

                $resizer.removeClass('resizing')
            }
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
