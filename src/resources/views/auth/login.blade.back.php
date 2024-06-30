@extends('layouts.app')

@section('css')
<link rel="stylesheet" href="{{ asset('css/login.css') }}">
@endsection

@section('content')
<div class='formContainer'>
    <form class="form" method="post" action="/login">
        @csrf
        <h1>Login</h1>
        <div class="uiForm">
            <div class="formField">
                <label>
                    <i class="fas fa-envelope"></i>
                </label>
                <input type="email" placeholder='Email' name='email' value="{{ old('email') }}" />
            </div>
            <div class="formField">
                <label>
                    <i class="fas fa-unlock-alt"></i>
                </label>
                <input type="password" placeholder='Password' name='password' />
            </div>
            <button class="submitButton">登録</button>
        </div>
    </form>
</div>
@endsection