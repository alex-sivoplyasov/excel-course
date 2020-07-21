import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        })
    }

    storeChanged(changes) {
        this.$root.find('.input').text(changes.currentText)
    }

    onInput(event) {
        const text = event.target.innerText
        this.$emit('formula:input', text)
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula:enter')
        }
    }

    toHTML() {
        return `
            <div class="info">
                fx
            </div>

            <div class="input" contenteditable spellcheck="false"></div>
        `
    }

    prepare() {
        this.$subscribe('table:select', ($cell) => {
            this.$root.find('.input').text($cell.data.value)
        })
    }
}
