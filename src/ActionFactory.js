import flat from './Utils'
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
        this.used = {}
    }

    /**
     * Create a new action or get the one if already created.
     * @param {string} name - The action id.
     * @throws {Error} Can't find "${name}" in regester action list. Add "${name}" to register action list or correct the action name.
     * @returns {Action} A new or already created action.
     */
    create(name) {
        if (!this.checkName(name)) throw Error(`Can't find "${name}" in regester action list. Add "${name}" to register action list or correct the action name.`)
        if (this.used[name]) return this.used[name]
        this.used[name] = new Action(name, this.names)
        return this.used[name]
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

    /**
     * Check type and find a name in registered list of names.
     * @param {string} name - Action name.
     * @return {boolean} If registered names list has the name then return true, otherwise false.
     */
    checkName(name) {
        return (typeof name == 'string' && this.names.includes(name)) ? true : false
    }

}