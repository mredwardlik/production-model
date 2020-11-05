class Rule {

    constructor(conclusion) {
        this.conclusion;
        this.conditions = []
        this.then(conclusion)
    }

    then(conclusion) {
        if (!(conclusion instanceof Action)) throw new Error(`Conclusion cannot be instance of ${typeof conclusion}`)
        this.conclusion = conclusion
    }

    if(...conditions) {
        for (let condition of conditions) this.conditions.push(condition)
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

class Memory {

    constructor() {
        this.actions = []
    }

    addActions() {

    }

}

/**
 * Main
 */
class ProductionModel {

    constructor(input, rules) {
        this.input = input
        this.rules = []
        this.actions = []
        this.memory = []

        this.addRules(rules)
    }

    addRules(...rules) {
        if (!rules) return false
        this.rules = Array.from(rules).flat(Infinity)
        return true
    }

    addActions(...actions) {

    }

    step() {

    }

}

class Action {

    constructor(name, names) {
        this.name = name
        this.names = names
    }

    perform() {
        return true
    }

}

class ActionFactory {

    constructor(...names) {
        this.names = []
        this.used = {}
        this.add(...names)
        return (name) => this.action(name)
    }

    action(name) {
        if (!this.check(name)) throw Error(`Can't find "${name}" action in list`)
        if (this.used[name]) return this.used[name]
        this.used[name] = new Action(name, this.names)
        return this.used[name]
    }

    add(...names) {
        if (!names) return false
        this.names = Array.from(names).flat(Infinity)
        return true
    }

    check(name) {
        return (typeof name == "string" && this.names.includes(name)) ? true : false
    }

}








/**
 * Get a new rule object
 * @param {Action} conclusion - action that will be executed if ...
 */
function perform(conclusion) {
    return new Rule(conclusion)
}

/**
 * Get a new factory for creaing new actions
 * @param {Array} actions - set of action for check correct use
 */
function register(actions) {
    return new ActionFactory(actions)
}

/**
 * The main function
 * @param {Array|Action} input 
 * @param {Array} rules
 */
function productionModel(input, rules) {
    return new ProductionModel(input, rules)
}

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

    let input = action("идти на концерт")

    // rule().if("")
    let rules = [
        perform(action("пригласить подругу"))   .if(action("идти на концерт")),
        perform(action("пригласить подругу"))   .if(action("идти на концерт"), action("освободить вечер")),
        perform(action("купить билеты"))        .if(action("идти на концерт"), action("пригласить подругу")),
        perform(action("подобрать туфли"))      .if(action("подготовить костюм")),
        perform(action("освободить вечер"))     .if(action("купить билеты")),
        perform(action("настроение отличное"))  .if(action("идти на концерт"), action("пригласить подругу"), action("сделать макияж")),
        perform(action("сделать макияж"))       .if(action("идти на концерт"), action("подготовить костюм"), action("подобрать туфли"))
    ]

    console.dir()

    let pm = productionModel(input, rules)

};