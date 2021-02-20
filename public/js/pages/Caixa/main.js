


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

    listarContratosFinanceiro(clienteModel.id)

    var modal = new bootstrap.Modal(document.getElementById('clienteModal'), {})
    modal.show()
}



function listarContratosFinanceiro(clienteId) {
    limparDetalhesCliente()

    new Request('cre/detalhes/{cliente}')
        .csrf()
        .done(response => exibirDetalhesCliente(response))
        .get({ cliente: clienteId })
}



function exibirDetalhesCliente(detalhes) {
    console.log(detalhes)

    let contratos = detalhes.contratos
    let financeiro = detalhes.financeiro

    $(`div[id="clienteDetalhes"]`).append(
        new Bootstrap().children(
            new Bootstrap().childrens([
                exibirContratos( contratos ).render(`mt-4`),
                exibirFinanceiro( financeiro ).render(`mt-4`)
            ]).col('12', '12', '6', '6')
        ).row()
    )
}



function exibirContratos(contratos) {

    let cardCtrtLst = []

    contratos.forEach(contrato => cardCtrtLst.push(List.item(`
        <div class="row text-uppercase fs-7 ixs-hover-light clickable pt-1 pb-2">
            <div class="col-3"> <span class="badge bg-${ Contrato.status(contrato).cor }">${ Contrato.status(contrato).internet }</span> </div>
            <div class="col-8 override-pills"> ${ contrato.contrato } </div>
            <div class="col-1"> <i class="fas fa-chevron-right clickable" ></i> </div>
        </div>`
    )))

    return new Card2()
        .header(new Icon({ name: `file-invoice-dollar`, size: `2x` }))
        .title(`Contrato`)
        .body(
            new Group().props(`accordion mt-3 w-100`).content(
                new Accordion().item(
                    'Cttr', Contrato.descricao(contratos),
                    new Group(`ul`).props(`list-group list-group-flush`).content(cardCtrtLst)
                )
            )
        )
}



function exibirFinanceiro(financeiro) {

    let vencidos = financeiro.vencidos
    let emAberto = financeiro.em_aberto

    let spnVncds = `<span class="badge bg-${ Recebimento.status(financeiro) }">${ utils.calc().ptBRL(utils.calc().accumulate(vencidos, 'valor_aberto')) }</span>`
    let spnEmAbrt = `<span class="badge bg-${ Recebimento.status(financeiro) }">${ utils.calc().ptBRL(utils.calc().accumulate(emAberto, 'valor_aberto')) }</span>`

    let cardFnLst = List.item(`
        <div class="row text-uppercase fs-7 ixs-hover-light clickable pt-1 pb-2">
            <div class="col-11 override-pills"> ${ (vencidos.length > 0) ? spnVncds : `` } ${ (emAberto.length > 0) ? spnEmAbrt : `` } </div>
            <div class="col-1"> <i class="fas fa-chevron-right clickable" ></i> </div>
        </div>`
    )

    return new Card2()
        .header(new Icon({ name: `hand-holding-usd`, size: `2x` }))
        .title(`Financeiro`)
        .body(
            new Group().props(`accordion mt-3 w-100`).content(
                new Accordion().item(
                    'Fn', Recebimento.descricao(financeiro),
                    new Group(`ul`).props(`list-group list-group-flush`).content(cardFnLst),
                    Recebimento.status(financeiro)
                )
            )
        )
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
