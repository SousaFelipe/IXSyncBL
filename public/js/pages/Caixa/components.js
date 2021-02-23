


const components = {



    clienteItem: cliente => {
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
    },



    recebimentoItem: recebimento => {

        const model = new Recebimento(recebimento)

        return (`
            <div class="row d-flex align-items-center ps-0 pe-0 t-1 pb-1 ixs-hover-light clickable text-uppercase">
                <div class="col-1">
                    <span class="badge rounded-pill bg-${ model.status_cor }">
                        <i class="fas fa-${ model.status_icone }"></i>
                    </span>
                </div>
                <div class="col-1 override-pills fs-7"> ${ model.id } </div>
                <div class="col-2 override-pills fs-7"> ${ model.data_vencimento } </div>
                <div class="col-2 override-pills ${ utils.font().shouldBeBolder(model.valor_aberto) } fs-7"> ${ utils.calc().ptBRL(model.valor_aberto) } </div>
                <div class="col-2 override-pills ${ utils.font().shouldBeBolder(model.valor_cancelado) } fs-7"> ${ utils.calc().ptBRL(model.valor_cancelado) } </div>
                <div class="col-2 override-pills ${ utils.font().shouldBeBolder(model.valor_recebido) } fs-7"> ${ utils.calc().ptBRL(model.valor_recebido) } </div>
                <div class="col-2 override-pills fs-7"> ${ model.dataBaixa() } </div>
            </div>
        `)
    },



    listaDeCartoes: variant => {
        return (`
            <div class="row d-flex justify-content-stretch">
                <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                    <div id="fnVencidosCard${ variant }" class="card mb-sm-3 mb-md-3 clickable">
                        <div class="d-flex justify-content-center align-items-center bg-white w-100 h-100 rounded position-absolute">
                            <div class="spinner-border ixs-text-danger" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <span class="d-flex align-items-center opacity-75">
                                <i class="fas fa-exclamation-triangle ixs-text-danger"></i>
                                <span id="fnVencidosQuatidade${ variant }" class="ms-2"></span>
                            </span>
                            <p id="fnVencidosValor${ variant }" class="card-text h4"></p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                    <div id="fnEmAbertoCard${ variant }" class="card clickable">
                        <div class="d-flex justify-content-center align-items-center w-100 h-100 rounded position-absolute">
                            <div class="spinner-border ixs-text-primary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <span class="d-flex align-items-center opacity-75">
                                <i class="fas fa-thumbs-up ixs-text-primary"></i>
                                <span id="fnEmAbertoQuatidade${ variant }" class="ms-2"></span>
                            </span>
                            <p id="fnEmAbertoValor${ variant }" class="card-text h4"></p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                    <div id="fnPagosCard${ variant }" class="card mb-sm-3 mb-md-3 clickable">
                        <div class="d-flex justify-content-center align-items-center w-100 h-100 rounded position-absolute zindex-tooltip">
                            <div class="spinner-border text-success" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <span class="d-flex align-items-center opacity-75">
                                <i class="fas fa-money-bill-wave text-success"></i>
                                <span id="fnPagosQuatidade${ variant }" class="ms-2"></span>
                            </span>
                            <p id="fnPagosValor${ variant }" class="card-text h4"></p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                    <div id="fnCanceladosCard${ variant }" class="card clickable">
                        <div class="d-flex justify-content-center align-items-center w-100 h-100 rounded position-absolute">
                            <div class="spinner-border text-dark" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <span class="d-flex align-items-center opacity-75">
                                <i class="fas fa-thumbs-down"></i>
                                <span id="fnCanceladosQuatidade${ variant }" class="ms-2"></span>
                            </span>
                            <p id="fnCanceladosValor${ variant }" class="card-text h4"></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-stretch">
                <div id="cardClienteFn${ variant }" class="card w-100">
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
                    <div id="contentClienteFn${ variant }" class="card-body pt-1 pb-1" style="max-height: 20rem; overflow-x: hidden; overflow-y: auto;">
                    </div>
                </div>
            </div>
        `)
    }
}