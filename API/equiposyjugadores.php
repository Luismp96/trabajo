<?php

    include "../config.php";

    $peticion = "
    SELECT * FROM equipos 
    WHERE identificador = ".$_GET['id']."
    ;
    ";

    $resultado = mysqli_query($conexion,$peticion);
    $datos = [];
        
    while($fila = mysqli_fetch_assoc($resultado)){
        $datos[] = $fila;
    }

    $contenido['equipo'] = $datos;

    $peticion = "
    SELECT * FROM jugadores 
    WHERE id_equipo = ".$_GET['id']."
    ;
    ";

    $resultado = mysqli_query($conexion,$peticion);
    $jugadores = [];

    while($fila = mysqli_fetch_assoc($resultado)){
        $jugadores[] = $fila;

    }

    $contenido['jugadores'] = $jugadores;

    $json = json_encode($contenido,JSON_PRETTY_PRINT);
    echo $json;
    
?>