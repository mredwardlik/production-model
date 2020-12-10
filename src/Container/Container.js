/**
 * The class whic stores actions in a container.
 */
export default class Container {

    constructor() {
        this.container = []
    }

    getItems() {
        return this.container
    }

    getLength() {
        return this.container.length
    }

    removeLast(count = 1) {
        let item = this.container.splice(this.container.length - 1, count)
        return item ? true : false
    }

}