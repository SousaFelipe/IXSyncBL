


class Group {


    /**
     * @param {string} element
     */
    constructor(element = 'div') {
        this.element = element
    }


    /**
     * @param {string} id
     */
    id(id) {
        this.groupId = id
        return this
    }


    /**
     * @param {object} props
     */
    props(props) {
        this.groupProps = props
        return this
    }


    /**
     * @param {array} items
     */
    content(items) {

        if (!Array.isArray(items)) {
            items = [items]
        }

        return (`
            <${ this.element } ${ this.groupId ? `id="${ this.groupId }"` : `` } ${ this.groupProps ? `class="${ this.groupProps }"` : `` }>
                ${ items.map(item => { return item }).join(``) }
            </${ this.element }>
        `)
    }
}
