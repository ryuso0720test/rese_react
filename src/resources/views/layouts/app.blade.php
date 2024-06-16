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
  @yield('css')
  @viteReactRefresh
    @vite([
        'resources/ts/screen/header.tsx',
    ])
</head>

<body>
  <header class="header">
    <div id="header"></div>
    <h1 class="header-title">Rase</h1>
  </header>
  

  <main>
    @yield('content')
  </main>
</body>

</html>