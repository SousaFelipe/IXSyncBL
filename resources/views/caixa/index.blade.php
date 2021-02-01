@extends('layouts.sidenav')


@section('title', auth()->user()->firstName())


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

        <div class="col-12 col-sm-8 col-lg-4 align-self-center">
            <div class="search">
                <span class="search-icon">
                    <i class="fas fa-search"></i>
                </span>
                <input type="text" id="search" class="search-control search-control-lg" placeholder="Buscar CPF ou nome do cliente..." aria-label="Busca" oncha ="searchForClients()">
                <div id="searchResult">

                </div>
            </div>
        </div>

        <div>

        </div>

    </div>

    <!-- LOGOUT FORM -->
    <form action="{{ route('logout') }}" method="post"> @csrf </form>
    <!-- LOGOUT FORM -->

@endsection


@section('scripts')
    <script src="{{ asset('js/pages/caixa.js') }}"></script>
@endsection
