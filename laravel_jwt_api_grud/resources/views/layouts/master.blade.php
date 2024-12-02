<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
<!-- Font Awesome -->
<link href="{{URL::asset('css/fontawesome-free/css/all.min.css')}}" rel="stylesheet">
<!-- Theme style -->
<link href="{{URL::asset('css/adminlte.min.css')}}" rel="stylesheet">

<link href="{{URL::asset('datatables/css/datatables-bs4/dataTables.bootstrap4.min.css')}}" rel="stylesheet">
<link href="{{URL::asset('datatables/css/datatables-responsive/responsive.bootstrap4.min.css')}}" rel="stylesheet">
<link href="{{URL::asset('datatables/css/datatables-buttons/buttons.bootstrap4.min.css')}}" rel="stylesheet">
</head>
<body class="hold-transition sidebar-mini">
<!-- Site wrapper -->
<div class="wrapper">

<!-- Navbar -->
<nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
        </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
        <!-- Navbar Search -->
        <!-- Notifications Dropdown Menu -->
        <li class="nav-item dropdown">
            <a class="nav-link" data-toggle="dropdown" href="#">
                <i class="fas fa-user-tie"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <a href="#">
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <a class="dropdown-item" href="#"
                        onclick="event.preventDefault();
                        this.closest('form').submit();"> <i class="fas fa-envelope mr-2"></i> Log out</a>
                    </form>
                </a>
                <div class="dropdown-divider"></div>
            </div>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-widget="fullscreen" href="#" role="button">
                <i class="fas fa-expand-arrows-alt"></i>
            </a>
        </li>
    </ul>
</nav>
<!-- /.navbar -->

<!-- Main Sidebar Container -->
<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="{{route('posts.index')}}" class="brand-link">
        <img src="{{URL::asset('logo.jpg')}}" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
             style="opacity: .8">
        <span class="brand-text font-weight-light">MoraSoft</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
        <!-- Sidebar user (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
                <img src="{{URL::asset('avatar.png')}}" class="img-circle elevation-2" alt="User Image">
            </div>
            <div class="info">
                <a href="#" class="d-block">{{Auth::user()->name}}</a>
            </div>
        </div>

        <!-- SidebarSearch Form -->
        <div class="form-inline">
            <div class="input-group" data-widget="sidebar-search">
                <input class="form-control form-control-sidebar" type="search" placeholder="Search"
                       aria-label="Search">
                <div class="input-group-append">
                    <button class="btn btn-sidebar">
                        <i class="fas fa-search fa-fw"></i>
                    </button>
                </div>
            </div>
        </div>
<!-- Sidebar Menu -->
<nav class="mt-2">
    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
        data-accordion="false">
        <li class="nav-item">
            <a href="{{route('posts.index')}}" class="nav-link">
                <i class="nav-icon far fa-calendar-alt"></i>
                <p>
                    Posts
                    <span class="badge badge-info right">{{\App\Models\Post::count()}}</span>
                </p>
            </a>
        </li>
    </ul>
</nav>
<!-- /.sidebar-menu -->
</div>
<!-- /.sidebar -->
</aside>

@yield('content')

<footer class="main-footer">
    <div class="float-right d-none d-sm-block">
    </div>
    <strong>Copyright &copy; 2025 <a href="#">zarzour</a>.</strong> All rights reserved.
</footer>


</div>
<!-- ./wrapper -->
<!-- jQuery -->
<script src="{{URL::asset('js/jquery/jquery.min.js')}}"></script>
<!-- Bootstrap 4 -->
<script src="{{URL::asset('js/bootstrap/js/bootstrap.bundle.min.js')}}"></script>


<!-- DataTables  & Plugins -->
<script src="http://127.0.0.1:8000/datatables/js/datatables/jquery.dataTables.min.js"></script>
<script src="http://127.0.0.1:8000/datatables/js/datatables-bs4/dataTables.bootstrap4.min.js"></script>
<script src="http://127.0.0.1:8000/datatables/js/datatables-responsive/dataTables.responsive.min.js"></script>
<script src="http://127.0.0.1:8000/datatables/js/datatables-responsive/responsive.bootstrap4.min.js"></script>
<script src="http://127.0.0.1:8000/datatables/js/datatables-buttons/dataTables.buttons.min.js"></script>
<script src="http://127.0.0.1:8000/datatables/js/datatables-buttons/buttons.bootstrap4.min.js"></script>
<script src="http://127.0.0.1:8000/datatables/js/jszip/jszip.min.js"></script>
<script src="http://127.0.0.1:8000/datatables/js/pdfmake/pdfmake.min.js"></script>
<script src="http://127.0.0.1:8000/datatables/js/pdfmake/vfs_fonts.js"></script>
<script src="http://127.0.0.1:8000/datatables/js/datatables-buttons/buttons.html5.min.js"></script>
<script src="http://127.0.0.1:8000/datatables/js/datatables-buttons/buttons.print.min.js"></script>
<script src="http://127.0.0.1:8000/datatables/js/datatables-buttons/buttons.colVis.min.js"></script>

<!-- AdminLTE App -->
<script src="{{URL::asset('js/adminlte.min.js')}}"></script>
<!-- AdminLTE for demo purposes -->
<script src="{{URL::asset('js/demo.js')}}"></script>

<script>
    $(function () {
        $("#example1").DataTable({
            "responsive": true, "lengthChange": false, "autoWidth": false,
            "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
        $('#example2').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "info": true,
            "autoWidth": false,
            "responsive": true,
        });
    });
</script>

</body>
</html>
