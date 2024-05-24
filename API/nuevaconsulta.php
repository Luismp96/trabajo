<?php

    include "../config.php";

    $peticion = "INSERT INTO consultas 
                 VALUES (NULL,
                 '".$_GET['correo']."',
                 '".$_GET['titulo']."',
                 '".$_GET['resumen']."',
                '".date("Y-m-d")."'
    );";

    mysqli_query($conexion,$peticion);
    
?>