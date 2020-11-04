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

    constructor(name) {
        this.name = name
    }

}

class ActionFactory {

    constructor(...names) {
        this.names = []
        this.add(...names)
    }

    init() {
        return (name) => {
            if (!this.check(name)) throw Error(`Can't find "${name}" action in list`)
            return new Action(name)
        }
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

function rule() {

}

function reg(actions) {
    return new ActionFactory(actions).init()
}

function productionModel(input, rules, actions) {

}

window.onload = function () {

    /*
    
        let actions = new Actions([
            new Action("пригласить подругу"),
            new Action("подготовить костюм"),
            new Action("купить билеты"),
            new Action("подобрать туфли"),
            new Action("освободить вечер"),
            new Action("настроение отличное"),
            new Action("сделать макияж"),
            new Action("идти на концерт")
        ]) 
    
        let rules = [
            new Rule("пригласить подругу").and("идти на концерт"),
            new Rule("подготовить костюм").and("идти на концерт", "освободить вечер"),
            new Rule("купить билеты").and("идти на концерт", "пригласить подругу"),
            new Rule("подобрать туфли").and("подготовить костюм"),
            new Rule("освободить вечер").and("купить билеты"),
            new Rule("настроение отличное").and("идти на концерт", "пригласить подругу", "сделать макияж"),
            new Rule("сделать макияж").and("идти на концерт", "подготовить костюм", "подобрать туфли")
        ] */


    let action = reg([
        "пригласить подругу",
        "подготовить костюм",
        "купить билеты",
        "подобрать туфли",
        "освободить вечер",
        "настроение отличное",
        "сделать макияж",
        "идти на концерт",
        "say hello"
    ])

    let rules = [

        new Rule(action("say hello")).if("go"),

        new Rule(
            action("пригласить подругу")).if(
                action("идти на концерт")),

        new Rule(
            action("пригласить подругу")).if(
                action("идти на концерт"),
                action("освободить вечер")),

        new Rule(
            action("купить билеты")).if(
                action("идти на концерт"),
                action("пригласить подругу")),

        new Rule(
            action("подобрать туфли")).if(
                action("подготовить костюм")),

        new Rule(
            action("освободить вечер")).if(
                action("купить билеты")),

        new Rule(
            action("настроение отличное")).if(
                action("идти на концерт"),
                action("пригласить подругу"),
                action("сделать макияж")),

        new Rule(
            action("сделать макияж")).if(
                action("идти на концерт"),
                action("подготовить костюм"),
                action("подобрать туфли"))

    ]

    let input = action("идти на концерт")

    let pm = productionModel(input, rules)
};