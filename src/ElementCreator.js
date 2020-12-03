import RulesSectionElement from './RulesSectionElement'
import MemorySectionElement from './MemorySectionElement'

export default class ElementCreator {

    constructor(options) {
        this.options = options
    }

    rulesSection() {
        let rulesSectionElement = document.createElement('ul')
        rulesSectionElement.classList.add(this.options.classes['rules'])
        return new RulesSectionElement(rulesSectionElement)
    }

    memorySection() {
        let memorySectionElement = document.createElement('ul')
        memorySectionElement.classList.add(this.options.classes['memory'])
        return new MemorySectionElement(memorySectionElement)
    }

    rule(rule, i) {
        let ruleElement = document.createElement('li')
        ruleElement.classList.add(this.options.classes['rule'])
        ruleElement.id = this.options.prefixes['rule'] + i
        ruleElement.innerHTML = (this.options.numbering['rule']) ? `${i}. ${rule}` : rule
        return ruleElement
    }

    action(action, i) {
        let actionElement = document.createElement('li')
        actionElement.classList.add(this.options.classes['action'])
        actionElement.id = this.options.prefixes['action'] + i
        actionElement.innerHTML = (this.options.numbering['action']) ? `${i}. ${action}` : action
        return actionElement
    }

}