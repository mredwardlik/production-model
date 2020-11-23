import Solver from './Solver'
import swal from 'sweetalert'

let defaultOptions = {

}

function checkOptions() {
    return true
}

export default class SolverHTML extends Solver {

    constructor(rules, memory, options) {
        super(rules, memory)
        this.options = options
        this.rulesHTMLElement = null
        this.memoryHTMLElement = null
        this.print()
    }

    print() {
        this.rulesHTMLElement = document.getElementById(this.options.rules),
        this.memoryHTMLElement = document.getElementById(this.options.memory)

        this.rules.forEach((rule, i) => {
            let ruleElement = document.createElement('div')
            ruleElement.classList.add('item')
            ruleElement.id = `rule_${i}`
            ruleElement.innerHTML = `${i + 1}. ${rule}`
            this.rulesHTMLElement.appendChild(ruleElement)
        })

        this.memory.container.forEach(action => {
            let actionElement = document.createElement('div')
            actionElement.classList.add('item')
            actionElement.innerHTML = action.name
            this.memoryHTMLElement.appendChild(actionElement)
        })
    }

    solve() {
        let timer = setInterval(() => {
            let step = this.step()
            
            if (step == true) {
                swal("Выполнено!", "Решение:" + this.memory.container[this.memory.container.length - 1].name, "success");
                clearInterval(timer)
                return false
            }
            if (step == false) {
                clearInterval(timer)
                let failsRules = "Правила: "
                this.rules.forEach((rule, i) => {
                    if (!this.performed.includes(i)) failsRules += (i + 1) + " "
                })
                failsRules += "не могут быть исполнены..."
                swal("Решение отсутствует!", failsRules, "error");
                return false
            }
            console.log(step)
            if (step.performing) {
                document.getElementById("rule_" + step.head).classList.add('crossed')
                this.currentAction.forEach(action => {
                    let actionElement = document.createElement('div')
                    actionElement.classList.add('item')
                    actionElement.innerHTML = action.name
                    this.memoryHTMLElement.appendChild(actionElement)
                })

            }
        }, 2000)
    }

}