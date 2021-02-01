<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">


    @section('styles')
        <link rel="stylesheet" href="{{ asset('css/custom/sidenav.css') }}">
    @endsection


    @include('includes.head')


    <body>

        <nav id="sidenav" class="sidenav bg-light border-end">

            <nav class="navbar navbar-light p-3">
                <div class="container-fluid">
                    <div class="row align-content-center">
                        <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                            <button class="btn btn-light" onclick="sidenav.toggle()">
                                <span class="text-secondary"><i class="fas fa-times"></i></span>
                            </button>
                        </div>
                        <div class="col-12 col-sm-6 col-md-6 col-lg-6 text-end">
                        </div>
                    </div>
                </div>
            </nav>

            <div class="d-flex justify-content-center align-items-center p-3">
                
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>

            </div>

        </nav>

        <div class="container-fluid">
            @yield('content')
        </div>

        @include('includes.scripts')

        <script src="{{ asset('js/sidenav.js') }}"></script>

    </body>
</html>
