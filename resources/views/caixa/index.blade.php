@extends('layouts.sidenav')


@section('title', auth()->user()->firstName())


@section('content')

    <div class="row">
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
                                    <li><a class="dropdown-item" href="#">Meu perfil</a></li>
                                    <li><a class="dropdown-item" href="#">Configurações</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li onclick="app.submitForm()"><a class="dropdown-item">Sair</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>

    <div class="row">

    </div>

    <div class="row">

    </div>

    <!-- LOGOUT FORM -->
    <form action="{{ route('logout') }}" method="post"> @csrf </form>
    <!-- LOGOUT FORM -->

@endsection
