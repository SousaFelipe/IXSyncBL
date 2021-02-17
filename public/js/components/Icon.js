

class Icon {



    constructor(props) {
        this.name   = (props.name   || 'question')
        this.bg     = (props.bg     || 'light')
        this.size   = (props.size   || 'lg')
    }



    draw() {
        return (`
            <span class="d-flex justify-content-center align-items-center text-success bg-${ this.bg } ixs-rounded ixs-icon-content-md">
                <i class="fas fa-${ this.name } fa-${ this.size }"></i>
            </span>
        `)
    }
}
