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

    $json = json_encode($contenido,JSON_PRETTY_PRINT);
    echo $json;
    
?>