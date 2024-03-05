<?php

    include "../config.php";

    $peticion = "DELETE FROM jugadores 
                WHERE identificador = ".$_GET['id']."
    ;";

    mysqli_query($conexion,$peticion);
    
?>