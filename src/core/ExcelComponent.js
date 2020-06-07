import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener{
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []
        this.prepare()
    }

    // Подгатавливаем компонент, перед инициализацией
    prepare() {

    }

    //Уведомляем слушателя о событии event
    $emit(event, ...args) {
        const unsub = this.emitter.emit(event, ...args)
        this.unsubscribers.push(unsub)
    }

    //Подписываемся на событие event
    $subscribe(event, fn) {
        this.emitter.subscribe(event, fn)
    }

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
    }
}
