<?php

    include "../config.php";

    $peticion = "SELECT e2.nombre AS nombreequipo,
                        e2.identificador AS idequipo
                FROM jugadores j
                INNER JOIN usuarios e1 ON j.id_usuario = e1.identificador
                INNER JOIN equipos e2 ON j.id_equipo = e2.identificador
                WHERE e1.usuario = '".$_GET['usuario']."'
                ORDER BY e2.nombre ASC;";

    $resultado = mysqli_query($conexion,$peticion);
    $datos = [];
        
    while($fila = mysqli_fetch_assoc($resultado)){
        $datos[] = $fila;
    }

    $json = json_encode($datos);
    echo $json;
    
?>