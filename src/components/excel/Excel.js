import {$} from '@core/dom'
import {Emitter} from '@core/Emitter'
import {StoreSubscriber} from '@core/StoreSubscriber'
import {preventDefault} from '@core/utils'
export class Excel {
    constructor(options) {
        this.components = options.components || []
        this.emitter = new Emitter()
        this.store = options.store
        this.subscriber = new StoreSubscriber(this.store)
    }
    getRoot() {
        const componentOptions = {
            emitter: this.emitter,
            store: this.store
        }

        const $root = $.create('div', 'excel')
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })

        return $root
    }

    init() {
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach( component => component.init())
        if (process.env.NODE_ENV === 'production') {
            document.addEventListener('contextmenu', preventDefault)
        }

    }

    destroy() {
        this.subscriber.unsubscribeFromStore()
        this.components.forEach( component => component.destroy())
        document.removeEventListener('contextmenu', preventDefault)
    }
}
