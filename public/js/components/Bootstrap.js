


class Bootstrap {



    children(component) {
        this.components = [component]
        return this
    }



    childrens(components) {
        this.components = components
        return this
    }



    row(props = '') {
        return this.components.map(component =>
            `<div class="row ${ props }">${ component }</div>`
        )
        .join('')
    }



    col(col = 'auto', sm = 'auto', md = 'auto', lg = 'auto') {
        return this.components.map(component =>
            `<div class="col-${ col } col-sm-${ sm } col-md-${ md } col-lg-${ lg }">${ component }</div>`
        )
        .join('')
    }
}
