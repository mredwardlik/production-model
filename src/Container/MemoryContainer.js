import { flat } from './Utils'
import Action from './Action'
import Container from './Container/Container'

/**
 * The class whic stores actions in a container.
 */
export default class MemoryContainer extends Container {

    constructor(actionWrapper) {
        super()
        this.actionWrapper = actionWrapper
    }

    add(...actions) {
        flat(actions, action => {
            if (typeof action == 'undefined') return true
            if (typeof action == 'string') action = this.actionWrapper(action)
            if (!(action instanceof Action)) throw new Error('The array must only consist of Action.')
            this.container.push(action)
        })
    }

    get(actionName) {
        for (let i = 0; i < this.container.length; i++) if (this.container[i].name == actionName) return this.container[i]
    }

}