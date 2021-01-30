@extends('layouts.clean')


@section('title', 'Login')


@section('content')

    <div class="container-fluid vh-100 d-inline-block">
        <div class="row justify-content-center h-100">

            <div class="col-sm-10 col-md-7 col-lg-4 align-self-center">
                <div class="card ui-card-md shadow-sm p-md-4 p-lg-4 m-md-4 m-lg-4 bg-white rounded">
                    <div class="card-body p-4">

                        <h1 class="card-title">LOGIN</h1>
                        <h6 class="text-secondary mb-3">Olá! Digite seu e-mail e senha.</h6>

                        <form name="login" action="{{ route('authenticate') }}" method="POST">
                            @csrf

                            <div class="input-group mb-3">
                                <span class="input-group-text text-secondary" id="basic-addon1">
                                    <i class="fas fa-user"></i>
                                </span>
                                <input type="email" name="username" class="form-control" placeholder="E-mail" aria-label="E-mail" required>
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text text-secondary" id="basic-addon1">
                                    <i class="fas fa-lock"></i>
                                </span>
                                <input type="password" name="current-password" class="form-control" placeholder="Senha" aria-label="Senha" required>
                            </div>
                        </form>

                        <div class="row">
                            <div class="col-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="remember">
                                    <label class="form-check-label" for="remember">Lembrar</label>
                                </div>
                            </div>
                            <div class="col-8 col-sm-8 col-md-8 col-lg-8 text-end">
                                <button class="btn btn-secondary align-self-end" onclick="app.clearFormData()">Limpar</button>
                                <button class="btn btn-primary align-self-end" onclick="app.submitForm()">Entrar <i class="fas fa-sign-in-alt"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

@endsection
