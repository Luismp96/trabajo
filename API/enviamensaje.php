<?php

    $usuario = $_GET["usuario"];
    $mensaje = $_GET["mensaje"];
    $epoch = date('U');
    $fecha = date('Y')
    ."-".date('m')
    ."-".date('d')
    ." ".date("H")
    .":".date('i')
    .":".date("s");

    $archivo = "../cliente/mensajes.json";
    $json = file_get_contents($archivo);
    $datosjson = json_decode($json);

    $nuevomensaje = array(
        "usuario" => $usuario,
        "mensaje" => $mensaje,
        "epoch" => $epoch,
        "fecha" => $fecha
    );

    array_push($datosjson,$nuevomensaje);
    //var_dump($datosjson);
    $nuevojson = json_encode($datosjson, JSON_PRETTY_PRINT);
    file_put_contents($archivo,$nuevojson);
?>