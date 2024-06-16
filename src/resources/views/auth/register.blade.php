<meta name="csrf-token" content="{{ csrf_token() }}">
<link rel="stylesheet" href="{{ asset('css/register.css') }}">
<script src="https://kit.fontawesome.com/39f2a58ce1.js"
crossorigin="anonymous"></script>
@yield('css')
@viteReactRefresh
    @vite([
        'resources/ts/screen/register_page.tsx',
    ])

@extends('layouts.app')

@section('content')
<div id="register-content"></div>
@endsection