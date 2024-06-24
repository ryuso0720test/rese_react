@extends('layouts.app')

@section('css')
<link rel="stylesheet" href="{{ asset('css/index.css') }}">
@viteReactRefresh
@vite([
'resources/ts/screen/index.tsx',
])
@endsection



@section('content')

<div id="contents"></div>


@endsection