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
    constructor(rules, memory) {
        /**
         * Set of rules.
         * @type {Rule[]}
         */
        this.rules = rules
        this.performed = []
        this.memory = memory

        this.head = -1
        this.iteration = 1
        this.snapshots = []
    }

    /**
     * Make a snapshot.
     */
    snapshot() {
        this.snapshots.push(JSON.parse(JSON.stringify(this)))
        delete this.snapshots[this.snapshots.length - 1].snapshots
    }

    /**
     * Get the next head to check a rule if it's ready to be performed.
     * @param {number} head - Number of current rule.
     */
    getNext(head) {
        if (this.isLast(head)) {
            this.iteration += 1
            return this.getNext(-1)
        }    
        if (this.performed.includes(head + 1)) return this.getNext(head + 1)
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
        if (this.rules.length == this.performed.length || this.iteration >= this.rules.length) return true
        this.head = this.getNext(this.head)
        let conclusions = this.rules[this.head].perform(this.memory.container)
        if (Array.isArray(conclusions) && conclusions != []) {
            this.memory.add(conclusions)
            this.performed.push(this.head)
        }
        this.snapshot()
        return this
    }

    /**
     * Make an iteration.
     */
    iterate() {
        this.step()
        while(!this.isLast(this.head)) if (this.step() == true) return this
    }

    /**
     * Make a solution.
     */
    solve() {
        while(true) if (this.step() == true) return this
    }

}