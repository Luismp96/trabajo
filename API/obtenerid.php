

<?php

include "../config.php";

$peticion = "
SELECT *
FROM usuarios
WHERE usuario = '".$_GET['usuario']."'
;
";

$resultado = mysqli_query($conexion,$peticion);
$datos = [];

if ($fila = mysqli_fetch_assoc($resultado)){
    $datos[] = $fila;
}


$json = json_encode($datos);
echo $json;

?>