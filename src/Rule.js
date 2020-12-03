import { flat } from './Utils'
import Action from './Action'

/**
 * The class which stores conclusions and conditions.
 */
export default class Rule {

    /**
     * Initialize conclusions and conditions arrays.
     * @param {...Action} conclusions - Actions that must be performed.
     */
    constructor(actionWrapper) {
        this.conditions = []
        this.conclusions = []
        this.actionWrapper = actionWrapper
    }

    /**
     * Append actions as a set of conditions.
     * @param {...Action} conditions
     * @throws {Error} The condition cannot be instance of ${typeof condition}.
     */
    if(...conditions) {
        flat(conditions, condition => {
            if (typeof condition == 'string') condition = this.actionWrapper(condition)
            if (!(condition instanceof Action)) throw new Error(`The condition cannot be instance of ${typeof condition}.`)
            if (!this.conditions.includes(condition)) this.conditions.push(condition)
        })
        return this
    }

    /**
     * Append actions as a set of conclusions.
     * @param {...Action} conclusions - Actions that must be performed.
     * @throws {Error} The conclusion cannot be instance of ${typeof conclusion}.
     */
    then(...conclusions) {
        flat(conclusions, conclusion => {
            if (typeof conclusion == 'string') conclusion = this.actionWrapper(conclusion)
            if (!(conclusion instanceof Action)) throw new Error(`The conclusion cannot be instance of ${typeof conclusion}.`)
            if (!this.conclusions.includes(conclusion)) this.conclusions.push(conclusion)
        })
        return this
    }

    /**
     * Perform all conclusions if the conditions are enough.
     * @param {...Action} conditions - Actions that must be performed.
     */
    perform(...conditions) {
        if (!this.isPerformed(...conditions)) return false
        this.conclusions.forEach(conclusion => {
            conclusion.perform()
        })
        return this.conclusions
    }

    /**
     * Check rule if enough conditions to perform.
     * @param {...Action} conditions - Actions that must be performed.
     */
    isPerformed(...conditions) {
        let allow = 0
        flat(conditions, condition => {
            if (this.conditions.includes(condition)) allow++
        })
        return this.conditions.length <= allow
    }

    /**
     * Print out the rule as a string.
     * @returns {string} "If then" string with conditions and conslusions.
     */
    toString() {
        let string = 'Если '
        this.conditions.forEach((item, i, arr) => string += (i != arr.length - 1) ? `${item.name} и ` : `${item.name}, `)
        string += 'то '
        this.conclusions.forEach((item, i, arr) => string += (i != arr.length - 1) ? `${item.name} и ` : `${item.name}.`)
        return string
    }

}