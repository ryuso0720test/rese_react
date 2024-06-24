<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Attendance Management</title>
  <link rel="stylesheet" href="{{ asset('css/app.css') }}">
  <link rel="stylesheet" href="{{ asset('css/sanitize.css') }}">
  <script src="https://kit.fontawesome.com/39f2a58ce1.js" crossorigin="anonymous"></script>
  @yield('css')
  @viteReactRefresh
  @vite([
  'resources/ts/screen/header.tsx',
  'resources/ts/components/Search.tsx',
  ])
</head>

<body>
  <header class="header">
    <div class="header-left">
      <div id="header"></div>
      <h1 class="header-title">Rase</h1>
    </div>
    @if (Auth::check())
    <div class="header-right">
      <div id="search"></div>
    </div>
    @endif
  </header>


  <main>
    @yield('content')
  </main>
</body>

</html>