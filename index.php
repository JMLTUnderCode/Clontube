<?php
    // Iniciar sesion PHP
    session_start();
    if(isset($_SESSION['USUARIO'])){
        header('location: ./assets/php/MainPage.php');
        die();
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Seccion de titulo y logo pestaña -->
    <title>>> Login || ÑuTube</title>
    <link rel="shortcut icon" type="1" href="./assets/images/logo.ico" type="image/x-icon">

    <!-- Seccion de Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Platypi:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vast+Shadow&display=swap" rel="stylesheet">

    <!-- Seccion de CSS -->
    <link rel="stylesheet" href="./assets/css/stylesLoginPage.css">
</head>
<body>
    <main>
        <div class="fondo-logotipo">
            <div class="logotipo">
                <img src="./assets/images/logo.png" alt="">
            </div>
            <h2>ÑuTube</h2>
        </div>
        <div class="contenedor-general">
            <!-- Seccion para la informacion mostrada en la caja del fondo -->
            <div class="caja-fondo">

                <!-- En caso de querer iniciar sesion -->
                <div class="caja-fondo-login">
                    <h3>¿Ya tienes una cuenta?</h3>
                    <p>¡Inicia sesión y disfruta de ÑuTube!</p>
                    <button id="btn-iniciar-seccion">Iniciar ÑuTube</button>
                </div>

                <!-- En caso de querer registrarse -->
                <div class="caja-fondo-registro">
                    <h3>¿Aún no tienes una cuenta?</h3>
                    <p>¡Regístrate para disfrutar de ÑuTube!</p>
                    <button id="btn-registrarse">Registrarse</button>
                </div>
            </div>

            <!-- Seccion para la informacion de los formularios de login y registro -->
            <div class="contenedor-login-registro">
                <!-- Seccion de login de usuario -->
                <form action="./assets/php/LoginUsuarioBD.php" method="POST" class="formulario-login">
                    <h2>Iniciar Sesión</h2>
                    <input type="text" placeholder="Correo Electrónico" name="correo_usuario">
                    <input type="password" placeholder="Contraseña" name="contrasena_usuario">
                    <button id="btn-entrar" type="submit">Entrar</button>
                </form>

                <!-- Seccion de registro de usuario -->
                <form action="./assets/php/RegistroUsuarioBD.php" method="POST" class="formulario-registro">
                    <h2>Registrarse</h2>
                    <input type="text" placeholder="Nombre Completo" name="nombre_completo">
                    <input type="text" placeholder="Nombre de Usuario" name="nuevo_usuario">
                    <input type="text" placeholder="Correo Electrónico" name="nuevo_correo_usuario">
                    <input type="text" placeholder="Confirmar Correo Electrónico" name="confir_nuevo_correo_usuario">
                    <input type="password" placeholder="Contraseña" name="nueva_contrasena_usuario">
                    <input type="password" placeholder="Confirmar Contraseña" name="confir_nueva_contrasena_usuario">
                    <button id="btn-registro" type="submit">Registro</button>
                </form>
            </div>
        </div>
    </main>
    
    <!-- Seccion de scripts JS -->
    <script src="./assets/js/scriptsLoginRegistro.js"></script>
</body>
</html>