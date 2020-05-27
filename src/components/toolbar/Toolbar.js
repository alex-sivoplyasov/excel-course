import {ExcelComponent} from '@core/ExcelComponent';

export class Toolbar extends ExcelComponent {
    static className = 'excel__toolbar'

    constructor($root) {
        super($root, {
            name: 'toolbar',
            listeners: ['click']
        })
    }

    onClick(e) {
        if (e.target.classList.contains('material-icons')) {
            const activeButton = document.querySelector('.button.active')
            e.target.parentElement.classList.add('active')
            if (activeButton)
                activeButton.classList.remove('active')
        }
    }

    toHTML() {
        return `
                        <div class="button">
                    <span class="material-icons">
                        format_align_left
                    </span>
            </div>
            <div class="button">
                    <span class="material-icons">
                        format_align_center
                    </span>
            </div>
            <div class="button">
                    <span class="material-icons">
                        format_align_right
                    </span>
            </div>
            <div class="button">
                    <span class="material-icons">
                        format_bold
                    </span>
            </div>

            <div class="button">
                    <span class="material-icons">
                        format_italic
                    </span>
            </div>

            <div class="button">
                    <span class="material-icons">
                        format_underline
                    </span>
            </div>
        `
    }
}
