<link rel="stylesheet" href="{{ asset('css/login.css') }}">
<script src="https://kit.fontawesome.com/39f2a58ce1.js" crossorigin="anonymous"></script>
@yield('css')
@viteReactRefresh
    @vite([
        'resources/ts/screen/login_page.tsx',
    ])

@extends('layouts.app')

@section('content')
<div id="login-content"></div>
@endsection