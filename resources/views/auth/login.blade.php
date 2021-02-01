@extends('layouts.clean')


@section('title', 'Login')


@section('styles')
    <link href="{{ asset('css/custom/login.css') }}" type="text/css" rel="stylesheet">
@endsection


@section('content')
        
        <main class="form-signin text-center">
            <form action="{{ route('authenticate') }}" method="POST">
                @csrf
                
                <img class="mb-4" src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
                
                <h1 class="h3 mb-3 fw-normal">Seja bem-vindo!</h1>
                
                <label for="inputEmail" class="visually-hidden">Email</label>
                <input type="email" name="username" id="inputEmail" class="form-control" placeholder="Email" required autofocus>
                
                <label for="inputPassword" class="visually-hidden">Senha</label>
                <input type="password" name="current-password" id="inputPassword" class="form-control" placeholder="Senha" required>

                <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"> Lembrar de mim
                    </label>
                </div>

                <button class="w-100 btn btn-lg btn-primary" type="submit">Entrar</button>

                <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
            </form>
        </main>

@endsection
