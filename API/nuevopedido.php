<?php

    include "../config.php";

    $peticion = "INSERT INTO pedidos 
                 VALUES (NULL,
                 '".$_GET['usuario']."',
                 '".$_GET['direccion']."',
                 '".$_GET['localidad']."',
                 '".$_GET['codpostal']."',
                 '".$_GET['numtarjeta']."',
                 '".$_GET['fechacaducidad']."',
                 '".$_GET['cvv']."',
                 '".$_GET['productos']."'
    );";

    mysqli_query($conexion,$peticion);
    
?>