class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    text(text) {
        if (typeof text === 'string' || typeof text === 'number') {
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
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

    getStyles(styles = []) {
        return styles.reduce( (res, s) => {
            res[s] = this.$el.style[s]
            return res
        }, {})
    }

    clear() {
        this.html('')
        return this
    }

    on(listener, callback) {
        this.$el.addEventListener(listener, callback)
    }

    attr(name, value) {
        if (value) {
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.getAttribute(name)
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
