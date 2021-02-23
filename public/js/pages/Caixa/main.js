


$(document).ready(function () {

    $('div[id="clienteModal"]').on("hidden.bs.modal", function () {
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

    let triggerTabList = [].slice.call(document.querySelectorAll('#fnTabs a'))
    triggerTabList.forEach(element => {
        let trigger = new bootstrap.Tab(element)
        element.addEventListener('click', function (event) {
            event.preventDefault()
            trigger.show()
        })
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
    alternarModalLoading(true)

    new Request('clientes/buscar/{cliente}')
        .csrf()
        .done(response => exibirModalCliente(response))
        .fail(error => console.log(error))
        .get({ cliente: id })
}



function exibirModalCliente(clienteModel) {

    let cliente = new Cliente(clienteModel)

    $('p[id="razao"]').html(clienteModel.razao)
    $('p[id="endereco"]').html(cliente.enderecoCompleto())

    $('span[id="modalClienteCPF"]').html(cliente.cpf())
    $('span[id="modalClienteRG"]').html(cliente.rg())
    $('span[id="modalClienteContato"]').html(cliente.contato())

    listarContratos(clienteModel.id)

    var modal = new bootstrap.Modal(document.getElementById('clienteModal'), {})
    modal.show()
}



function listarContratos(clienteId) {
    limparDetalhesCliente()

    new Request('cre/contratos/listar/{cliente}')
        .csrf()
        .done(response => exibirContratos(response))
        .get({ cliente: clienteId })
}



function exibirContratos(contratos) {

    let ativos = contratos.ativos
    let desativados = contratos.desativados

    let items = []

    if (ativos.length > 0) {
        ativos.forEach(contrato => items.push( new List('li').item(components.contrato().item(contrato))))
        $('div[id="clienteContratos"]').append(new Group().id('contratos-tabs').props('list-group list-group-flush').content(items))
    }

    listarFinanceiro(ativos[0].id)
}



function financeiro(recebimentos) {
    let items = []

    if (recebimentos.length > 0) {
        recebimentos.forEach(recebimento =>
            items.push(new List().props('d-flex flex-column align-items-stretch').item(components.recebimento().item(recebimento)))
        )
    }

    return new Group().props(`d-flex flex-column align-items-stretch w-100`).content(items)
}



function exibirListaDeClientes(clientes) {
    limparClientesListados()

    if (clientes.length > 0) {
        for (let i = 0; i < clientes.length; i++) {
            $(`div[id="contentListaDeClientes"]`).append(components.cliente().item(clientes[i]))
        }
    }
    else {
        limparClientesListados()
    }
}



function limparClientesListados() {
    $(`div[id="contentListaDeClientes"]`).html(``)
}



function limparDetalhesCliente() {
    $(`div[id="clienteDetalhes"]`).html(``)
}



function alternaIconeDeBusca(element, loading = true) {
    $(`span[id="${ element }"]`).html('')
    $(`span[id="${ element }"]`).html( loading ? elements.spinner : elements.icon('search') )
}



function alternarModalLoading(loading = true) {
    if (loading) {
        $('div[id="modalClienteLoading"]').removeClass('d-none')
    }
    else {
        $('div[id="modalClienteLoading"]').addClass('d-none')
    }
}
