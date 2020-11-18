/**
 * Event, act or something else that used as a conclusion.
 */
export default class Action {

    /**
     * Initialize variables
     * @param {string} name - The action id.
     * @param {string[]} names - The registered names.
     */
    constructor(name, names) {
        this.name = name
        this.names = names
        this._count = 1
        this.callback = null
    }

    perform() {
        if (this.callback != null) for (let i = 0; i < this._count; i++) this.callback(this.name, this.names.slice())
    }

    /**
     * Save user's function as performing action.
     * @param {Function} [callback=null] User's function.
     * @returns {Action} 
     */
    do(callback = null) {
        this.callback = callback
        return this
    }

    /**
     * Save count in the action
     * @param {number} count - How many times to perform the action
     */
    count(count = 1) {
        this._count = count
        return this
    }

}