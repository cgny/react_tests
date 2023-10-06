<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link href="/css/bootstrap.css" rel="stylesheet">
        <style>
            .color{
                border:1px #ccc solid;
                border-radius: 5px;
                box-shadow: 1px 1px 1px #ccc;
            }
        </style>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/jquery-ui.min.js"></script>
        <script>
            var csrf_token = '<?= csrf_token() ?>';
        </script>
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead

    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
