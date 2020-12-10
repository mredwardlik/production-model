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
        this.created = []
    }

    /**
     * Create a new action or get the one if already created.
     * @param {string} name - The action id.
     * @throws {Error} Can't find "${name}" in regester action list. Add "${name}" to register action list or correct the action name.
     * @returns {Action} A new or already created action.
     */
    create(name) {
        let actionIndex = this.created.findIndex(action => action == name)
        if (actionIndex >= 0) return this.created[actionIndex]
        this.created.push(new Action(name))
        return this.created[this.created.length - 1]
    }

    getCreated() {
        return this.created
    }

    getWrapper() {
        return name => this.create(name)
    }

}