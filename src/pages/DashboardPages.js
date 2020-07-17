import {Page} from '@core/Page'
import {$} from '@core/dom'

export class DashboardPages extends Page {
    getRoot() {
        return $.create('div', 'db').html(
            `
                            <div class="db__header">
            <h1>Excel Dashboard</h1>
        </div>

        <div class="db__new">
            <div class="db__view">
                <a href="#" class="cdb__create">
                    New <br> Table
                </a>
            </div>
        </div>

        <div class="db__table db__view">
            <div class="db__list-header">
                <span>Название</span>
                <span>Дата открытия</span>
            </div>

            <ul class="db__list">
                <li class="db__record">
                    <a href="#">Table 1</a>
                    <strong>23.23.1234</strong>
                </li>
            </ul>
        </div>
                `
        )
    }
}
