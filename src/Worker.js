import Rule from './Rule'
import Action from './Action'

/**
 * The main class of the library.
 */
export default class Worker {

    /**
     * Initialize properties.
     * @param {(Action[]|Action)} inputs - Initial cache state.
     * @param {(Rule[]|Rule)} rules - Set of rules.
     */
    constructor(inputs, rules, iteration = 1, head = -1) {
        /**
         * Set of rules.
         * @type {Rule[]}
         */
        this.rules = []

        this.performed = []
        this.head = head
        this.iteration = iteration

        this.cache = new Cache(inputs)
        this.ruling(rules)

        this.snapshots = []
    }

    /**
     * Set rules.
     * @param {...Rule} rules - Set of rules.
     * @throws {Error} The array must only consist of Rule.
     * @returns {boolean} If the rules setting was successful return true.
     */
    ruling(...rules) {
        flat(rules, rule => {
            if (!(rule instanceof Rule)) throw new Error('The array must only consist of Rule.')
            this.rules.push(rule)
        })
        return true
    }

    /**
     * Make a snapshot.
     */
    snapshot() {
        this.snapshots.push(JSON.parse(JSON.stringify(this)))
        delete this.snapshots[this.snapshots.length - 1].snapshots
    }

    /**
     * Get next head to perform rule.
     * @param {number} head - Number of current rule.
     */
    next(head) {
        if (this.isLast(head)) {
            this.iteration += 1
            return this.next(-1)
        }    
        if (this.performed.includes(head + 1)) return this.next(head + 1)
        return head + 1
    }

    /**
     * Check if current rule is the last one in the list taking into account performed list.
     * @param {number} head - Number of current rule.
     */
    isLast(head) {
        if (head + 1 >= this.rules.length) return true
        if (this.performed.includes(head + 1)) return this.isLast(head + 1)
        return false
    }

    /**
     * Make a step.
     * @returns {boolean} true if performed are filled.
     */
    step() {
        if (this.rules.length == this.performed.length) return true
        this.head = this.next(this.head)
        let conclusions = this.rules[this.head].perform(this.cache.container)
        if (Array.isArray(conclusions) && conclusions != []) {
            this.cache.add(conclusions)
            this.performed.push(this.head)
        }
        this.snapshot()
    }

    /**
     * Make an iteration.
     */
    iterate() {
        if (this.step()) return true
        while(!this.isLast(this.head)) if (this.step()) return true
    }

    /**
     * Make a solution.
     */
    solve() {
        while(this.iteration < this.rules.length) if (this.step()) break
    }

}