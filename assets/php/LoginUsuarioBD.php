<?php
    // Iniciar sesion PHP
    session_start();
    
    // Incluir la conexion con la BD.
    include './ConexionBD.php';
    
    // Extraccion de datos del usuario.
    $correo = $_POST['correo_usuario'];
    $contrasena = $_POST['contrasena_usuario'];

    // Encriptamos la contraseña del usuario por seguridad.
    $contrasena = hash('sha512', $contrasena);
    
    // Verificamos si el usuario existe en la BD.
    $validar_login = mysqli_query($conexion_BD, 
        "SELECT * FROM usuarios WHERE correo='$correo' AND contrasena='$contrasena';");
    if(mysqli_num_rows($validar_login) == 1){
        $_SESSION['USUARIO'] = $correo;
        header("Location: ./MainPage.php");
        die();
    } else {
        echo '
            <script>
                window.location = "../../index.php";
                alert("¡ERROR 404: Los datos proporcionados no coinciden con una cuenta!");
            </script>
        ';
    }

    mysqli_close($conexion_BD); // Cerramos la conexion con la BD por seguridad.
?>