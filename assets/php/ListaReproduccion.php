<?php
    // Iniciar sesion PHP
    session_start();

    // Proteccion de pagina web
    if(!isset($_SESSION['USUARIO'])){
        echo '
            <script>
                window.location = "../../index.php";
                alert("¡ERROR 405: Se debe iniciar sesión!");
            </script>
        ';
        session_destroy();
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Seccion de titulo y logo pestaña -->
    <title>>> ÑuTube</title>
    <link rel="shortcut icon" type="1" href="../images/logo.ico" type="image/x-icon">
    
    <!-- Seccion de Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Platypi:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vast+Shadow&display=swap" rel="stylesheet">

    <!-- Seccion de CSS -->
    <link rel="stylesheet" href="../css/stylesMainPage.css">

    <!-- Seccion de CCS/Iconos del sistema -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css">

    <!-- Seccion para cargar JQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <!-- Seccion superior de la pagina -->
    <div class="contenedor-cabezera">

        <!-- Zona para el logo tipo de la pagina -->
        <div class="contenedor-logo">
            <button id="btn-menu-lateral"><i class="ri-menu-line"></i></button>
            <div class="logotipo">
                <div class="logotipo-imagen">
                    <img src="../images/logo.png" alt="">
                </div>
                <h1 id="logo-texto">ÑuTube</h1>
            </div>
        </div>

        <!-- Zona para el buscador de la pagina -->
        <div class="contenedor-buscador">
            <form action="" id="Buscador">
                <input type="text" placeholder="Buscador" id="contenido_buscar">
                <button type="submit" class="Buscador" id="btn-buscar"><i class="ri-search-2-line"></i></button>
                <button type="submit" class="Microfono" id="btn-micro"><i class="ri-mic-line"></i></button>
            </form>
        </div>

        <!-- Zona para los botones del usuario -->
        <div class="contenedor-perfil">
            <i class="ri-video-add-line"></i>
            <i class="ri-grid-line"></i>
            <i class="ri-notification-2-line"></i>
            <div class="Caja-perfil">
                <img src="../images/user.png" alt="">
            </div>
            <a href="./CerrarSesion.php"><i class="ri-logout-box-r-line"></i></a>
        </div>
    </div>

    <!-- Seccion media inferior de la pagina -->
    <div class="contenedor-cuerpo">

        <!-- Menu lateral izquierdo de la pagina -->
        <div class="Menu-lateral" id="Menu_lateral">
            <div class="Secciones-de-Menu">
                <a href="./MainPage.php" class="Seccion-Menu" ><i class="ri-home-5-line" title="Inicio"></i>Inicio</a>
                <a href="./Shorts.php" class="Seccion-Menu"><i class="ri-wireless-charging-line" title="Shorts"></i>Shorts</a>
                <a href="./Subscripciones.php" class="Seccion-Menu"><i class="ri-rss-line" title="Subscripciones"></i>Subscripciones</a>
                <hr>
                <h4 class="titulo-seccion" id="t_1">Tú</h4>
                <a href="./TuCanal.php" class="Seccion-Menu"><i class="ri-contacts-line" title="Tu canal"></i>Tu canal</a>
                <a href="./Historial.php" class="Seccion-Menu"><i class="ri-history-line" title="Historial"></i>Historial</a>
                <a href="./ListaReproduccion.php" class="Seccion-Menu selecionado"><i class="ri-play-list-2-fill" title="Listas de reproducción"></i>Listas de reproducción</a>
                <a href="./MisVideos.php" class="Seccion-Menu"><i class="ri-video-line" title="Mis videos"></i>Mis videos</a>
                <a href="./VerMasTarde.php" class="Seccion-Menu"><i class="ri-time-line" title="Ver más tarde"></i>Ver más tarde</a>
                <a href="./VideosQueTeGustan.php" class="Seccion-Menu"><i class="ri-thumb-up-line" title="Videos que me gustan"></i>Videos que me gustan</a>
                <a href="./TusClips.php" class="Seccion-Menu"><i class="ri-scissors-cut-line" title="Tus clips"></i>Tus clips</a>
                <hr>
                <h4 class="titulo-seccion" id="t_2">Explorar</h4>
                <a href="./Tendencias.php" class="Seccion-Menu"><i class="ri-meteor-line" title="Tendencias"></i>Tendencias</a>
                <a href="./Musica.php" class="Seccion-Menu"><i class="ri-music-2-line" title="Música"></i>Música</a>
                <a href="./VideoJuegos.php" class="Seccion-Menu"><i class="ri-gamepad-line" title="Videojuegos"></i>Videojuegos</a>
                <a href="./Deportes.php" class="Seccion-Menu"><i class="ri-trophy-line" title="Deportes"></i>Deportes</a>
                <a href="./Aprendizaje.php" class="Seccion-Menu"><i class="ri-lightbulb-line" title="Aprendizaje"></i>Aprendizaje</a>
                <hr>
                <h4 class="titulo-seccion" id="t_3">Más de Ñutube</h4>
                <a href="#" class="Seccion-Menu"><i class="ri-youtube-fill" title="ÑuTube Premium"></i>ÑuTube Premium</a>
                <a href="#" class="Seccion-Menu"><i class="ri-youtube-fill" title="ÑuTube Studio"></i>ÑuTube Studio</a>
                <a href="#" class="Seccion-Menu"><i class="ri-youtube-fill" title="ÑuTube Music"></i>ÑuTube Music</a>
                <a href="#" class="Seccion-Menu"><i class="ri-youtube-fill" title="ÑuTube Kids"></i>ÑuTube Kids</a>
                <hr>
                <a href="./Configuracion.php" class="Seccion-Menu"><i class="ri-settings-5-line" title="Configuración"></i>Configuración</a>
                <a href="./HistorialDeDenuncias.php" class="Seccion-Menu"><i class="ri-flag-2-line" title="Historial de denuncias"></i>Historial de denuncias</a>
                <a href="./Ayuda.php" class="Seccion-Menu"><i class="ri-question-line" title="Ayuda"></i>Ayuda</a>
                <a href="./EnviarSugerencia.php" class="Seccion-Menu"><i class="ri-feedback-line" title="Enviar sugerencias"></i>Enviar sugerencias</a>
            </div>
        </div>

        <!-- Seccion central de contenido multimedia -->
        <div class="Contenido" id="contenido_v">
            <h1 style="color:white;margin-left:100px;margin-top:100px">Por Desarrollar...</h1>
        </div>
    </div>

    <!-- Seccion de scripts JS -->

    <!-- Script para despligue de menu lateral -->
    <script src="../js/scriptMenuLateral.js"></script>