


class ClienteContrato {



    constructor(contrato) {
        this.contrato = contrato
    }



    setContainer(jQueryContainer) {
        this.container = jQueryContainer
        this.container.on("hidden.bs.modal", this.dismiss())
    }



    id() {
        return this.contrato.id
    }



    accordion(i, content) {
        return (`
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading${ this.id() }">
                    <button class="accordion-button text-uppercase ixs-text-primary fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${ this.id() }" aria-expanded="true" aria-controls="collapse${ this.id() }">
                        ${ this.contrato.contrato }
                    </button>
                </h2>
                <div id="collapse${ this.id() }" class="accordion-collapse collapse ${ i === 0 ? `show` : `` }" aria-labelledby="heading${ this.id() }" data-bs-parent="#accordionContratos">
                    <div class="accordion-body">
                        ${ content }
                    </div>
                </div>
            </div>
        `)
    }



    prepare() {

        this.fnVencidosCard = new Card(`div[id="fnVencidosCard${ this.id() }"]`)
            .color('danger')
            .click(() => this.exibirRecebimentos('vencidos'))

        this.fnEmAbertoCard = new Card(`div[id="fnEmAbertoCard${ this.id() }"]`)
            .color('primary')
            .click(() => this.exibirRecebimentos('em_aberto'))

        this.fnPagosCard = new Card(`div[id="fnPagosCard${ this.id() }"]`)
            .color('success')
            .click(() => this.exibirRecebimentos('pagos'))

        this.fnCanceladosCard = new Card(`div[id="fnCanceladosCard${ this.id() }"]`)
            .color('secondary')
            .click(() => this.exibirRecebimentos('cancelados'))
    }



    request() {

        const id = this.contrato.id_cliente

        new Request('cre/recebimentos/listar/categorizados/{cliente}')
            .csrf()
            .done(response => {
                this.fnCategorizados = response
                this.exibirRecebimentos('vencidos')
            })
            .fail(error => {
                console.log(error)
            })
            .get({
                cliente: id,
            })
    }



    exibirRecebimentos(status) {
        this.fillCards()
        this.limparRecebimentosListados()

        const fnPorStatus = this.fnCategorizados[status]

        if (fnPorStatus.length > 0) {
            for (let i = 0; i < fnPorStatus.length; i++) {
                const receb = new Recebimento(fnPorStatus[i])

                $(`div[id="contentClienteFn${ this.id() }"]`).append(`
                    <div class="row d-flex align-items-center ps-0 pe-0 t-1 pb-1 ixs-hover-light clickable text-uppercase">
                        <div class="col-1">
                            <span class="badge rounded-pill bg-${ receb.status_cor }">
                                <i class="fas fa-${ receb.status_icone }"></i>
                            </span>
                        </div>
                        <div class="col-1 override-pills fs-7"> ${ receb.id } </div>
                        <div class="col-2 override-pills fs-7"> ${ receb.data_vencimento } </div>
                        <div class="col-2 override-pills ${ utils.font().shouldBeBolder(receb.valor_aberto) } fs-7"> ${ utils.calc().ptBRL(receb.valor_aberto) } </div>
                        <div class="col-2 override-pills ${ utils.font().shouldBeBolder(receb.valor_cancelado) } fs-7"> ${ utils.calc().ptBRL(receb.valor_cancelado) } </div>
                        <div class="col-2 override-pills ${ utils.font().shouldBeBolder(receb.valor_recebido) } fs-7"> ${ utils.calc().ptBRL(receb.valor_recebido) } </div>
                        <div class="col-2 override-pills fs-7"> ${ receb.dataBaixa() } </div>
                    </div>
                `)
            }
        }
        else {
            $(`div[id="contentClienteFn${ this.id() }"]`).append(elements.empty)
        }
    }


    fillCards() {

        let vencidos    = this.fnCategorizados['vencidos']
        let emAberto    = this.fnCategorizados['em_aberto']
        let pagos       = this.fnCategorizados['pagos']
        let cancelados  = this.fnCategorizados['cancelados']

        $(`span[id="fnVencidosQuatidade${ this.id() }"]`).html(`Vencidos (${ vencidos.length })`)
        $(`p[id="fnVencidosValor${ this.id() }"]`).html(utils.calc().ptBRL(utils.calc().accumulate(vencidos, 'valor_aberto')))

        $(`span[id="fnEmAbertoQuatidade${ this.id() }"]`).html(`Em Aberto (${ emAberto.length })`)
        $(`p[id="fnEmAbertoValor${ this.id() }"]`).html(utils.calc().ptBRL(utils.calc().accumulate(emAberto, 'valor_aberto')))

        $(`span[id="fnPagosQuatidade${ this.id() }"]`).html(`Pagos (${ pagos.length })`)
        $(`p[id="fnPagosValor${ this.id() }"]`).html(utils.calc().ptBRL(utils.calc().accumulate(pagos, 'valor_recebido')))

        $(`span[id="fnCanceladosQuatidade${ this.id() }"]`).html(`Cancelados (${ cancelados.length })`)
        $(`p[id="fnCanceladosValor${ this.id() }"]`).html(utils.calc().ptBRL(utils.calc().accumulate(cancelados, 'valor_cancelado')))

        this.fnVencidosCard.stopLoading()
        this.fnEmAbertoCard.stopLoading()
        this.fnPagosCard.stopLoading()
        this.fnCanceladosCard.stopLoading()
    }



    dismiss() {
        this.limparRecebimentosListados()
        this.fnVencidosCard.startLoading()
        this.fnEmAbertoCard.startLoading()
        this.fnPagosCard.startLoading()
        this.fnCanceladosCard.startLoading()
    }



    limparRecebimentosListados() {
        $(`div[id="contentClienteFn${ this.id() }"]`).html(``)
    }
}
