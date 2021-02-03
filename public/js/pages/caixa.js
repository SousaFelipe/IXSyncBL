


$("#search").on("input", function() {

    var input = $(this)
    var value = input.val()

    if (value.toString().length >= 3) {

        let url = utils.url('clientes/listar/vbusca/tbusca', {
            vbusca: value,
            tbusca: (utils.isNumber(value)) ? `cnpj_cpf` : `razao`
        })

        $.ajax({

            url: url,
            type: 'GET',

            beforeSend: () => toggleSearchIcon('search-icon')
       })
       .done(response => {
            populateResult(response.clientes)
            toggleSearchIcon('search-icon', false)
       })
       .fail((jqXHR, textStatus, msg) => {
            console.log(jqXHR)
            console.log(textStatus)
            console.log(msg)
       })
    }
    else {
        clearResult()
    }
})



function populateResult(data) {

    clearResult()

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            $(`div[id="searchResult"]`).append(`
                <div class="row ps-3 pe-3 pt-1 pb-1 clickable hover-light" onclick="select(${ data[i].id })">
                    <div class="col-auto">
                        <span class="text-${ data[i].ativo ? `success` : `danger` }"> <i class="fas fa-user"></i> </span>
                    </div>
                    <div class="col-4 override-pills fs-7"> ${ data[i].razao } </div>
                    <div class="col-2 override-pills fs-7"> ${ data[i].endereco } </div>
                    <div class="col-5 override-pills fs-7"> ${ data[i].complemento } </div>
                </div>
            `)
        }
    }
    else {
        clearResult()
    }
}



function select(id) {
    console.log(id)

    var modal = new bootstrap.Modal(document.getElementById('clienteModal'), {
        keyboard: false
    })

    modal.show()
}



function toggleSearchIcon(element, loading = true) {

    const htmlSpinner = `
        <div class="spinner-border spinner-border-sm text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `

    const htmlSearch = `
        <i class="fas fa-search"></i>
    `

    $(`span[id="${ element }"]`).html('')
    $(`span[id="${ element }"]`).html( loading ? htmlSpinner : htmlSearch )
}



function clearResult() {
    $(`div[id="searchResult"]`).html(``)
}
