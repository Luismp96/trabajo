<?php

    include "../config.php";

    $peticion = "SELECT j.goleslocal AS goleslocal, 
                    e1.nombre AS nombre_equipo_local, 
                    j.golesvisitante AS golesvisitante, 
                    e2.nombre AS nombre_equipo_visitante,
                    j.numerojornada AS numerojornada
                FROM jornadas j
                INNER JOIN equipos e1 ON j.id_local = e1.identificador
                INNER JOIN equipos e2 ON j.id_visitante = e2.identificador
                ORDER BY j.numerojornada ASC;";

    $resultado = mysqli_query($conexion,$peticion);
    $datos = [];
        
    while($fila = mysqli_fetch_assoc($resultado)){
        $datos[] = $fila;
    }

    $json = json_encode($datos);
    echo $json;
    
?>