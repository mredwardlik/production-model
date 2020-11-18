/**
 * Production Model Builder
 * https://github.com/feftio/production-model
 * 
 * @author Lik Eduard <feft99@gmail.com>
 * @version 1.0
 * 
 */

//import './assets/style.css'
import ActionFactory from './ActionFactory'
import RuleFactory from './RuleFactory'

class ProductionModel {

    constructor() {
        this.actionFactory = new ActionFactory()
        this.ruleFactory = new RuleFactory((name) => this.actionFactory.create(name))
    }

    setActions(...names) {
        this.actionFactory.addNames(...names)
    }

    setRules(callback) {
        callback(
            (...conditions) => this.ruleFactory.create(...conditions),
            (name) => this.actionFactory.create(name)
        )
    }

}

// /**
//  * Wrapper. Get a new rule object.
//  * @param {(Action[]|Action)} conclusions - Action that will be executed if ...
//  * @returns {Rule} 
//  */
// function perform(...conclusions) {
//     return new Rule(...conclusions)
// }

// /**
//  * Wrapper. Get a new factory for creaing new actions.
//  * @param {Action[]} actions - Set of action for check correct use.
//  */
// function register(actions) {
//     return new ActionFactory(actions)
// }

let productionModel = new ProductionModel()

productionModel.setActions([
    "be a programmer",
    "go to study",
    "get money",
    "find a girl",
    "live well"
]),

productionModel.setRules((If, action) => {
    If("go to study").then("be a programmer"),
    If("be a programmer").then("get money"),
    If("get money").then("find a girl"),
    If("live well").then("live well")
})

console.log(productionModel)