


class Group {


    /**
     * @param {string} element
     */
    constructor(element = 'div') {
        this.element = element
    }


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
            <${ this.element } class="${ this.groupProps }">
                ${ items.map(item => { return item }).join(``) }
            </${ this.element }>
        `)
    }
}
