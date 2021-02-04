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

    <div class="row d-flex flex-column align-items-stretch flex-grow-1" style="margin-top: 14rem;">

        <div class="col-12 col-sm-8 col-lg-4 d-flex justify-content-center align-items-center align-self-center">
            <div class="fs-1 align-self-center">
                <span class="text-primary fw-bolder m-0 p-0">IX</span>
                <span class="text-secondary m-0 p-0">Sync</span>
            </div>
        </div>

        <div class="col-12 col-sm-9 col-lg-4 align-self-center">
            <div class="search-group override-hidden">
                <div class="search">
                    <span id="search-icon" class="search-icon d-flex justify-content-center align-items-center">
                        <i class="fas fa-search"></i>
                    </span>
                    <input type="text" id="search" class="search-control search-control-lg" placeholder="Buscar CPF ou nome do cliente..." aria-label="Busca" oncha ="searchForClients()">
                </div>
                <div id="searchResult" class="d-flex flex-column">

                </div>
            </div>
        </div>

    </div>

    <div class="modal fade align-items-center" id="clienteModal" tabindex="-1" aria-labelledby="clienteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="d-flex flex-column w-100">

                        <button type="button" class="btn-close align-self-end" data-bs-dismiss="modal" aria-label="Close"></button>

                        <div class="d-flex justify-content-center p-3">
                            <div class="d-flex flex-column justify-content-center align-items-center lh-1">
                                <span class="fas fa-user fa-2x text-success"></span>
                                <p class="h3 ui-text-primary">FELIPE DE SOUSA DO CARMO</p>
                                <p class="h6 ui-text-secondary">ALGODÕES, SN, PRÓXIMO AO GINÁSIO DA ESCOLA</p>
                            </div>
                        </div>

                        <div id="contentAlertModal">

                        </div>

                        <div class="d-flex justify-content-stretch">
                            <div class="card w-100">
                                <div class="card-body">
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--<< LOGOUT FORM -->
    <form action="{{ route('logout') }}" method="post"> @csrf </form>
    <!-- LOGOUT FORM>> -->

@endsection
<!-- MAIN CONTENT>> -->



@section('scripts')
    <script src="{{ asset('js/components/Request.js') }}"></script>
    <script src="{{ asset('js/pages/caixa.js') }}"></script>
@endsection
