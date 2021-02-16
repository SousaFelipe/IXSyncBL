


class Card {

    

    constructor(element) {
        this.element = $(element)
        this.loader = this.element.children(':first')
    }



    color(color) {

        this.element.css({ transition: '200ms' })

        this.element.mouseenter(function () {
            $(this).addClass(`ixs-border-${ color }`)
        })

        this.element.mouseleave(function () {
            $(this).removeClass(`ixs-border-${ color }`)
        })

        return this
    }



    startLoading() {
        this.loader.removeClass('d-none')
    }



    stopLoading() {
        this.loader.addClass('d-none')
    }



    click(fn = null) {

        const th = this

        this.element.click(function() {
            if (fn != null) {
                fn.call(th)
            }
        })

        return th
    }
}