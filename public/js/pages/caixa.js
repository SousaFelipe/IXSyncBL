



let fnCategorizados = []



let fnVencidosCard = new Card('div[id="fnVencidosCard"]')
    .color('danger')
    .click(() => exibirRecebimentos('vencidos'))

let fnEmAbertoCard = new Card('div[id="fnEmAbertoCard"]')
    .color('primary')
    .click(() => exibirRecebimentos('em_aberto'))

let fnPagosCard = new Card('div[id="fnPagosCard"]')
    .color('success')
    .click(() => exibirRecebimentos('pagos'))

let fnCanceladosCard = new Card('div[id="fnCanceladosCard"]')
    .color('secondary')
    .click(() => exibirRecebimentos('cancelados'))



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

    fnVencidosCard.startLoading()
    fnEmAbertoCard.startLoading()
    fnPagosCard.startLoading()
    fnCanceladosCard.startLoading()
})



/**
 <<-- REQUISIÇÕES À API
 */
function listarClientes(request) {

    new Request('clientes/listar/{vbusca}/{tbusca}')
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

    new Request('clientes/buscar/{cliente}')
        .csrf()
        .done(response => {
            exibirModalCliente(response)
        })
        .fail(error => {
            console.log(error)
        })
        .get({
            cliente: id
        })
}

function listarRecebimentos(id, status) {
    
    new Request('cre/recebimentos/listar/categorizados/{cliente}')
    .csrf()
    .done(response => {
        fnCategorizados = response
        exibirRecebimentos(status)
    })
    .fail(error => {
        console.log(error)
    })
    .get({
        cliente: id,
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
                <div class="row ps-3 pe-3 pt-1 pb-1 clickable ixs-hover-light text-uppercase" onclick="buscarCliente(${ clientes[i].id })">
                    <div class="col-auto">
                        <span class="text-${ clientes[i].ativo ? `success` : `danger` }"> <i class="fas fa-user"></i> </span>
                    </div>
                    <div class="col-4 override-pills fs-7" data-bs-toggle="tooltip" data-bs-placement="top" title="${ clientes[i].razao }"> ${ clientes[i].razao } </div>
                    <div class="col-2 override-pills fs-7" data-bs-toggle="tooltip" data-bs-placement="top" title="${ clientes[i].endereco }"> ${ clientes[i].endereco } </div>
                    <div class="col-5 override-pills fs-7" data-bs-toggle="tooltip" data-bs-placement="top" title="${ clientes[i].complemento }"> ${ clientes[i].complemento } </div>
                </div>
            `)
        }
    }
    else {
        limparClientesListados()
    }
}

function exibirModalCliente(cliente) {
    
    $('input[name="id_cliente"]').val(cliente.id)
    $('p[id="razao"]').html(cliente.razao)
    $('p[id="endereco"]').html(`${ cliente.endereco }, ${ (cliente.numero || `SN`) }, ${ cliente.complemento }`)

    var modal = new bootstrap.Modal(document.getElementById('clienteModal'), {})
    modal.show()

    listarRecebimentos(cliente.id, 'vencidos')
}

function exibirRecebimentos(status) {
    preencherCards()
    limparRecebimentosListados()

    const fnPorStatus = fnCategorizados[status]

    if (fnPorStatus.length > 0) {
        for (let i = 0; i < fnPorStatus.length; i++) {
            const receb = new Recebimento(fnPorStatus[i])

            $(`div[id="contentClienteFn"]`).append(`
                <div class="row ps-0 pe-0 t-1 pb-1 clickable hover-light text-uppercase">
                    <div class="col-1">
                        <span class="badge rounded-pill bg-${ receb.status_cor }">
                            <i class="fas fa-${ receb.status_icone }"></i>
                        </span>
                    </div>
                    <div class="col-2 override-pills fs-7"> ${ receb.id } </div>
                    <div class="col-3 override-pills fs-7"> ${ receb.data_vencimento } </div>
                    <div class="col-2 override-pills ${ utils.font().shouldBeBolder(receb.valor_aberto) } fs-7"> ${ utils.calc().ptBRL(receb.valor_aberto) } </div>
                    <div class="col-2 override-pills ${ utils.font().shouldBeBolder(receb.valor_cancelado) } fs-7"> ${ utils.calc().ptBRL(receb.valor_cancelado) } </div>
                    <div class="col-2 override-pills ${ utils.font().shouldBeBolder(receb.valor_recebido) } fs-7"> ${ utils.calc().ptBRL(receb.valor_recebido) } </div>
                </div>
            `)
        }
    }
    else {
        $(`div[id="contentClienteFn"]`).append(elements.empty)
    }
}
/**
 EXIBIR LISTAS -->>
 */



function preencherCards() {

    let vencidos = fnCategorizados['vencidos']
    let emAberto = fnCategorizados['em_aberto']
    let pagos = fnCategorizados['pagos']
    let cancelados = fnCategorizados['cancelados']

    $(`span[id="fnVencidosQuatidade"]`).html(`Vencidos (${ vencidos.length })`)
    $(`p[id="fnVencidosValor"]`).html(utils.calc().ptBRL(utils.calc().accumulate(vencidos, 'valor_aberto')))

    $(`span[id="fnEmAbertoQuatidade"]`).html(`Em Aberto (${ emAberto.length })`)
    $(`p[id="fnEmAbertoValor"]`).html(utils.calc().ptBRL(utils.calc().accumulate(emAberto, 'valor_aberto')))

    $(`span[id="fnPagosQuatidade"]`).html(`Pagos (${ pagos.length })`)
    $(`p[id="fnPagosValor"]`).html(utils.calc().ptBRL(utils.calc().accumulate(pagos, 'valor_recebido')))

    $(`span[id="fnCanceladosQuatidade"]`).html(`Cancelados (${ cancelados.length })`)
    $(`p[id="fnCanceladosValor"]`).html(utils.calc().ptBRL(utils.calc().accumulate(cancelados, 'valor_cancelado')))

    fnVencidosCard.stopLoading()
    fnEmAbertoCard.stopLoading()
    fnPagosCard.stopLoading()
    fnCanceladosCard.stopLoading()
}



/**
 <<-- LIMPAR ELEMENTOS
 */
function limparClientesListados() {
    $(`div[id="contentListaDeClientes"]`).html(``)
}

function limparRecebimentosListados() {
    $(`div[id="contentClienteFn"]`).html(``)
}
/**
 LIMPAR ELEMENTOS -->>
 */



function alternaIconeDeBusca(element, loading = true) {
    $(`span[id="${ element }"]`).html('')
    $(`span[id="${ element }"]`).html( loading ? elements.spinner : elements.icon('search') )
}


function alternaBordaCardClienteFn(cor) {
    $('div[id="cardClienteFn"]').removeClass()
    $('div[id="cardClienteFn"]').addClass(`card w-100 border-${ cor }`)
}