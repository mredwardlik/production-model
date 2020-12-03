import ElementCreator from './ElementCreator'
import Solver from './Solver'
import CSS from './style.css'

let defaultOptions = {
    rules: "",
    memory: "",
    iterations: "",
    ulElement: "",
    ruleClass: CSS['rule'],
    actionClass: CSS['action'],
    head: "",
    path: "",
    speed: 2,
    numbering: {
        rule: true,
        action: false
    },
    onSuccess: function() {
        console.log("Success")
    },
    onError: function() {
        console.log("Error")
    }
}

function prepareOptions(options) {
    return true
}

export default class SolverHtml {

    constructor(rules, memory, options) {
        this.solver = new Solver(rules, memory)
        this.options = Object.assign(defaultOptions, options)
        this.elementCreator = new ElementCreator(this.options)
        this.elements = {
            rulesSection: document.getElementById(this.options['rules']),
            memorySection: document.getElementById(this.options['memory']),
            rules: [],
            actions: []
        }
        this.init()
    }

    init() {
        this.solver.rules.forEach((rule, i) => {
            let ruleElement = this.elementCreator.rule(rule, i + 1)
            this.elements['rules'].push(ruleElement)
            this.elements['rulesSection'].appendChild(ruleElement)
        })

        this.solver.memory.container.forEach((action, i) => {
            let actionElement = this.elementCreator.action(action, i + 1)
            this.elements['actions'].push(actionElement)
            this.elements['memorySection'].appendChild(actionElement)
        })
    }

    solve() {
        let timer = setInterval(() => {
            let step = this.solver.step()
            
            if (step == true) {

            }

            if (step == false) {
                
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