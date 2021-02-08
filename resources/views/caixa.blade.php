@extends('layouts.sidenav')


@section('title', auth()->user()->firstName())



<!-- <<SIDENAV CONTENT -->
@section('navcontent')

    <div class="card text-white bg-primary mb-3">
        <div class="card-body">
            <h5 class="card-title">Resumo</h5>
            <h6 class="card-subtitle mb-2">R$1.287,00</h6>
        </div>
    </div>

    <hr class="dropdown-divider">

    <div class="card text-white bg-success mt-3 mb-2">
        <div class="card-body">
            <h5 class="card-title">Adiantados</h5>
            <h6 class="card-subtitle mb-2">R$285,00</h6>
        </div>
    </div>

    <div class="card bg-warning mb-2">
        <div class="card-body">
            <h5 class="card-title">Em dias</h5>
            <h6 class="card-subtitle mb-2">R$250,00</h6>
        </div>
    </div>

    <div class="card text-white bg-danger mb-2">
        <div class="card-body">
            <h5 class="card-title">Vencidos</h5>
            <h6 class="card-subtitle mb-2">R$752,00</h6>
        </div>
    </div>

@endsection
<!-- SIDENAV CONTENT>> -->



<!-- <<MAIN CONTENT -->
@section('content')

    <div class="row align-self-stretch">
        <nav class="navbar navbar-light justify-content-center align-items-center p-3">
            <div class="row w-100">
                <div class="col-4 d-flex align-items-center">
                    <button class="btn btn-link" onclick="sidenav.toggle()">
                        <span class="text-secondary"><i class="fas fa-bars"></i></span>
                    </button>
                </div>
                <div class="col-8 text-end">
                    <div class="d-flex justify-content-end align-items-center">
                        <div class="pe-2 lh-1">
                            <span class="text-end">{{ auth()->user()->firstAndLastName() }}</span><br>
                            <span class="text-secondary text-end">{{ auth()->user()->position() }}</span>
                        </div>
                        <div class="ml-1">
                            <div class="dropdown">
                                <span id="imageDropdown" class="clickable" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="{{ auth()->user()->avatar() }}" class="avatar">
                                </span>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="imageDropdown">
                                    <li><span class="dropdown-item clickable">Meu perfil</span></li>
                                    <li><span class="dropdown-item clickable">Configurações</span></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li class="clickable" onclick="app.submitForm()"><span class="dropdown-item text-danger">Sair</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>

    <div class="row d-flex flex-column align-items-stretch flex-grow-1" style="margin-top: 12%;">

        <div class="col-12 col-sm-8 col-lg-4 d-flex justify-content-center align-items-center align-self-center">
            <div class="fs-1 align-self-center">
                <span class="text-primary fw-bolder m-0 p-0">IX</span>
                <span class="text-secondary m-0 p-0">Sync</span>
            </div>
        </div>

        <div id="search-content" class="align-self-center">
            <div class="search-group override-hidden">
                <div class="search">
                    <span id="search-icon" class="search-icon d-flex justify-content-center align-items-center">
                        <i class="fas fa-search"></i>
                    </span>
                    <input type="text" id="search" class="search-control search-control-lg" placeholder="Buscar CPF ou nome do cliente..." aria-label="Busca" oncha ="searchForClients()">
                </div>
                <div id="contentListaDeClientes" class="d-flex flex-column"></div>
            </div>
        </div>

    </div>


    <!-- <<MODAL CLIENTE -->
    <div class="modal fade align-items-center" id="clienteModal" tabindex="-1" aria-labelledby="clienteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <input type="hidden" name="id_cliente" value="0">
                <div class="modal-body">
                    <div class="d-flex flex-column w-100">

                        <button type="button" class="btn-close align-self-end" data-bs-dismiss="modal" aria-label="Close"></button>

                        <div class="d-flex justify-content-center p-3 text-uppercase">
                            <div class="d-flex flex-column justify-content-center align-items-center lh-1">
                                <span class="fas fa-user fa-2x mt-1 mb-1 text-success"></span>
                                <p id="razao" class="h3 ui-text-primary"></p>
                                <p id="endereco" class="h6 ui-text-secondary"></p>
                            </div>
                        </div>

                        <div id="contentAlertModal"></div>

                        <div class="row d-flex justify-content-stretch mb-3">
                            <div class="col-12 col-sm-6 col-md-3 col-lg-3">
                                <div id="fnVencidosCard" class="card text-white bg-danger border-0 clickable">
                                    <div class="card-body">
                                        <span class="d-flex align-items-center opacity-75">
                                            <i class="fas fa-exclamation-triangle"></i>
                                            <span id="fnVencidasQuatidade" class="ms-2">Vencidas (2)</span>
                                        </span>
                                        <p id="fnVencidasValor" class="card-text h4">R$ 120,00</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-3 col-lg-3">
                                <div id="fnEmAbertoCard" class="card text-white bg-info border-0 clickable">
                                    <div class="card-body">
                                        <span class="d-flex align-items-center opacity-75">
                                            <i class="fas fa-thumbs-up"></i>
                                            <span id="fnEmAbertoQuatidade" class="ms-2">Em aberto (7)</span>
                                        </span>
                                        <p id="fnEmAbertoValor" class="card-text h4">R$ 420,00</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-3 col-lg-3">
                                <div id="fnPagasCard" class="card text-white bg-success border-0 clickable">
                                    <div class="card-body">
                                        <span class="d-flex align-items-center opacity-75">
                                            <i class="fas fa-money-bill-wave"></i>
                                            <span id="fnPagasQuatidade" class="ms-2">Pagas (3)</span>
                                        </span>
                                        <p id="fnPagasValor" class="card-text h4">R$ 180,00</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-3 col-lg-3">
                                <div id="fnCanceladasCard" class="card ui-text-primary bg-light border-0 clickable">
                                    <div class="card-body">
                                        <span class="d-flex align-items-center opacity-75">
                                            <i class="fas fa-thumbs-down"></i>
                                            <span id="fnCanceladasQuatidade" class="ms-2">Canceladas (0)</span>
                                        </span>
                                        <p id="fnCanceladasValor" class="card-text h4">R$ 0,0</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex justify-content-stretch">
                            <div class="card w-100">
                                <div id="contentClienteFinanceiro" class="card-body">
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- MODAL CLIENTE>> -->


    <!--<< LOGOUT FORM -->
    <form action="{{ route('logout') }}" method="post"> @csrf </form>
    <!-- LOGOUT FORM>> -->

@endsection
<!-- MAIN CONTENT>> -->



@section('scripts')
    <script src="{{ asset('js/components/Request.js') }}"></script>
    <script src="{{ asset('js/components/Card.js') }}"></script>
    <script src="{{ asset('js/models/Recebimento.js') }}"></script>
    <script src="{{ asset('js/pages/caixa.js') }}"></script>
@endsection
