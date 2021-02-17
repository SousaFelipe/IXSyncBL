


$(document).ready(function () {

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
    
    $("#clienteModal").on("hidden.bs.modal", function () {
        $("#search").focus()
    })
    
    $('.search-group').on("mouseenter", function () {
        if ($("#search").val().length >= 3) {
            $("#search").focus()
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

    let ccontrato = null
    let ccurrhtml = null

    if (contratos.length > 0) {
        for (let i = 0; i < contratos.length; i++) {

            ccontrato = new ClienteContrato(contratos[i])
            ccurrhtml = ccontrato.html(components.listaDeCartoes(ccontrato.attr('id')))

            $(`div[id="accordionContratos"]`).append(ccurrhtml)

            ccontrato.request()
            ccontrato.exit('clienteModal')
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
