<?php

    include "../config.php";

    $peticion = "INSERT INTO usuarios 
                 VALUES (NULL,
                 '".$_GET['usuario']."',
                 '".$_GET['contrasena']."',
                 '".$_GET['nombre']."',
                 '".$_GET['apellidos']."',
                '".$_GET['email']."',
                '".$_GET['localidad']."'
    );";

    mysqli_query($conexion,$peticion);
    
?>