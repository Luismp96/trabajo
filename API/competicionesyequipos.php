<?php

    include "../config.php";

    $peticion = "
    SELECT * FROM participaciones 
    WHERE id_competicion = ".$_GET['id']."
    ;
    ";

    $resultado = mysqli_query($conexion,$peticion);
    $datos = [];
        
    while($fila = mysqli_fetch_assoc($resultado)){
        $datos[] = $fila;
    }

    $json = json_encode($datos,JSON_PRETTY_PRINT);
    echo $json;
    
?>