import Rule from './Rule'

/**
 * Factory for controlled creation of actions.
 */
export default class RuleFactory {

    constructor(actionWrapper) {
        this.rules = []
        this.actionWrapper = actionWrapper
    }
    
    /**
     * Create a new rule, save and return it out.
     * @param  {(...Action|...string)} conditions 
     */
    create(...conditions) {
        let rule = new Rule(this.actionWrapper).if(...conditions)
        this.rules.push(rule)
        return rule
    }

    getCreated() {
        return this.rules
    }

}