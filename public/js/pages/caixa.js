


$("#search").on("input", function() {

    var input = $(this)
    var value = input.val()

    if (value.toString().length >= 3) {
        listarClientes(value)
    }
    else {
        clearResult()
    }
})



/**
 <<-- REQUISIÇÕES À API
 */

function listarClientes(request) {

    new Request('clientes/listar/vbusca/tbusca')
        .beforeSend(alternaIconeDeBusca('search-icon'))
        .done(response => {
            exibirListaDeClientes(response.clientes)
            alternaIconeDeBusca('search-icon', false)
        })
        .fail(error => {
            console.log(error)
        })
        .get({
            vbusca: request,
            tbusca: (utils.isNumber(request)) ? `cnpj_cpf` : `razao`
        })
}

function buscarCliente(id) {

    new Request('clientes/buscar/id_cliente')
        .done(response => {
            exibirModalCliente(response)
        })
        .fail(error => {
            console.log(error)
        })
        .get({
            id_cliente: id
        })
}

function buscarRecebimentos(id) {

    new Request('cre/receber/listar/areceber/id_cliente')
        .done(response => {
            console.log(response)
        })
        .fail(error => {
            console.log(error)
        })
        .get({
            id_cliente: id
        })
}

/**
 REQUISIÇÕES Á API -->>
 */



function exibirListaDeClientes(data) {

    clearResult()

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            $(`div[id="searchResult"]`).append(`
                <div class="row ps-3 pe-3 pt-1 pb-1 clickable hover-light text-uppercase" onclick="buscarCliente(${ data[i].id })">
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


function exibirModalCliente(cliente) {

    $('input[name="id_cliente"]').val(cliente.id)

    $('p[id="razao"]').html(cliente.razao)
    $('p[id="endereco"]').html(`${ cliente.endereco }, ${ (cliente.numero || `SN`) }, ${ cliente.complemento }`)

    var modal = new bootstrap.Modal(document.getElementById('clienteModal'), {})
    modal.show()

    buscarRecebimentos(cliente.id)
}


function alternaIconeDeBusca(element, loading = true) {

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
