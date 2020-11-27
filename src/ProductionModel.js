/**
 * Production Model Builder
 * https://github.com/feftio/production-model
 * 
 * @author Lik Eduard <feft99@gmail.com>
 * @version 1.0
 * 
 */

//import './style.css'
import ActionFactory from './ActionFactory'
import RuleFactory from './RuleFactory'
import Memory from './Memory'
import Solver from './Solver'
import SolverHtml from './SolverHtml'

class ProductionModel {

    #actionFactory
    #ruleFactory
    #memory

    constructor() {
        this.#actionFactory = new ActionFactory()
        this.#ruleFactory = new RuleFactory(this.#actionFactory.getWrapper())
        this.#memory = new Memory(this.#actionFactory.getWrapper())
    }

    /**
     * Add new actions in production model for the next checks.
     * @param {...string} names 
     */
    registerActions(...names) {
        this.#actionFactory.addNames(...names)
    }

    setState(callback) {
        this.#memory.add(callback(
            (...conditions) => this.#ruleFactory.create(...conditions),
            (name) => this.#actionFactory.create(name),
            this.#memory
        ))
    }

    stringRules() {
        return this.#ruleFactory.getCreated().map((rule) => {
            return rule.toString()
        })
    }

    getSolverHtml(options) {
        return new SolverHtml(this.#ruleFactory.getCreated(), this.#memory, options)
    }

    getSolver() {
        return new Solver(this.#ruleFactory.getCreated(), this.#memory)
    }

}

export default ProductionModel

// let pm = new ProductionModel()

// pm.registerActions("be a programmer", "go to study", "get money", "find a girl", "live well")

// pm.setState((If) => {
//     If("go to study").then("be a programmer")
//     If("be a programmer", "go to study").then("get money"),
//     If("get money").then("find a girl"),
//     If("find a girl").then("live well"),
//     If("live well").then("go to study")

//     return ["get money"]
// })

// // pm.solveHTML({
// //     rules: "rules",
// //     memory: "memory",
// //     iterations: "",
// //     head: ""
// // })

// pm.solveHTML({
//     rules: "rules",
//     memory: "memory",
//     iterations: "",
//     head: ""
// }).solve()