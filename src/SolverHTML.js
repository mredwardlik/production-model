import ElementCreator from './ElementCreator'
import Solver from './Solver'
import CSS from './style.css'
import { merge } from './Utils'

let defaultOptions = {
    rules: "",
    memory: "",
    iterations: "",
    ulElement: "",
    classes: {
        rules: CSS['rules'],
        memory: CSS['memory'],
        rule: CSS['rule'],
        action: CSS['action'],
        performed: CSS['performed']
    },
    prefixes: {
        rule: 'rule-',
        action: 'action-'
    },
    head: "",
    path: "",
    speed: 2,
    numbering: {
        rule: true,
        action: false
    },
    onSuccess: function() { console.log('Success...') },
    onError: function() { console.log('Error...') }
}

function prepareOptions(options) {
    return true
}

export default class SolverHtml {

    constructor(rules, memory, options) {
        this.solver = new Solver(rules, memory)
        this.options = merge(defaultOptions, options)
        this.elementCreator = new ElementCreator(this.options)
        this.memorySectionElement = this.elementCreator.memorySection()
        this.rulesSectionElement = this.elementCreator.rulesSection()
        
        this.#init()
    }

    #init() {
        this.solver.rules.forEach((rule, i) => {
            let ruleElement = this.elementCreator.rule(rule, i + 1)
            this.rulesSectionElement.add(ruleElement)
        })

        this.solver.memory.container.forEach((action, i) => {
            let actionElement = this.elementCreator.action(action, i + 1)
            this.memorySectionElement.add(actionElement)
        })

        document.getElementById(this.options['rules']).appendChild(this.rulesSectionElement.getOrigin())
        document.getElementById(this.options['memory']).appendChild(this.memorySectionElement.getOrigin())
    }

    solve() {
        let timer = setInterval(() => {
            let step = this.solver.step()
            
            if (step == true) {
                clearInterval(timer)
                return this.options.onSuccess(step)
            }

            if (step == false) {
                clearInterval(timer)
                return this.options.onError(step)
            }

            if (step.performing) {
                console.log(step.head)
                document.getElementById(this.options.prefixes['rule'] + (step.head + 1)).classList.add(this.options.classes['performed'])
                this.solver.currentAction.forEach(action => {
                    let actionElement = this.elementCreator.action(action, this.memorySectionElement.getLength())
                    this.memorySectionElement.add(this.elementCreator.action(action, this.memorySectionElement.getLength()))
                })
            }

        }, this.options['speed'] * 1000)
    }

    
}




















// print() {
//     this.rulesHTMLElement = document.getElementById(this.options.rules),
//     this.memoryHTMLElement = document.getElementById(this.options.memory)

//     this.rules.forEach((rule, i) => {
//         let ruleElement = document.createElement('div')
//         ruleElement.classList.add('item')
//         ruleElement.id = `rule_${i}`
//         ruleElement.innerHTML = `${i + 1}. ${rule}`
//         this.rulesHTMLElement.appendChild(ruleElement)
//     })

//     this.memory.container.forEach(action => {
//         let actionElement = document.createElement('div')
//         actionElement.classList.add('item')
//         actionElement.innerHTML = action.name
//         this.memoryHTMLElement.appendChild(actionElement)
//     })
// }

// solve() {
//     let timer = setInterval(() => {
//         let step = this.step()
        
//         if (step == true) {
//             swal("Выполнено!", "Решение:" + this.memory.container[this.memory.container.length - 1].name, "success");
//             clearInterval(timer)
//             return false
//         }
//         if (step == false) {
//             clearInterval(timer)
//             let failsRules = "Правила: "
//             this.rules.forEach((rule, i) => {
//                 if (!this.performed.includes(i)) failsRules += (i + 1) + " "
//             })
//             failsRules += "не могут быть исполнены..."
//             swal("Решение отсутствует!", failsRules, "error");
//             return false
//         }
//         console.log(step)
//         if (step.performing) {
//             document.getElementById("rule_" + step.head).classList.add('crossed')
//             this.currentAction.forEach(action => {
//                 let actionElement = document.createElement('div')
//                 actionElement.classList.add('item')
//                 actionElement.innerHTML = action.name
//                 this.memoryHTMLElement.appendChild(actionElement)
//             })

//         }
//     }, this.options.speed)
// }