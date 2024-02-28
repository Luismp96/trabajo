<?php

    include "../config.php";

    $peticion = "SELECT * FROM equipos where identificador = ".$_GET['id'].";";
    $resultado = mysqli_query($conexion,$peticion);
        
    if ($fila = mysqli_fetch_assoc($resultado)){
        echo '{"equipo":"'.$fila['nombre'].'"}';
    }else{
        echo '{"equipo":""}';
    }
?>