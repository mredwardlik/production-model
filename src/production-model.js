/**
 * Production Model Builder
 * https://github.com/feftio/production-model
 * 
 * @author Lik Eduard <feft99@gmail.com>
 * @version 1.1
 * @license
 * 
 */

import './assets/style.css'
import flat from './utils'

/**
 * The class which stores conclusions and conditions.
 */
class Rule {

    /**
     * Initialize conclusions and conditions arrays.
     * @param {...Action} conclusions - Actions that must be performed.
     */
    constructor(...conclusions) {
        this.conclusions = []
        this.conditions = []
        this.then(...conclusions)
    }

    /**
     * Append actions as a set of conclusions.
     * @param {...Action} conclusions - Actions that must be performed.
     * @throws {Error} The conclusion cannot be instance of ${typeof conclusion}.
     */
    then(...conclusions) {
        flat(conclusions, conclusion => {
            if (!(conclusion instanceof Action)) throw new Error(`The conclusion cannot be instance of ${typeof conclusion}`)
            if (!this.conclusions.includes(conclusion)) this.conclusions.push(conclusion)
        })
        return this
    }

    /**
     * Append actions as a set of conditions.
     * @param {...Action} conditions
     * @throws {Error} The condition cannot be instance of ${typeof condition}.
     */
    if(...conditions) {
        flat(conditions, condition => {
            if (!(condition instanceof Action)) throw new Error(`The condition cannot be instance of ${typeof condition}`)
            if (!this.conditions.includes(condition)) this.conditions.push(condition)
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
     * @param  {...Action} conditions - Actions that must be performed.
     */
    isPerformed(...conditions) {
        let allow = 0
        flat(conditions, condition => {
            if (this.conditions.includes(condition)) allow++
        })
        return this.conditions.length <= allow
    }

    /**
     * Print out the rule
     * @returns {string} "If Else" string with conditions and conslusions.
     */
    toString() {
        let string = 'Если '
        this.conditions.forEach((item, i, arr) => string += (i != arr.length - 1) ? `${item.name} и ` : `${item.name}, `)
        string += 'то '
        this.conclusions.forEach((item, i, arr) => string += (i != arr.length - 1) ? `${item.name} и ` : `${item.name}. `)
        return string
    }

}

/**
 * The class whic stores actions in a container.
 */
class Cache {

    /**
     * Initialize container and put actions there.
     * @param {(Action[]|Action)} actions Actions for be stored inside cache container.
     */
    constructor(...actions) {
        this.container = []
        this.add(...actions)
    }

    /**
     * Add actions to the cache container.
     * @param {(Action[]|Action)} actions 
     * @throws {Error} The array must only consist of Action.
     * @returns {boolean} if actions were appended to the cache container then return true.
     */
    add(...actions) {
        flat(actions, action => {
            if (!(action instanceof Action)) throw new Error('The array must only consist of Action')
            this.container.push(action)
        })
        return true
    }

    /**
     * Remove actions from the end of the contrainer.
     * @param {number} [count=1] Remove a few actions if needed.
     * @returns {boolean} If the removing was successful then return true, otherwise false .
     */
    remove(count = 1) {
        let action = myFish.splice(myFish.length - 1, count)
        return action ? true : false
    }

}

/**
 * Event, act or something else that used as a conclusion.
 */
class Action {

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

/**
 * Factory for controlled creation of actions.
 */
class ActionFactory {

    /**
     * Initialize properties.
     * @param {string[]|string} names - The registered names.
     * @returns {Function} Create a new action or get the one if already created.
     */
    constructor(...names) {
        this.names = []
        this.used = {}
        this.add(...names)
        return name => this.action(name)
    }

    /**
     * Create a new action or get the one if already created.
     * @param {string} name - The action id.
     * @throws {Error} Can't find "${name}" in regester action list. Add "${name}" to register action list or correct the action name.
     * @returns {Action} A new or already created action.
     */
    action(name) {
        if (!this.check(name)) throw Error(`Can't find "${name}" in regester action list. Add "${name}" to register action list or correct the action name.`)
        if (this.used[name]) return this.used[name]
        this.used[name] = new Action(name, this.names)
        return this.used[name]
    }

    /**
     * Add registered names for store.
     * @param {boolean} names - Registered names.
     * @returns {boolean} If the adding was successful return true, otherwise false.
     */
    add(...names) {
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
    check(name) {
        return (typeof name == 'string' && this.names.includes(name)) ? true : false
    }

}

/**
 * The main class of the library.
 */
class ProductionModel {

    /**
     * Initialize properties.
     * @param {(Action[]|Action)} inputs - Initial cache state.
     * @param {(Rule[]|Rule)} rules - Set of rules.
     */
    constructor(inputs, rules, iteration = 1, head = -1) {
        /**
         * Set of rules.
         * @type {Rule[]}
         */
        this.rules = []

        this.performed = []
        this.head = head
        this.iteration = iteration

        this.cache = new Cache(inputs)
        this.ruling(rules)

        this.snapshots = []
    }

    /**
     * Set rules.
     * @param {...Rule} rules - Set of rules.
     * @throws {Error} The array must only consist of Rule.
     * @returns {boolean} If the rules setting was successful return true.
     */
    ruling(...rules) {
        flat(rules, rule => {
            if (!(rule instanceof Rule)) throw new Error('The array must only consist of Rule.')
            this.rules.push(rule)
        })
        return true
    }

    /**
     * Make a snapshot.
     */
    snapshot() {
        this.snapshots.push(JSON.parse(JSON.stringify(this)))
        delete this.snapshots[this.snapshots.length - 1].snapshots
    }

    /**
     * Get next head to perform rule
     * @param {number} head - Number of current rule.
     */
    next(head) {
        if (this.isLast(head)) {
            this.iteration += 1
            return this.next(-1)
        }    
        if (this.performed.includes(head + 1)) return this.next(head + 1)
        return head + 1
    }

    /**
     * Check if current rule is the last one in list.
     * @param {number} head - Number of current rule.
     */
    isLast(head) {
        if (head + 1 >= this.rules.length) return true
        if (this.performed.includes(head + 1)) return this.isLast(head + 1)
        return false
    }

    step() {
        if (this.rules.length == this.performed.length) return true
        this.head = this.next(this.head)
        let conclusions = this.rules[this.head].perform(this.cache.container)
        if (Array.isArray(conclusions) && conclusions != []) {
            this.cache.add(conclusions)
            this.performed.push(this.head)
        }
        this.snapshot()
    }

    iterate() {
        if (this.step()) return true
        while(!this.isLast(this.head)) if (this.step()) return true
    }

    solve() {
        while(this.iteration < this.rules.length) if (this.step()) break
        if (this.performed.length == 0) return 
    }

}

/**
 * Wrapper. Get a new rule object.
 * @param {(Action[]|Action)} conclusions - Action that will be executed if ...
 * @returns {Rule} 
 */
function perform(...conclusions) {
    return new Rule(...conclusions)
}

/**
 * Wrapper. Get a new factory for creaing new actions.
 * @param {Action[]} actions - Set of action for check correct use.
 */
function register(actions) {
    return new ActionFactory(actions)
}

/**
 * Wrapper. The main function of the library.
 * @param {(Action[]|Action)} inputs - Initial cache state.
 * @param {(Rule[]|Rule)} rules - Set of rules.
 * @returns {ProductionModel} The main class in the library.
 */
function productionModel(inputs, rules) {
    return new ProductionModel(inputs, rules)
}