import {ExcelComponent} from '@core/ExcelComponent';
import {createToolbar} from '@/components/toolbar/toolbar.template';
import {$} from '@core/dom'
export class Toolbar extends ExcelComponent {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'toolbar',
            listeners: ['click'],
            ...options
        })
    }

    onClick(e) {
        // console.log(e.target)
        if ($(e.target).data.type === 'button') {
            console.log( $(e.target).data.value)
        }
        if (e.target.classList.contains('material-icons')) {
            const activeButton = document.querySelector('.button.active')
            e.target.parentElement.classList.add('active')
            if (activeButton)
                activeButton.classList.remove('active')
        }
    }

    toHTML() {
        return createToolbar()
    }
}
