import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {setTableName} from '@/redux/actions'
import {defaultTitle} from '@/constants'
import {ActiveRoute} from '@core/routes/ActiveRoute'
import {storageName} from '@/pages/ExcelPage'

export class Header extends ExcelComponent{
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        })
    }
    static className = 'excel__header'

    onClick(event) {
        const $target = $(event.target)

        if ($target.data.button === 'remove') {
            const isRemove = confirm('Вы дейтсвительно хотите удалить эту таблицу? ')
            if (isRemove) {
                const tableStorageID = storageName(ActiveRoute.param)
                localStorage.removeItem(tableStorageID)
                ActiveRoute.navigate('#dashboard')
            }
        } else if ($target.data.button === 'exit') {
            ActiveRoute.navigate('#dashboard')
        }
    }

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
                    <span class="material-icons" data-button="remove">
                        delete
                    </span>
                </div>

                <div class="button">
                    <span class="material-icons" data-button="exit">
                        exit_to_app
                    </span>
                </div>
            </div>
        `
    }
}
