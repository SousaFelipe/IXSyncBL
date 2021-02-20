


class Accordion {


    /**
     * @param {string} heading
     * @param {string} button
     * @param {string} content
     * @param {string} status
     */
    item(heading, button, content, status = 'primary') {
        return (`
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading${ heading }">
                    <button class="accordion-button collapsed text-uppercase fw-bolder pb-2 override-pills" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${ heading }" aria-expanded="true" aria-controls="collapse${ heading }">
                        <h5><span class="badge bg-${ status }">${ button }</span></h5>
                    </button>
                </h2>
                <div id="collapse${ heading }" class="accordion-collapse collapse" aria-labelledby="heading${ heading }">
                    <div class="accordion-body p-0">
                        ${ content }
                    </div>
                </div>
            </div>
        `)
    }
}
