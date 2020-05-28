import {ExcelComponent} from '@core/ExcelComponent'

export class Header extends ExcelComponent{
    constructor($root) {
        super($root)
    }
    static className = 'excel__header'

    toHTML() {
        return `
            <input type="text" class="input" value="Новая таблица">
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
