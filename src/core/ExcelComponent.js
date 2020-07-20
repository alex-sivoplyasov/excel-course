import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener{
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.store = options.store
        this.unsubscribers = []
        this.storeSub = null
        this.subscribe = options.subscribe || []
        this.prepare()
    }

    // Подгатавливаем компонент, перед инициализацией
    prepare() {

    }

    //Уведомляем слушателя о событии event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    //Подписываемся на событие event
    $subscribe(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    //Уведомление redux
    $dispatch(action) {
        this.store.dispatch(action)
    }

    //Приходят только те изменения, на которые подписались
    storeChanged(changes) {

    }

    isWatching(key) {
        return this.subscribe.includes(key)
    }

    //Подписка redux
    // $sub(fn) {
    //     this.storeSub = this.store.subscribe(fn)
    // }


    //Возвращает шаблон компонента
    toHTML() {
        return ''
    }

    //Инициализируем компонент и добавляем слушателей
    init() {
        this.initDOMListeners()
    }

    //Удаляем компонент и слушателей
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach( unsub => unsub())
        // this.storeSub.unsubscribe()
    }
}
