


class Card {


    constructor(jQueryElement) {
        this.element = jQueryElement
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