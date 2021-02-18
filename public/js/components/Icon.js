

class Icon {



    constructor(props) {
        this.nameIcon   = (props.name   || 'question')
        this.bgIcon     = (props.bg     || 'light')
        this.sizeIcon   = (props.size   || 'lg')
        this.colorIcon  = (props.color  || 'primary')
    }



    color(color) {
        this.colorIcon = color
        return this
    }



    draw() {
        return (`
            <span class="d-flex justify-content-center align-items-center text-${ this.colorIcon } bg-${ this.bgIcon } ixs-rounded ixs-icon-content-md">
                <i class="fas fa-${ this.nameIcon } fa-${ this.sizeIcon }"></i>
            </span>
        `)
    }
}
