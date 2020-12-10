import { flat } from './Utils' 
import Container from './Container/Container'

export default class MemoryContainerHTML extends Container {

    constructor(element) {
        this.element = element
    }

    getOrigin() {
        return this.element
    }
    
    getById(id) {
        for (let i = 0; i < this.container.length; i++) if (this.container[i].id == id) return this.container[i]
    }

    getByName(name) {
        for (let i = 0; i < this.container.length; i++) if (this.container[i].name == name) return this.container[i]
    }

    add(...elements) {
        flat(elements, element => {
            //if (!(element instanceof Element)) throw new Error(`The element cannot be instance of ${typeof element}.`)
            this.container.push(element)
            this.element.appendChild(element)
        })
    }

}