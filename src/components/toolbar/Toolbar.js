import {createToolbar} from '@/components/toolbar/toolbar.template'
import {$} from '@core/dom'
import {ExcelComponentState} from '@core/ExcelComponentState'
import {defaultStyles} from '@/constants'

export class Toolbar extends ExcelComponentState {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        })
    }

    onClick(e) {
        if ($(e.target).data.type === 'button') {
            const value = JSON.parse($(e.target).data.value)
            this.$emit('toolbar:ApplyStyle', value)
        }
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles)
    }

    prepare() {
        this.initState(defaultStyles)
    }

    get template() {
        return createToolbar(this.state)
    }

    toHTML() {
        return this.template
    }
}
