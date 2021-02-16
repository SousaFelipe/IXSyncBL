



let fnCategorizados = []



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

function listarContratos(id) {

    new Request('cre/contratos/listar/{cliente}')
        .csrf()
        .done(response => {
            exibirContratos(response)
        })
        .get({
            cliente: id
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

    listarContratos(cliente.id)
}

function exibirContratos(contratos) {
    limparClienteContratos()

    if (contratos.length > 0) {
        for (let i = 0; i < contratos.length; i++) {

            let ccontrato = new ClienteContrato(contratos[i])

            $(`div[id="accordionContratos"]`).append(
                ccontrato.accordion(i, `
                    <div class="row d-flex justify-content-stretch">
                        <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                            <div id="fnVencidosCard${ ccontrato.id() }" class="card mb-sm-3 mb-md-3 clickable">
                                <div class="d-flex justify-content-center align-items-center bg-white w-100 h-100 rounded position-absolute">
                                    <div class="spinner-border ixs-text-danger" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <span class="d-flex align-items-center opacity-75">
                                        <i class="fas fa-exclamation-triangle ixs-text-danger"></i>
                                        <span id="fnVencidosQuatidade${ ccontrato.id() }" class="ms-2"></span>
                                    </span>
                                    <p id="fnVencidosValor${ ccontrato.id() }" class="card-text h4"></p>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                            <div id="fnEmAbertoCard${ ccontrato.id() }" class="card clickable">
                                <div class="d-flex justify-content-center align-items-center w-100 h-100 rounded position-absolute">
                                    <div class="spinner-border ixs-text-primary" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <span class="d-flex align-items-center opacity-75">
                                        <i class="fas fa-thumbs-up ixs-text-primary"></i>
                                        <span id="fnEmAbertoQuatidade${ ccontrato.id() }" class="ms-2"></span>
                                    </span>
                                    <p id="fnEmAbertoValor${ ccontrato.id() }" class="card-text h4"></p>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                            <div id="fnPagosCard${ ccontrato.id() }" class="card mb-sm-3 mb-md-3 clickable">
                                <div class="d-flex justify-content-center align-items-center w-100 h-100 rounded position-absolute zindex-tooltip">
                                    <div class="spinner-border text-success" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <span class="d-flex align-items-center opacity-75">
                                        <i class="fas fa-money-bill-wave text-success"></i>
                                        <span id="fnPagosQuatidade${ ccontrato.id() }" class="ms-2"></span>
                                    </span>
                                    <p id="fnPagosValor${ ccontrato.id() }" class="card-text h4"></p>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                            <div id="fnCanceladosCard${ ccontrato.id() }" class="card clickable">
                                <div class="d-flex justify-content-center align-items-center w-100 h-100 rounded position-absolute">
                                    <div class="spinner-border text-dark" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <span class="d-flex align-items-center opacity-75">
                                        <i class="fas fa-thumbs-down"></i>
                                        <span id="fnCanceladosQuatidade${ ccontrato.id() }" class="ms-2"></span>
                                    </span>
                                    <p id="fnCanceladosValor${ ccontrato.id() }" class="card-text h4"></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex justify-content-stretch">
                        <div id="cardClienteFn${ ccontrato.id() }" class="card w-100">
                            <div class="card-header">
                                <div class="row d-flex align-items-center pt-1 pb-1 fw-bolder">
                                    <div class="col-1"><span class="ps-2"><i class="fas fa-donate"></i></span></div>
                                    <div class="col-1 override-pills fs-7">ID</div>
                                    <div class="col-2 override-pills fs-7">VENCIMENTO</div>
                                    <div class="col-2 override-pills fs-7">ABERTO</div>
                                    <div class="col-2 override-pills fs-7">CANCELADO</div>
                                    <div class="col-2 override-pills fs-7">RECEBIDO</div>
                                    <div class="col-2 override-pills fs-7">BAIXADO</div>
                                </div>
                            </div>
                            <div id="contentClienteFn${ ccontrato.id() }" class="card-body pt-1 pb-1" style="max-height: 20rem; overflow-x: hidden; overflow-y: auto;">
                            </div>
                        </div>
                    </div>
                `)
            )

            ccontrato.prepare()
            ccontrato.request()
            ccontrato.setContainer($("#clienteModal"))
        }
    }
    else {
        limparClienteContratos()
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

function limparClienteContratos() {
    $(`div[id="accordionContratos"]`).html(``)
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
