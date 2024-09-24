<?php
    $servidor = "localhost";
    $usuario = "root";
    $contrasena = "";
    $bd = "login_registro_bd";
    $conexion_BD = mysqli_connect($servidor, $usuario, $contrasena, $bd);

    /* Verificacion de conexion con la BD.
    
    if($conexion_BD){
        echo 'Conexion establecida con la BD.';
    } else {
        echo 'Error de conexion con la BD.';
    }*/
    
    if ($conexion_BD->connect_error){
        die("Conexion Fallida: ". $conexion_BD->connect_error);
    }
?>