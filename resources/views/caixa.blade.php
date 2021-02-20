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
                        <div class="ml-1">
                            <div class="dropdown">
                                <div class="d-flex align-items-center ps-3">
                                    <div class="ps-3 pe-2 lh-1">
                                        <span class="text-end">{{ auth()->user()->firstAndLastName() }}</span><br>
                                        <span class="text-secondary text-end">{{ auth()->user()->position() }}</span>
                                    </div>
                                    <span id="imageDropdown" class="clickable" data-bs-toggle="dropdown" aria-expanded="true" data-bs-reference="parent">
                                        <img src="{{ auth()->user()->avatar() }}" class="avatar">
                                    </span>
                                    <ul class="dropdown-menu dropdown-menu-end position-absolute mt-1" aria-labelledby="imageDropdown">
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
            </div>
        </nav>
    </div>

    <div class="row d-flex flex-column align-items-stretch flex-grow-1" style="margin-top: 10%;">

        <div class="col-12 col-sm-8 col-lg-4 d-flex justify-content-center align-items-center align-self-center">
            <div class="fs-1 align-self-center">
                <span class="text-primary fw-bolder m-0 p-0">IX</span>
                <span class="text-secondary m-0 p-0">Sync</span>
            </div>
        </div>

        <div class="ixs-form-content align-self-center">
            <div id="search-group" class="ixs-form-group override-hidden">
                <div class="ixs-form">
                    <span id="search-icon" class="ixs-form-icon d-flex justify-content-center align-items-center">
                        <i class="fas fa-search"></i>
                    </span>
                    <input type="text" id="search" class="ixs-form-control search-control-lg" placeholder="Buscar CPF ou nome do cliente..." aria-label="Busca">
                </div>
                <div id="contentListaDeClientes" class="d-flex flex-column"></div>
            </div>
        </div>

    </div>

    <div class="d-flex bg-light align-self-end w-100" style="height: 4rem;">

    </div>

    <!-- <<MODAL CLIENTE -->
    <div class="modal fade align-items-center" id="clienteModal" tabindex="-1" aria-labelledby="clienteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content ms-0">
                <input type="hidden" name="id_cliente" >
                <div class="modal-header border-0">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body ixs-text-dark">
                    <div class="d-flex flex-column align-items-center w-100">

                        <div class="d-flex justify-content-center text-uppercase mt-5">
                            <div class="d-flex flex-column justify-content-center align-items-center lh-1">
                                <span class="fas fa-user fa-2x mt-1 mb-1 text-primary"></span>
                                <p id="razao" class="h3 ui-text-primary"></p>
                                <p id="endereco" class="h6 ui-text-secondary ixs-text-secondary"></p>
                            </div>
                        </div>

                        <div class="row d-flex justify-content-center align-items-center w-100 h-100 mt-5">
                            <div class="col-12 col-sm-12 col-md-11 col-lg-9 col-xl-7 col-xxl-6">
                                <div class="d-flex flex-column align-items-stretch">
                                    <div class="row ps-5 pe-5">
                                        <div class="col-12 col-sm-4 col-md-4 col-lg-4">
                                            <div class="ixs-form-group override-hidden mt-2">
                                                <span class="ixs-form-label bg-primary">CPF</span>
                                                <div class="ixs-form">
                                                    <span class="ixs-form-icon d-flex justify-content-center align-items-center">
                                                        <i class="fas fa-id-card"></i>
                                                    </span>
                                                    <span id="modalClienteCPF" class="ixs-form-control fs-6"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-4 col-md-4 col-lg-4">
                                            <div class="ixs-form-group override-hidden mt-2">
                                                <span class="ixs-form-label bg-primary">RG</span>
                                                <div class="ixs-form">
                                                    <span class="ixs-form-icon d-flex justify-content-center align-items-center">
                                                        <i class="fas fa-fingerprint"></i>
                                                    </span>
                                                    <span id="modalClienteRG" class="ixs-form-control fs-6"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-4 col-md-4 col-lg-4">
                                            <div class="ixs-form-group override-hidden mt-2">
                                                <span class="ixs-form-label bg-primary">CONTATO</span>
                                                <div class="ixs-form">
                                                    <span class="ixs-form-icon d-flex justify-content-center align-items-center">
                                                        <i class="fas fa-phone-alt"></i>
                                                    </span>
                                                    <span id="modalClienteContato" class="ixs-form-control fs-6"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="clienteDetalhes" class="d-flex flex-column justify-content-stretch w-100 mt-5"></div>
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
    <script src="{{ asset('js/components/Bootstrap.js') }}"></script>
    <script src="{{ asset('js/components/Group.js') }}"></script>
    <script src="{{ asset('js/components/Accordion.js') }}"></script>
    <script src="{{ asset('js/components/Card.js') }}"></script>
    <script src="{{ asset('js/components/Card2.js') }}"></script>
    <script src="{{ asset('js/components/Contrato.js') }}"></script>
    <script src="{{ asset('js/components/Icon.js') }}"></script>
    <script src="{{ asset('js/components/List.js') }}"></script>
    <script src="{{ asset('js/components/Recebimento.js') }}"></script>
    <script src="{{ asset('js/html/elements.js') }}"></script>
    <script src="{{ asset('js/models/Cliente.js') }}"></script>
    <script src="{{ asset('js/models/ClienteContrato.js') }}"></script>
    <script src="{{ asset('js/pages/Caixa/components.js') }}"></script>
    <script src="{{ asset('js/pages/Caixa/main.js') }}"></script>
@endsection
