/**
 * Production Model Builder
 * https://github.com/feftio/production-model
 * 
 * @author Lik Eduard <feft99@gmail.com>
 * @version 1.1
 * @license
 * 
 */


/**
 * The class which stores conclusions and conditions
 */
class Rule {

    /**
     * Initialize conclusions and conditions arrays
     * @param {...Action} conclusions - Actions that have to be performed
     */
    constructor(...conclusions) {
        this.conclusions = []
        this.conditions = []
        this.then(...conclusions)
    }

    /**
     * Put actions to conclusions array
     * @param {...Action} conclusions - Actions that have to be performed
     */
    then(...conclusions) {
        if (!conclusions || !Array.isArray(conclusions) || conclusions == []) throw new Error("Argument is not an array or empty")
        conclusions = conclusions.flat(Infinity)
        if (!conclusions.every(item => item instanceof Action)) throw new Error(`Conclusion cannot be instance of ${typeof conclusion}`)
        this.conclusions.push(...conclusions)
    }

    if(...conditions) {
        if (!conditions) return false
        this.conditions = Array.from(conditions).flat(Infinity)
        return this
    }

    /*toString() {
        let string = "Если "
        for (let key in this.conditions) {
            this.conditions[key].forEach((item, i, arr) => {
                if (key == "and") string += (i != arr.length - 1) ? `${item} и ` : `${item}, `
                if (key == "or") string += (i != arr.length - 1) ? `${item} или ` : `${item}, `
            })
        }
        string += "то " + this.conclusion
        return string
    }*/

}

/**
 * The class whic stores actions in a container
 */
class Cache {

    /**
     * Initialize container and put actions there
     * @param {(Action[]|Action)} actions Actions for be stored inside cache container
     */
    constructor(...actions) {
        this.container = []
        this.add(...actions)
    }

    /**
     * Add actions to the cache container
     * @param {(Action[]|Action)} actions 
     * @throws {Error} Argument is not an array or empty
     * @throws {Error} Array has no actions
     * @returns {boolean} true if action or actions were added to the cache container
     */

    add(...actions) {
        if (!actions || !Array.isArray(actions) || actions == []) throw new Error("Argument is not an array or empty")
        actions = actions.flat(Infinity)
        if (!actions.every(item => item instanceof Action)) throw new Error("Array has no actions")
        this.container.push(...actions)
        return true
    }
    /**
     * Remove actions from the end of the contrainer
     * @param {number} [count=1] Remove a few actions if needed
     * @returns {boolean} If the removing was successful return true, otherwise false 
     */
    remove(count = 1) {
        let action = myFish.splice(myFish.length - 1, count);
        return action ? true : false
    }


}


/**
 * Event, act or something else that used as a conclusion
 */
class Action {

    /**
     * Initialize name, names and callback
     * @param {string} name - 
     * @param {string[]} names - 
     */
    constructor(name, names) {
        this.name = name
        this.names = names
        this.callback = null
    }

    /**
     * Save user function as performing action
     * @param {callback} callback - User function
     */
    perform(callback = null) {
        this.callback = callback
    }

}


/**
 * Factory for controlled creation of actions
 */
class ActionFactory {

    /**
     * Initialize properties
     * @param {string[]|string} names - 
     * @returns {}
     */
    constructor(...names) {
        this.names = []
        this.used = {}
        this.add(...names)
        return (name) => this.action(name)
    }

    /**
     * Create a new action or get one if already used
     * @param {string} name - Action name
     * @throws {Error} Can't find "${name}" in regester action list
     * @returns {Action} A new or already created action
     */
    action(name) {
        if (!this.check(name)) throw Error(`Can't find "${name}" in regester action list`)
        if (this.used[name]) return this.used[name]
        this.used[name] = new Action(name, this.names)
        return this.used[name]
    }

    /**
     * Add registered names for store
     * @param {boolean} names - Registered names
     * @returns {boolean} If the adding was successful return true, otherwise false
     */
    add(...names) {
        if (!names) return false
        this.names = Array.from(names).flat(Infinity)
        return true
    }

    /**
     * Check type and find a name in registered list of names
     * @param {string} name - Action name
     * @return {boolean} If registered names list has the name return true, otherwise false
     */
    check(name) {
        return (typeof name == "string" && this.names.includes(name)) ? true : false
    }

}


/**
 * The main class of the library
 */
class ProductionModel {

    /**
     * Initialize properties
     * @param {(Action[]|Action)} inputs - Initial cache state
     * @param {(Rule[]|Rule)} rules - Set of rules
     */
    constructor(inputs, rules) {
        this.rules = []
        this.caches = []

        this.caches.push(new Cache(inputs))
        this.ruling(rules)
    }

    /**
     * 
     * @param {...Rule} rules - Set of rules
     * @throws {Error} Argument is not an array or empty
     * @throws {Error} Array has no rules
     * @returns {boolean} If the rules adding was successful return true, otherwise false
     */
    ruling(...rules) {
        if (!rules || !Array.isArray(rules) || rules == []) throw new Error("Argument is not an array or empty")
        rules = rules.flat(Infinity)
        if (!rules.every(item => item instanceof Rule)) throw new Error("Array has no rules")
        this.rules.push(...rules)
        return true
    }

    step() {

    }

}


/**
 * Get a new rule object
 * @param {(Action[]|Action)} conclusions - Action that will be executed if ...
 * @returns {Rule} 
 */
function perform(conclusions) {
    return new Rule(conclusions)
}


/**
 * Get a new factory for creaing new actions
 * @param {Action[]} actions - Set of action for check correct use
 */
function register(actions) {
    return new ActionFactory(actions)
}


/**
 * The main function of the library
 * @param {(Action[]|Action)} inputs - Initial cache state
 * @param {(Rule[]|Rule)} rules - Set of rules
 * @returns 
 */
function productionModel(inputs, rules) {
    return new ProductionModel(inputs, rules)
}


/**
 * Testing
 */
window.onload = function () {

    let action = register([
        "пригласить подругу",
        "подготовить костюм",
        "купить билеты",
        "подобрать туфли",
        "освободить вечер",
        "настроение отличное",
        "сделать макияж",
        "идти на концерт"
    ])

    let input = [
        action("сделать макияж"),
        action("идти на концерт")
    ]

    let rules = [
        perform(action("пригласить подругу")).if(action("идти на концерт")),
        perform(action("пригласить подругу")).if(action("идти на концерт"), action("освободить вечер")),
        perform(action("купить билеты")).if(action("идти на концерт"), action("пригласить подругу")),
        perform(action("подобрать туфли")).if(action("подготовить костюм")),
        perform(action("освободить вечер")).if(action("купить билеты")),
        perform(action("настроение отличное")).if(action("идти на концерт"), action("пригласить подругу"), action("сделать макияж")),
        perform(action("сделать макияж")).if(action("идти на концерт"), action("подготовить костюм"), action("подобрать туфли"))
    ]

    let pm = productionModel(input, rules)

};