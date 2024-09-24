<?php
    // Iniciar sesion PHP
    session_start();
    
    // Incluir la conexion con la BD.
    include './ConexionBD.php';

    // Extraccion de datos del nuevo usuario.
    $nombre_completo = $_POST['nombre_completo'];
    $usuario = $_POST['nuevo_usuario'];
    $correo = $_POST['nuevo_correo_usuario'];
    $confirmacion_correo = $_POST['confir_nuevo_correo_usuario'];
    $contrasena = $_POST['nueva_contrasena_usuario'];
    $confirmacion_contrasena = $_POST['confir_nueva_contrasena_usuario'];

    // Verificacion de confirmacion de campos.
    if($correo != $confirmacion_correo || $contrasena != $confirmacion_contrasena){
        echo '
            <script>
                window.location = "../../index.php";
                alert("¡ERROR 400: La contraseña o correo no coinciden!");
            </script>
        ';
        mysqli_close($conexion_BD); // Cerramos la conexion con la BD por seguridad.
        exit(); // Salimos en este punto del programa.
    }
        
    // Verificamos la existencia del correo en la BD.
    $verificar_correo = mysqli_query($conexion_BD, 
        "SELECT * FROM usuarios WHERE correo='$correo';");
    if(mysqli_num_rows($verificar_correo) > 0){
        echo '
            <script>
                window.location = "../../index.php";
                alert("¡ERROR 401: El correo ya esta registrado, intenta con uno diferente!")
            </script>
        ';
        
        mysqli_close($conexion_BD); // Cerramos la conexion con la BD por seguridad.
        exit(); // Salimos en este punto del programa.
    }

    // Verificamos la existencia del usuario en la BD.
    $verificar_usuario = mysqli_query($conexion_BD, 
        "SELECT * FROM usuarios WHERE usuario='$usuario';");
    if(mysqli_num_rows($verificar_usuario) > 0){
        echo '
            <script>
                window.location = "../../index.php";
                alert("¡ERROR 402: El usuario ya esta registrado, intenta con uno diferente!")
            </script>
        ';
        
        mysqli_close($conexion_BD); // Cerramos la conexion con la BD por seguridad.
        exit(); // Salimos en este punto del programa.
    }

    // Encriptamos la contraseña del usuario por seguridad.
    $contrasena = hash('sha512', $contrasena);

    // Creamos y ejecutamos la query de insercion de datos.
    $query_insercion_datos_usuario = "INSERT INTO usuarios(nombre_completo, usuario, correo, contrasena) 
    VALUES('$nombre_completo', '$usuario', '$correo', '$contrasena')";

    $ejecutar = mysqli_query($conexion_BD, $query_insercion_datos_usuario);
    
    // Verificamos ejecucion del a query y mostramos mensajes.
    if($ejecutar){
        echo '
            <script>
                window.location = "./MainPage.php";
                alert("¡REGISTRO EXITOSO!");
            </script>
        ';
        $_SESSION['USUARIO'] = $correo;
    } else {
        echo '
            <script>
                window.location = "../../index.php";
                alert("¡ERROR 403: Error inesperado, intentelo más tarde!");
            </script>
        ';
    }

    mysqli_close($conexion_BD); // Cerramos la conexion con la BD por seguridad.
?>