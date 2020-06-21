import {ExcelComponent} from '@core/ExcelComponent'
// import {Emitter} from '@core/Emitter';


export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
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
        this.$subscribe('table:input', (data) => {
            // console.log(this.$root.find('input'))
            this.$root.find('.input').text(data)
            console.log(data)
        })

        this.$subscribe('table:select', (data) => {
            this.$root.find('.input').text(data)
        })
    }
}
