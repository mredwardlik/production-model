

export default class ElementCreator {

    constructor(options) {
        this.options = options
    }

    rule(rule, i) {
        let ruleElement = document.createElement('li')
        ruleElement.classList.add(this.options['ruleClass'])
        ruleElement.id = `rule-${i}`
        ruleElement.innerHTML = (this.options.numbering.rule) ? `${i}. ${rule}` : rule
        return ruleElement
    }

    action(action, i) {
        let actionElement = document.createElement('li')
        actionElement.classList.add(this.options['actionClass'])
        actionElement.id = `action-${i}`
        actionElement.innerHTML = (this.options.numbering.action) ? `${i}. ${action.name}` : action.name
        return actionElement
    }

}