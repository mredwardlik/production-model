import flat from './Utils'
import Action from './Action'

/**
 * The class whic stores actions in a container.
 */
export default class Memory {

    /**
     * Initialize container and put actions there.
     * @param {(Action[]|Action)} actions Actions for be stored inside cache container.
     */
    constructor(...actions) {
        this.container = []
        this.add(...actions)
    }

    /**
     * Add actions to the cache container.
     * @param {(Action[]|Action)} actions 
     * @throws {Error} The array must only consist of Action.
     * @returns {boolean} if actions were appended to the cache container then return true.
     */
    add(...actions) {
        flat(actions, action => {
            if (!(action instanceof Action)) throw new Error('The array must only consist of Action')
            this.container.push(action)
        })
        return true
    }

    /**
     * Remove actions from the end of the contrainer.
     * @param {number} [count=1] Remove a few actions if needed.
     * @returns {boolean} If the removing was successful then return true, otherwise false .
     */
    remove(count = 1) {
        let action = myFish.splice(myFish.length - 1, count)
        return action ? true : false
    }

}