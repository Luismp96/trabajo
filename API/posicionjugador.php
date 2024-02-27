<?php

    include "../config.php";

    $peticion = "SELECT * FROM posiciones where identificador = ".$_GET['id'].";";
    $resultado = mysqli_query($conexion,$peticion);
        
    if ($fila = mysqli_fetch_assoc($resultado)){
        echo '{"posicion":"'.$fila['nombre'].'"}';
    }else{
        echo '{"posicion":""}';
    }
?>