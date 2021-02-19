


class Accordion {


    /**
     * @param {string} container
     */
    constructor(container) {
        this.container = container
    }


    /**
     * @param {string} heading
     * @param {string} button
     * @param {string} content
     */
    item(heading, button, content) {
        return (`
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading${ heading }">
                    <button class="accordion-button collapsed text-uppercase ixs-text-primary fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${ heading }" aria-expanded="true" aria-controls="collapse${ heading }">
                        ${ button }
                    </button>
                </h2>
                <div id="collapse${ heading }" class="accordion-collapse collapse" aria-labelledby="heading${ heading }" data-bs-parent="#${ this.container }">
                    <div class="accordion-body p-0">
                        ${ content }
                    </div>
                </div>
            </div>
        `)
    }
}
