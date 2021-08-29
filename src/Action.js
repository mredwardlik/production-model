/**
 * Event, act or something else that used as a conclusion.
 */
export default class Action {

    /**
     * Initialize variables
     * @param {string} name - The action id.
     */
    constructor(name) {
        this.name = name
        this.callback = null
    }

    perform() {
        if (this.callback != null) this.callback(this.name)
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

    toString() {
        return this.name
    }

}