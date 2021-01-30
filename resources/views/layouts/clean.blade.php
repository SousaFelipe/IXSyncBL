<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

    @include('includes.head')

    <body>

        @yield('content')

        <script src="{{ asset('vendor/jquery/jquery-3.5.1.min.js') }}"></script>
        <script src="{{ asset('vendor/bootstrap/js/bootstrap.min.js') }}"></script>

    </body>
</html>
