<?php

    include "../config.php";

    $peticion = "INSERT INTO noticias 
                 VALUES (NULL,
                 '".$_GET['titulo']."',
                 '".$_GET['textonoticia']."',
                 '".$_GET['idusuario']."',
                '".date("Y-m-d")."'
    );";

    mysqli_query($conexion,$peticion);
    
?>