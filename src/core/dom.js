class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        if (html) {
            this.$el.innerHTML = html
            return this
        } else {
            return this.$el.innerHTML
        }
    }

    text(text) {
        if (text) {
            this.$el.textContent = text
            return this
        } else {
            return this.$el.textContent
        }
        // this.$el.textContent = text
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    get data() {
        return this.$el.dataset
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    css(styles = {}) {
        Object.assign(this.$el.style, styles)
    }

    clear() {
        this.html('')
        return this
    }

    on(listener, callback) {
        this.$el.addEventListener(listener, callback)
    }

    off(listener, callback) {
        this.$el.removeEventListener(listener, callback)
    }

    id(parse) {
        if (parse) {
            const id = this.id()
            const coords = id.split(':')
            return {
                row: +coords[0],
                col: +coords[1]
            }
        }
        return this.$el.dataset.id
    }

    append(node) {
        typeof node === 'object'
            ? this.$el.append(node.$el)
            : this.$el.append(node)
    }

    focus() {
        this.$el.focus()
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const newElement = document.createElement(tagName)
    if (classes) {
        classes = classes.split(' ')
        classes.forEach((className) => {
            newElement.classList.add(className)
        })
    }
    return $(newElement)
}
