

class Request {



    constructor(url) {
        this.url = url
    }



    beforeSend(onBeforeSend) {
        this.onBeforeSend = onBeforeSend
        return this
    }



    done(onDone) {
        this.onDone = onDone
        return this
    }



    fail(onFail) {
        this.onFail = onFail
        return this
    }



    get(request = {}) {

        let url = utils.url(this.url, request)

        $.ajax({

            url: url,
            type: 'GET',

            beforeSend: () => (this.onBeforeSend != undefined) ? this.onBeforeSend : null
       })
       .done(response => {
           this.onDone.call(this, response)
       })
       .fail((jqXHR, textStatus, msg) => {
            this.onFail.call(this, jqXHR, textStatus, msg)
       })
    }



    post() {

    }

}
