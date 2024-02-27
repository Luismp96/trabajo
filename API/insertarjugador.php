<?php

    include "../config.php";

    $peticion = "INSERT INTO jugadores 
                 VALUES (NULL,
                 '".$_GET['nombre']."',
                 '".$_GET['idusuario']."',
                 '".$_GET['idequipo']."',
                 '".$_GET['edad']."',
                 '".$_GET['idposicion']."',
                 '".$_GET['dorsal']."',
                '".$_GET['fechanacimiento']."'
    );";

    mysqli_query($conexion,$peticion);
    
?>