<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

    @include('includes.head')

    <body>

        <div class="container-fluid">

            @yield('content')

        </div>

        @include('includes.scripts')

    </body>
</html>
