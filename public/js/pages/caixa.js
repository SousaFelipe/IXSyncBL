

$(document).ready(function () {

    configureCards()

})


$("#search").on("input", function() {

    var input = $(this)
    var value = input.val()

    if (value.toString().length >= 3) {
        listarClientes(value)
    }
    else {
        limparClientesListados()
    }
})



$("#clienteModal").on("hidden.bs.modal", function() {
    limparRecebimentosListados()
})







/**
 <<-- REQUISIÇÕES À API
 */
function listarClientes(request) {

    new Request('clientes/listar/vbusca/tbusca')
        .csrf()
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
        .csrf()
        .done(response => {
            exibirModalCliente(response)
            console.log(response)
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
        .csrf()
        .done(response => {
            exibirRecebimentos(response)
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



/**
 <<-- EXIBIR LISTAS
 */
function exibirListaDeClientes(clientes) {
    limparClientesListados()

    if (clientes.length > 0) {
        for (let i = 0; i < clientes.length; i++) {
            $(`div[id="contentListaDeClientes"]`).append(`
                <div class="row ps-3 pe-3 pt-1 pb-1 clickable hover-light text-uppercase" onclick="buscarCliente(${ clientes[i].id })">
                    <div class="col-auto">
                        <span class="text-${ clientes[i].ativo ? `success` : `danger` }"> <i class="fas fa-user"></i> </span>
                    </div>
                    <div class="col-4 override-pills fs-7"> ${ clientes[i].razao } </div>
                    <div class="col-2 override-pills fs-7"> ${ clientes[i].endereco } </div>
                    <div class="col-5 override-pills fs-7"> ${ clientes[i].complemento } </div>
                </div>
            `)
        }
    }
    else {
        limparClientesListados()
    }
}

function exibirModalCliente(cliente) {

    document.getElementsByName('id_cliente').value = cliente.id

    $('p[id="razao"]').html(cliente.razao)
    $('p[id="endereco"]').html(`${ cliente.endereco }, ${ (cliente.numero || `SN`) }, ${ cliente.complemento }`)

    var modal = new bootstrap.Modal(document.getElementById('clienteModal'), {})
    modal.show()

    buscarRecebimentos(cliente.id)
}

function exibirRecebimentos(recebimentos) {
    limparRecebimentosListados()

    if (recebimentos.length > 0) {

        $(`div[id="contentClienteFinanceiro"]`).append(`
            <div class="row ps-3 pe-3 text-uppercase">
                <div class="col-1">PG</div>
                <div class="col-2 override-pills fs-7">ID</div>
                <div class="col-3 override-pills fs-7">VENCIMENTO</div>
                <div class="col-2 override-pills fs-7">ABERTO</div>
                <div class="col-2 override-pills fs-7">CANCELADO</div>
                <div class="col-2 override-pills fs-7">RECEBIDO</div>
            </div>
            <hr>
        `)

        for (let i = 0; i < recebimentos.length; i++) {
            const receb = new Recebimento(recebimentos[i])

            $(`div[id="contentClienteFinanceiro"]`).append(`
                <div class="row ps-3 pe-3 pt-1 pb-1 clickable hover-light text-uppercase">
                    <div class="col-1">
                        <span class="badge rounded-pill bg-${ receb.status_cor }">
                            <i class="fas fa-${ receb.status_icone }"></i>
                        </span>
                    </div>
                    <div class="col-2 override-pills fs-7"> ${ receb.id } </div>
                    <div class="col-3 override-pills fs-7"> ${ receb.data_vencimento } </div>
                    <div class="col-2 override-pills fs-7"> ${ receb.valor_aberto } </div>
                    <div class="col-2 override-pills fs-7"> ${ receb.valor_cancelado } </div>
                    <div class="col-2 override-pills fs-7"> ${ receb.valor_recebido } </div>
                </div>
            `)
        }
    }
    else {
        limparRecebimentosListados()
    }
}
/**
 EXIBIR LISTAS -->>
 */



/**
 <<-- LIMPAR ELEMENTOS
 */
function limparClientesListados() {
    $(`div[id="contentListaDeClientes"]`).html(``)
}

function limparRecebimentosListados() {
    $(`div[id="contentClienteFinanceiro"]`).html(``)
}
/**
 LIMPAR ELEMENTOS -->>
 */



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



function configureCards() {

    new Card($('div[id="fnVencidosCard"]'))
        .click(() => {
            buscarRecebimentos($('input[name="id_cliente"]').val())
        })

    new Card($('div[id="fnEmAbertoCard"]'))
        .click(() => {
            alert('Card de faturas em aberto clicado!')
        })

    new Card($('div[id="fnPagasCard"]'))
        .click(() => {
            alert('Card de faturas pagas clicado!')
        })

    new Card($('div[id="fnCanceladasCard"]'))
        .click(() => {
            alert('Card de faturas canceladas clicado!')
        })
}
