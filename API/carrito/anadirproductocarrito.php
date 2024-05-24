<?php

    include "Carrito.php";
    include "Producto.php";
    include "Cliente.php";
    include "Direccion.php";

    $nuevoProducto = new Producto(
        $_GET['nombre'],
        $_GET['descripcion'],
        $_GET['precio']
    );

    $carrito = new Carrito();
    $archivo = "../CARRITOS/carrito".$_GET['usuario'].".json";

    $carritousuario = file_get_contents("../CARRITOS/carrito".$_GET['usuario'].".json");

    $json = json_decode($carritousuario);

    foreach($json->productos as $producto){

        $producto = new Producto($producto->nombre,$producto->descripcion,$producto->precio);
        $carrito->anadirProducto($producto);
    }

    $carrito->anadirCliente($json->cliente);
    $carrito->setTotal($json->total);

    $carrito->anadirProducto($nuevoProducto);
    $carrito->setTotal($carrito->getTotal() + $_GET['precio']);

    $cadena = json_encode($carrito, JSON_PRETTY_PRINT);

    file_put_contents($archivo,$cadena);



?>