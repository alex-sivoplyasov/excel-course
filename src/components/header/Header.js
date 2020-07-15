import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {setTableName} from '@/redux/actions';
import {defaultTitle} from '@/constants';

export class Header extends ExcelComponent{
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        })
    }
    static className = 'excel__header'

    onInput(event) {
        if ($(event.target).data.type === 'name') {
            const tableName = event.target.value
            this.$dispatch(setTableName(tableName))
        }
    }
    toHTML() {
        const tableName = this.store.getState().tableName || defaultTitle

        return `
            <input type="text" class="input" value="${tableName}" data-type="name">
            <div class="buttons">
                <div class="button">
                    <span class="material-icons">
                        delete
                    </span>
                </div>

                <div class="button">
                    <span class="material-icons">
                        exit_to_app
                    </span>
                </div>
            </div>
        `
    }
}
