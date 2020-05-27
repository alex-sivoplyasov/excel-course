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
            const coords = $parent.getCoords()
            const columnIndex = $parent.data.index
            const cells = this.$root.findAll(`.cell[data-index="${columnIndex}"]`)
            let delta
            let newWidth
            
            document.onmousemove = e => {
                delta = e.pageX - coords.right
                newWidth = coords.width + delta
                $resizer.$el.style.right = (0 - delta) + 'px'
                $resizer.$el.classList.add('visible')
            }

            document.onmouseup = () => {
                document.onmousemove = null
                $resizer.$el.style.right = 0
                $resizer.$el.classList.remove('visible')
                $parent.$el.style.width = newWidth + 'px'
                cells.forEach( element => {
                    element.style.width = newWidth + 'px'
                })
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
