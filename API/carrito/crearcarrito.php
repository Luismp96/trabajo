<?php

    include "Carrito.php";
    include "Producto.php";
    include "Cliente.php";
    include "Direccion.php";

    $carrito = new Carrito();

    $ficherojson = fopen("../CARRITOS/carrito".$_GET['usuario'].".json","w+");

    $archivo = "../CARRITOS/carrito".$_GET['usuario'].".json";

    $nuevoProducto = new Producto(
        $_GET['nombre'],
        $_GET['descripcion'],
        $_GET['precio']
    );

    $carrito->anadirProducto($nuevoProducto);
    $carrito->anadirCliente($_GET['usuario']);
    $carrito->setTotal($carrito->calculaTotal());

    $cadena = json_encode($carrito, JSON_PRETTY_PRINT);

    file_put_contents($archivo,$cadena);

?>