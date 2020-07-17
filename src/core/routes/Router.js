import {$} from '@core/dom'
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('no selector')
        }
        this.$placeholder = $(selector)
        this.routes = routes

        this.changePageHandler = this.changePageHandler.bind(this)

        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.changePageHandler)
    }

    changePageHandler() {
        // console.log('path2', window.location.hash.slice(1))
        const path = ActiveRoute.path
        const Page = this.routes[path]
        const page = new Page()
        console.log(this)
        console.log(this.$placeholder)
        this.$placeholder.html(' ')
        this.$placeholder.append(page.getRoot())

        page.afterRender()
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
}
