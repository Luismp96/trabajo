<?php

    $usuario = "tfg";
    $contrasena = "trabajo";
    $basededatos = "trabajo";
    $servidor = "localhost";

    //CONEXION BBDD (sin creacion de objeto MSQLI)
    $conexion = mysqli_connect($servidor,$usuario,$contrasena,$basededatos);    

?>