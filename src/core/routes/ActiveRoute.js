export class ActiveRoute {
    static get path() {
        return 21
        // return window.location.hash.slice(1)
    }

    static get param() {
        return this.path.split('/')[1]
    }
}
