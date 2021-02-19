


class Card2 {



    header(header) {
        this.cardHeader = header
        return this
    }

    drawHeader() {
        return (this.cardHeader ? this.cardHeader.draw() : ``)
    }



    title(title) {
        this.cardTitle = title
        return this
    }

    drawTitle() {
        return (this.cardTitle || ``)
    }



    body(body) {
        this.cardBody = body
        return this
    }

    drawBody() {
        return (this.cardBody || ``)
    }



    render() {
        return (`
            <div class="card shadow-sm rounded">
                <div class="card-body d-flex flex-column align-items-center">
                    ${ this.drawHeader() }
                    <span class="text-secondary fw-bolder mt-1">${ this.drawTitle() }</span>
                    <div class="d-flex justify-content-stretch align-items-center w-100">
                        ${ this.drawBody() }
                    </div>
                </div>
            </div>
        `)
    }
}
