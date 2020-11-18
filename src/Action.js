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
        this.callback = null
    }

    perform() {
        if (this.callback != null) this.callback(this.name, this.names.slice())
    }

    /**
     * Save user's function as performing action.
     * @param {Function} [callback=null] User's function.
     * @returns {Action} 
     */
    do(callback) {
        this.callback = callback
        return this
    }

}