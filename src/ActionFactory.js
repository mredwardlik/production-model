import { flat } from './Utils'
import Action from './Action'

/**
 * Factory for controlled creation of actions.
 */
export default class ActionFactory {

    /**
     * Initialize properties.
     * @param {string[]|string} names - The registered names.
     * @returns {Function} Create a new action or get the one if already created.
     */
    constructor() {
        this.names = []
        this.created = []
    }

    /**
     * Create a new action or get the one if already created.
     * @param {string} name - The action id.
     * @throws {Error} Can't find "${name}" in regester action list. Add "${name}" to register action list or correct the action name.
     * @returns {Action} A new or already created action.
     */
    create(name) {
        if (!this.names.includes(name)) throw Error(`Can't find "${name}" in registered action list. Register "${name}" as an action or correct the action name.`)
        let actionIndex = this.created.findIndex(action => action.name == name)
        if (actionIndex >= 0) return this.created[actionIndex]
        this.created.push(new Action(name, this.names))
        return this.created[this.created.length - 1]
    }

    getWrapper() {
        return name => this.create(name)
    }

    /**
     * Add registered names for store.
     * @param {boolean} names - Registered names.
     * @returns {boolean} If the adding was successful return true, otherwise false.
     */
    addNames(...names) {
        flat(names, name => {
            if (typeof name !== 'string') throw new Error('The names must be string.')
            if (!this.names.includes(name)) this.names.push(name)
        })
        return true
    }

}