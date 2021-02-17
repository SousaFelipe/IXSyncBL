


class ClienteContrato {



    constructor(contrato) {
        this.contrato = contrato
    }



    attr(attr) {

        let contrato = this.contrato

        const attrs = {
            'id': () => contrato.id
        }

        return (attrs[attr] || attrs['id'])()
    }



    html(conteudo) {
        return (`
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading${ this.contrato.id }">
                    <button class="accordion-button text-uppercase ixs-text-primary fw-bolder" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${ this.contrato.id }" aria-expanded="true" aria-controls="collapse${ this.contrato.id }">
                        ${ this.contrato.contrato }
                    </button>
                </h2>
                <div id="collapse${ this.contrato.id }" class="accordion-collapse collapse" aria-labelledby="heading${ this.contrato.id }" data-bs-parent="#accordionContratos">
                    <div class="accordion-body">
                        ${ conteudo }
                    </div>
                </div>
            </div>
        `)
    }



    request() {
        this.inicializaCartoes()

        const id = this.contrato.id_cliente
        const contrato = this.contrato.id

        new Request('cre/recebimentos/listar/categorizados/{cliente}/{contrato}')
            .csrf()
            .done(response => {
                this.fnCategorizados = response
                this.exibirResumo()
                this.exibirRecebimentos('vencidos')
            })
            .fail(error => {
                console.log(error)
            })
            .get({
                cliente: id,
                contrato: contrato
            })
    }



    inicializaCartoes() {

        this.fnVencidosCard = new Card(`div[id="fnVencidosCard${ this.contrato.id }"]`)
            .color('danger')
            .click(() => this.exibirRecebimentos('vencidos'))

        this.fnEmAbertoCard = new Card(`div[id="fnEmAbertoCard${ this.contrato.id }"]`)
            .color('primary')
            .click(() => this.exibirRecebimentos('em_aberto'))

        this.fnPagosCard = new Card(`div[id="fnPagosCard${ this.contrato.id }"]`)
            .color('success')
            .click(() => this.exibirRecebimentos('pagos'))

        this.fnCanceladosCard = new Card(`div[id="fnCanceladosCard${ this.contrato.id }"]`)
            .color('secondary')
            .click(() => this.exibirRecebimentos('cancelados'))
    }



    exibirResumo() {

        let vencidos    = this.fnCategorizados['vencidos']
        let emAberto    = this.fnCategorizados['em_aberto']
        let pagos       = this.fnCategorizados['pagos']
        let cancelados  = this.fnCategorizados['cancelados']

        $(`span[id="fnVencidosQuatidade${ this.contrato.id }"]`).html(`Vencidos (${ vencidos.length })`)
        $(`p[id="fnVencidosValor${ this.contrato.id }"]`).html(utils.calc().ptBRL(utils.calc().accumulate(vencidos, 'valor_aberto')))

        $(`span[id="fnEmAbertoQuatidade${ this.contrato.id }"]`).html(`Em Aberto (${ emAberto.length })`)
        $(`p[id="fnEmAbertoValor${ this.contrato.id }"]`).html(utils.calc().ptBRL(utils.calc().accumulate(emAberto, 'valor_aberto')))

        $(`span[id="fnPagosQuatidade${ this.contrato.id }"]`).html(`Pagos (${ pagos.length })`)
        $(`p[id="fnPagosValor${ this.contrato.id }"]`).html(utils.calc().ptBRL(utils.calc().accumulate(pagos, 'valor_recebido')))

        $(`span[id="fnCanceladosQuatidade${ this.contrato.id }"]`).html(`Cancelados (${ cancelados.length })`)
        $(`p[id="fnCanceladosValor${ this.contrato.id }"]`).html(utils.calc().ptBRL(utils.calc().accumulate(cancelados, 'valor_cancelado')))

        this.fnVencidosCard.stopLoading()
        this.fnEmAbertoCard.stopLoading()
        this.fnPagosCard.stopLoading()
        this.fnCanceladosCard.stopLoading()
    }



    exibirRecebimentos(status) {
        this.exibirResumo()

        $(`div[id="contentClienteFn${ this.contrato.id }"]`).html(``)

        if (this.fnCategorizados[status].length > 0) {
            for (let i = 0; i < this.fnCategorizados[status].length; i++) {
                const receb = new Recebimento(this.fnCategorizados[status][i])

                $(`div[id="contentClienteFn${ this.contrato.id }"]`).append(`
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
            $(`div[id="contentClienteFn${ this.contrato.id }"]`).append(elements.empty)
        }
    }



    onExit() {
        this.fnVencidosCard.startLoading()
        this.fnEmAbertoCard.startLoading()
        this.fnPagosCard.startLoading()
        this.fnCanceladosCard.startLoading()

        $(`div[id="contentClienteFn${ this.contrato.id }"]`).html(``)
    }



    exit(element) {
        $(`#${ element }`).on("hidden.bs.modal", this.onExit())
    }
}
