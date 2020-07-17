import './scss/index.scss'
import {Router} from '@core/routes/Router';
import {DashboardPages} from '@/pages/DashboardPages';
import {ExcelPage} from '@/pages/ExcelPage';

new Router('#app', {
    dashboard: DashboardPages,
    excel: ExcelPage
})

