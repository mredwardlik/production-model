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

    or (...conditions) {
        for (let condition of conditions) this.conditions.or.push(condition)
        return this
    }

    toString() {
        let string = "Если "
        for (let key in this.conditions)
            this.conditions[key].forEach((item, i, arr) => {
                if (key == "and") string += (i != arr.length - 1) ? `${item} и ` : `${item}, `
                if (key == "or") string += (i != arr.length - 1) ? `${item} или ` : `${item}, `
            })
        string += "то " + this.conclusion
        return string
    }

}

function productionModel(input, rules, memory) {

}

window.onload = function() {

    let rules = [
        new Rule("пригласить подругу").and("идти на концерт").or("почистить зубы"),
        new Rule("подготовить костюм").and("идти на концерт", "освободить вечер"),
        new Rule("купить билеты").and("идти на концерт", "пригласить подругу"),
        new Rule("подобрать туфли").and("подготовить костюм"),
        new Rule("освободить вечер").and("купить билеты"),
        new Rule("настроение отличное").and("идти на концерт", "пригласить подргу", "сделать макияж"),
        new Rule("сделать макияж").and("идти на концерт", "подготовить костюм", "подобрать туфли")
    ]

    console.log(rules[0].toString())

    productionModel("идти на концерт", rules, [])

};