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
        <div class="modal-dialog modal-fullscreen-md-down modal-lg">
            <div class="modal-content">
                <input type="hidden" name="id_cliente" >
                <div class="modal-header border-0">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex flex-column w-100">

                        <div class="d-flex justify-content-center text-uppercase mb-3">
                            <div class="d-flex flex-column justify-content-center align-items-center lh-1">
                                <span class="fas fa-user fa-2x mt-1 mb-1 text-success"></span>
                                <p id="razao" class="h3 ui-text-primary"></p>
                                <p id="endereco" class="h6 ui-text-secondary"></p>
                            </div>
                        </div>

                        <div class="d-flex flex-column w-100 m-0 p-0">
                            <div class="row d-flex justify-content-stretch mb-3">
                                <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                                    <div id="fnVencidosCard" class="card text-white bg-danger border-0 mb-sm-3 mb-md-3 clickable">
                                        <div class="d-flex justify-content-center align-items-center bg-danger w-100 h-100 rounded position-absolute">
                                            <div class="spinner-border text-light" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <span class="d-flex align-items-center opacity-75">
                                                <i class="fas fa-exclamation-triangle"></i>
                                                <span id="fnVencidosQuatidade" class="ms-2"></span>
                                            </span>
                                            <p id="fnVencidosValor" class="card-text h4"></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                                    <div id="fnEmAbertoCard" class="card text-white bg-info border-0 clickable">
                                        <div class="d-flex justify-content-center align-items-center bg-info w-100 h-100 rounded position-absolute">
                                            <div class="spinner-border text-light" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <span class="d-flex align-items-center opacity-75">
                                                <i class="fas fa-thumbs-up"></i>
                                                <span id="fnEmAbertoQuatidade" class="ms-2"></span>
                                            </span>
                                            <p id="fnEmAbertoValor" class="card-text h4"></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                                    <div id="fnPagosCard" class="card text-white bg-success border-0 mb-sm-3 mb-md-3 clickable">
                                        <div class="d-flex justify-content-center align-items-center bg-success w-100 h-100 rounded position-absolute">
                                            <div class="spinner-border text-light" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <span class="d-flex align-items-center opacity-75">
                                                <i class="fas fa-money-bill-wave"></i>
                                                <span id="fnPagosQuatidade" class="ms-2"></span>
                                            </span>
                                            <p id="fnPagosValor" class="card-text h4"></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                                    <div id="fnCanceladosCard" class="card ui-text-primary bg-light border-0 clickable">
                                        <div class="d-flex justify-content-center align-items-center bg-light w-100 h-100 rounded position-absolute">
                                            <div class="spinner-border text-dark" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <span class="d-flex align-items-center opacity-75">
                                                <i class="fas fa-thumbs-down"></i>
                                                <span id="fnCanceladosQuatidade" class="ms-2"></span>
                                            </span>
                                            <p id="fnCanceladosValor" class="card-text h4"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div class="d-flex justify-content-stretch">
                                <div id="cardClienteFn" class="card border-danger w-100">
                                    <div class="card-header">
                                        <div class="row pt-1 pb-1 fw-bolder">
                                            <div class="col-1">PG</div>
                                            <div class="col-2 override-pills fs-7">ID</div>
                                            <div class="col-3 override-pills fs-7">VENCIMENTO</div>
                                            <div class="col-2 override-pills fs-7">ABERTO</div>
                                            <div class="col-2 override-pills fs-7">CANCELADO</div>
                                            <div class="col-2 override-pills fs-7">RECEBIDO</div>
                                        </div>
                                    </div>
                                    <div id="contentClienteFn" class="card-body pt-1 pb-1" style="max-height: 14rem; overflow-x: hidden; overflow-y: auto;">
                                    </div>
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
    <script src="{{ asset('js/html/elements.js') }}"></script>
    <script src="{{ asset('js/pages/caixa.js') }}"></script>
@endsection
