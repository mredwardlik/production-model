import { flat } from './Utils' 

export default class SectionElement {

    constructor(sectionElement) {
        this.sectionElement = sectionElement
        this.container = []
    }

    getOrigin() {
        return this.sectionElement
    }

    getLength() {
        return this.container.length
    }
    
    getById(id) {
        for (let i = 0; i < this.container.length; i++) if (this.container[i].id == id) return this.container[i]
    }

    getByName(name) {
        for (let i = 0; i < this.container.length; i++) if (this.container[i].name == name) return this.container[i]
    }

    add(...elements) {
        flat(elements, element => {
            if (!(element instanceof Element)) throw new Error(`The element cannot be instance of ${typeof element}.`)
            this.container.push(element)
            this.sectionElement.appendChild(element)
        })
    }

    removeLast(count = 1) {
        let element = this.container.splice(this.container.length - 1, count)
        return element ? true : false
    }

}