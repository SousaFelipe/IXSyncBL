


class Request {



    constructor(url) {
        this.url = url
        this.headers = {}
    }



    beforeSend(onBeforeSend) {
        this.onBeforeSend = onBeforeSend
        return this
    }



    csrf() {

        this.headers = {
            ...this.headers,
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }

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
            headers: this.headers,

            beforeSend: () => (this.onBeforeSend != undefined) ? this.onBeforeSend : null
       })
       .done(response => {
           this.onDone.call(this, response)
       })
       .fail((jqXHR, textStatus, msg) => {
            this.onFail.call(this, { jqXHR: jqXHR, textStatus: textStatus, msg: msg })
       })
    }



    post() {

    }

}
