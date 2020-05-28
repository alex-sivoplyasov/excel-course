import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root) {
        super($root, {
            name: 'Fromula',
            listeners: ['input', 'click']
        })
    }

    onInput(event) {
        console.log(event)
    }

    onClick(event) {
        // console.log(this.$root)
        console.log(event)
    }

    // remove(event) {
    //     console.log('event')
    // }

    toHTML() {
        return `
            <div class="info">
                fx
            </div>

            <div class="input" contenteditable spellcheck="false"></div>
        `
    }
}
