


let resumoCliente = {
    model: {},
    contratos: []
}



$(document).ready(function () {

    $("#clienteModal").on("hidden.bs.modal", function () {
        $('input[id="search"]').focus()
        $('div[id="clienteCartoes"]').html('')
    })

    $('input[id="search"]').on("input", function() {

        var input = $(this)
        var value = input.val()

        if (value.toString().length >= 3) {
            listarClientes(value)
        }
        else {
            limparClientesListados()
        }
    })

    $('div[id="search-group"]').on("mouseenter", function () {
        if ($('input[id="search"]').val().length >= 3) {
            $('input[id="search"]').focus()
        }
    })

})



function listarClientes(request) {

    new Request('clientes/listar/{vbusca}/{tbusca}')
        .csrf()
        .beforeSend(alternaIconeDeBusca('search-icon'))
        .done(response => {
            exibirListaDeClientes(response.clientes)
            alternaIconeDeBusca('search-icon', false)
        })
        .fail(error => console.log(error))
        .get({
            vbusca: request,
            tbusca: (utils.isNumber(request)) ? `cnpj_cpf` : `razao`
        })
}



function buscarCliente(id) {

    new Request('clientes/buscar/{cliente}')
        .csrf()
        .done(response => {
            resumoCliente.model = response
            exibirModalCliente()
        })
        .fail(error => {
            console.log(error)
        })
        .get({
            cliente: id
        })
}



function listarContratos() {

    new Request('cre/contratos/listar/{cliente}')
        .csrf()
        .done(response => {
            resumoCliente.contratos = response


            exibirContratos(response.contratos)
        })
        .get({
            cliente: resumoCliente.model.id
        })
}



function listarFinanceiro() {

}



function buscarConsumo() {

    new Request('provedor/logins/{cliente}')
        .csrf()
        .done(response => {
            //console.log(response)
        })
        .get({
            cliente: resumoCliente.model.id
        })
}



function exibirListaDeClientes(clientes) {
    limparClientesListados()

    if (clientes.length > 0) {
        for (let i = 0; i < clientes.length; i++) {
            $(`div[id="contentListaDeClientes"]`).append(components.clienteItem(clientes[i]))
        }
    }
    else {
        limparClientesListados()
    }
}



function exibirModalCliente() {

    let cliente = new Cliente(resumoCliente.model)

    $('input[name="id_cliente"]').val(resumoCliente.model.id)
    $('p[id="razao"]').html(resumoCliente.model.razao)
    $('p[id="endereco"]').html(cliente.enderecoCompleto())

    $('span[id="modalClienteCPF"]').html(cliente.cpf())
    $('span[id="modalClienteRG"]').html(cliente.rg())
    $('span[id="modalClienteContato"]').html(cliente.contato())

    listarContratos()
    listarFinanceiro()
    buscarConsumo()

    var modal = new bootstrap.Modal(document.getElementById('clienteModal'), {})
    modal.show()
}



function exibirContratos(contratos) {
    limparClienteContratos()

    let ccontrato = null
    let ccurrhtml = null

    let cardContratoIcon = new Icon({ name: `file-invoice-dollar`, size: `2x` })
    let cardContrato = new Card2().icon(cardContratoIcon).title(`Contrato`).body(`
        <button type="button" class="btn btn-sm btn-${ Contrato.status(contratos).cor } flex-grow-1 ms-3 me-3 mt-4" ${ Contrato.status(contratos).disabled }>
            ${ Contrato.descricao(contratos) }
        </button>
    `)

    let cardFnIcon = new Icon({ name: `hand-holding-usd`, size: `2x` })
    let cardFn = new Card2().icon(cardFnIcon).title(`Financeiro`).body(`
        <button type="button" class="btn btn-sm btn-${ Contrato.status(contratos).cor } flex-grow-1 ms-3 me-3 mt-4" ${ Contrato.status(contratos).disabled }>
            ${ Contrato.descricao(contratos) }
        </button>
    `)

    $(`div[id="clienteCartoes"]`).append(
        new Bootstrap().children(
            new Bootstrap().childrens([ cardContrato.render(), cardFn.render() ]).col('12', '12', '6', '6')
        ).row()
    )

    if (contratos.length > 0) {
        for (let i = 0; i < contratos.length; i++) {

            //ccontrato = new ClienteContrato(contratos[i])

            //ccurrhtml = ccontrato.html(

            //)

            //$(`div[id="accordionContratos"]`).append(ccurrhtml)


            //ccontrato.request()
            //ccontrato.exit('clienteModal')
        }
    }
    else {
        limparClienteContratos()
    }
}



function limparClientesListados() {
    $(`div[id="contentListaDeClientes"]`).html(``)
}



function limparClienteContratos() {
    $(`div[id="accordionContratos"]`).html(``)
}



function alternaIconeDeBusca(element, loading = true) {
    $(`span[id="${ element }"]`).html('')
    $(`span[id="${ element }"]`).html( loading ? elements.spinner : elements.icon('search') )
}
