import {ExcelComponent} from '@core/ExcelComponent'
// import {Emitter} from '@core/Emitter';


export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Fromula',
            listeners: ['input'],
            ...options
        })
    }

    onInput(event) {
        const text = event.target.innerText
        this.emitter.emit('formulaInput', text)
    }

    toHTML() {
        return `
            <div class="info">
                fx
            </div>

            <div class="input" contenteditable spellcheck="false"></div>
        `
    }
}
