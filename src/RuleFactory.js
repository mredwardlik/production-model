import flat from './Utils'
import Action from './Action'
import Rule from './Rule'

/**
 * Factory for controlled creation of actions.
 */
export default class RuleFactory {

    constructor(callback) {
        this.rules = []
        this.wrapper = callback
    }
    
    create(...conditions) {
        let rule = new Rule(this.wrapper).if(...conditions)
        this.rules.push(rule)
        return rule
        //return this.wrap(rule.if, rule.then)
    }

    wrap(_if, _then) {
        return {
            IF: _if,
            if: _if,
            THEN: _then,
            then: _then
        }
    }

}