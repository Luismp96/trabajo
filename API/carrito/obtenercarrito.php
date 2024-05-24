<?php

    $datos = file_get_contents("../CARRITOS/carrito".$_GET['usuario'].".json");

    echo $datos;

?>