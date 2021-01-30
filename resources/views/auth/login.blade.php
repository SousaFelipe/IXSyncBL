@extends('layouts.clean')


@section('title', 'Login')


@section('content')

    <div class="container-fluid vh-100 d-inline-block">

        <div class="card shadow-sm p-3 bg-white rounded" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>

              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
              </div>

              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>

    </div>

    <form action="{{ route('authenticate') }}" method="POST">
        @csrf

        
    </form>


@endsection
