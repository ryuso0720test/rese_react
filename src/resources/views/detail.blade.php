@extends('layouts.app2')

@section('css')
<link rel="stylesheet" href="{{ asset('css/detail.css') }}">
@viteReactRefresh
@vite([
'resources/ts/index.tsx',
])
@endsection



@section('content')

<div id="detail">詳細画面</div>


@endsection