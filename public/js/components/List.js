


class List {


    /**
     * @param {string} element
     */
    constructor(element = 'div') {
        this.element = element
        this.listProps = 'list-group-item'
    }


    /**
     * @param {string} props
     */
    props(props) {
        this.listProps = props
        return this
    }


    /**
     * @param {array} content
     * @param {string} props
     */
    item (content) {
        return (`
            <${ this.element } class="${ this.listProps }" aria-current="false">
                ${ content }
            </${ this.element }>
        `)
    }
}
