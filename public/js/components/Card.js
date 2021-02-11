


class Card {

    

    constructor(element) {

        this.element = $(element)
        this.loader = this.element.children(':first')

        this.element.mouseenter(function () {
            $(this).addClass('ui-shadow')
        })

        this.element.mouseleave(function () {
            $(this).removeClass('ui-shadow')
        })
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