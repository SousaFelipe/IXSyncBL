


const components = {


    cliente: () => {

        return {

            item: (cliente) => {
                return (`
                    <div class="row ps-3 pe-3 pt-1 pb-1 clickable ixs-hover-light text-uppercase" onclick="buscarCliente(${ cliente.id })">
                        <div class="col-auto">
                            <span class="text-${ (cliente.ativo == 'S') ? `success` : `danger` }"> <i class="fas fa-user"></i> </span>
                        </div>
                        <div class="col-4 override-pills fs-7" data-bs-toggle="tooltip" data-bs-placement="top" title="${ cliente.razao }"> ${ cliente.razao } </div>
                        <div class="col-2 override-pills fs-7" data-bs-toggle="tooltip" data-bs-placement="top" title="${ cliente.endereco }"> ${ cliente.endereco } </div>
                        <div class="col-5 override-pills fs-7" data-bs-toggle="tooltip" data-bs-placement="top" title="${ cliente.complemento }"> ${ cliente.complemento } </div>
                    </div>
                `)
            }
        }
    },


    contrato: (props = '') => {

        return {

            item: (contrato) => {
                let status = Contrato.status(contrato)
                return (`
                    <div class="${ props } d-flex justify-content-between align-items-center" data-bs-toggle="list" role="tab">
                        <span>${ contrato.contrato }</span>
                        <span class="badge bg-${ status.cor }">${ status.internet }</span>
                    </div>
                `)
            }
        }
    },


    recebimento: () => {

        return {

            header: () => {
                return (`
                    <div class="card rounded ms-0 me-0 mt-1 mb-1 ps-1 pe-1 pt-2 pb-2">
                        <div class="row d-flex align-items-center text-uppercase">
                            <div class="col-1 override-pills fs-7">ID</div>
                            <div class="col-2 override-pills fs-7">VENCIMENTO</div>
                            <div class="col-2 override-pills fs-7">ABERTO</div>
                            <div class="col-2 override-pills fs-7">CANCELADO</div>
                            <div class="col-2 override-pills fs-7">RECEBIDO</div>
                            <div class="col-2 override-pills fs-7">BAIXADO</div>
                            <div class="col-1></div>
                        </div>
                    </div>
                `)
            },

            item: (recebimento) => {

                const model = new Recebimento(recebimento)

                return (`
                    <div class="row d-flex align-items-center ps-1 pe-1 pb-1 ixs-hover-light text-uppercase">
                        <div class="col-1 override-pills fs-7 pe-0"> ${ model.id } </div>
                        <div class="col-2 override-pills fs-7"> ${ model.data_vencimento } </div>
                        <div class="col-2 override-pills fs-7   ${ utils.font().shouldBeBolder(model.valor_aberto) }"> ${ utils.calc().ptBRL(model.valor_aberto) } </div>
                        <div class="col-2 override-pills fs-7   ${ utils.font().shouldBeBolder(model.valor_cancelado) }"> ${ utils.calc().ptBRL(model.valor_cancelado) } </div>
                        <div class="col-2 override-pills fs-7   ${ utils.font().shouldBeBolder(model.valor_recebido) }"> ${ utils.calc().ptBRL(model.valor_recebido) } </div>
                        <div class="col-2 override-pills fs-7"> ${ model.dataBaixa() } </div>
                        <div class="col-1 d-flex justify-content-end align-items-center pt-1 pe-4">
                            <span class="badge bg-light text-secondary clickable ixs-hover-white"><i class="fas fa-ellipsis-v"></i></span>
                        </div>
                    </div>
                `)
            }
        }
    }
}
