import { flat } from './Utils'
import Rule from './Rule'
import Container from './Container/Container'

/**
 * The class whic stores actions in a container.
 */
export default class RulesContainer extends Container {

    add(...rules) {
        flat(rules, rule => {
            if (!(rule instanceof Rule)) throw new Error('The array must only consist of Action.')
            this.container.push(rule)
        })
    }

}