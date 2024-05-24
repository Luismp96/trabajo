<?php

    include "Carrito.php";
    include "Producto.php";
    include "Cliente.php";
    include "Direccion.php";

    $archivo = "../CARRITOS/carrito".$_GET['usuario'].".json";
    $carritousuario = file_get_contents("../CARRITOS/carrito".$_GET['usuario'].".json");

    $json = json_decode($carritousuario);

    $json->productos = [];
    $json->cliente = $_GET['usuario'];
    $json->total = 0;

    $cadena = json_encode($json, JSON_PRETTY_PRINT);

    file_put_contents($archivo,$cadena);


?>