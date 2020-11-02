class Rule {

    constructor(conclusion) {
        this.conclusion = conclusion
        this.conditions = {
            and: [],
            or: []
        }
    }

    and(...conditions) {
        for (let condition of conditions) this.conditions.and.push(condition)
        return this
    }

    or(...conditions) {
        for (let condition of conditions) this.conditions.or.push(condition)
        return this
    }

    if(...conditions) {
        return this.and(...conditions)
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


function actions(actions) {
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


    let action = actions([
        "пригласить подругу",
        "подготовить костюм",
        "купить билеты",
        "подобрать туфли",
        "освободить вечер",
        "настроение отличное",
        "сделать макияж",
        "идти на концерт"
    ])

    Rule().if

    let rules = [

        new Rule(
            action("пригласить подругу")).and(
                action("идти на концерт")),

        new Rule(
            action("пригласить подругу")).and(
                action("идти на концерт"),
                action("освободить вечер")),

        new Rule(
            action("купить билеты")).and(
                action("идти на концерт"),
                action("пригласить подругу")),

        new Rule(
            action("подобрать туфли")).and(
                action("подготовить костюм")),

        new Rule(
            action("освободить вечер")).and(
                action("купить билеты")),

        new Rule(
            action("настроение отличное")).and(
                action("идти на концерт"),
                action("пригласить подругу"),
                action("сделать макияж")),

        new Rule(
            action("сделать макияж")).and(
                action("идти на концерт"),
                action("подготовить костюм"),
                action("подобрать туфли"))

    ]

    let input = action("идти на концерт")

    let pm = productionModel(input, rules, actions)*/
};