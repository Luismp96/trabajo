<?php

    function comprobarAcceso(){

        if(!isset($_SESSION['usuario'])){
            die("<aside><div class='incorrecto'>X</div>Intento Incorrecto</aside>");
        }
    }

    function menuNavegacion($conexion){

        $peticion = "SHOW TABLES;";
        $resultado = mysqli_query($conexion,$peticion);
        
        while($fila = mysqli_fetch_assoc($resultado)){
            echo "<li>";

                $mayusculas = strtoupper($fila['Tables_in_trabajo']);

                echo "<a href='?tabla=".$fila['Tables_in_trabajo']."'>".$mayusculas."
                        </a>";
                
            echo "</li>";
        }
    }

    function mostrarCabecera($conexion){

        if(isset($_GET['tabla'])){
            $peticion = "SHOW COLUMNS FROM " . $_GET['tabla'] . ";";
            $resultado = mysqli_query($conexion,$peticion);
            
            while($fila = mysqli_fetch_assoc($resultado)){

                
                switch($fila['Field']){
                    case ("identificador"):
                        echo "<th>IDENTIFICADOR</th>";
                        break;
                    case ("id_usuario"):
                        echo "<th>USUARIO</th>";
                        break;
                    case ("id_respuesta"):
                        echo "<th>IDENTIFICADOR</th>";
                        break;
                    case ("titulo"):
                        echo "<th>TITULO</th>";
                        break;
                    case ("texto"):
                        echo "<th>RESPUESTA</th>";
                        break;
                    case ("fecha"):
                        echo "<th>FECHA</th>";
                        break;
                    case ("valor"):
                        echo "<th>VALOR</th>";
                        break;
                    case ("usuario"):
                        echo "<th>USUARIO</th>";
                        break;
                    case ("contrasena"):
                        echo "<th>CONTRASEÑA</th>";
                        break;
                    case ("nombre"):
                        echo "<th>NOMBRE</th>";
                        break;
                    case ("apellidos"):
                        echo "<th>APELLIDOS</th>";
                        break;
                    case ("email"):
                        echo "<th>E-MAIL</th>";
                        break;
                    case ("id_admin"):
                        echo "<th>ADMIN</th>";
                        break;
                    case ("id_categoriablog"):
                        echo "<th>CAT. BLOG</th>";
                        break;
                    case ("epoch"):
                        echo "<th>FECHA</th>";
                        break;
                    case ("ip"):
                        echo "<th>IP</th>";
                        break;
                    case ("navegador"):
                        echo "<th>NAVEGADOR</th>";
                        break;
                    case ("sesion"):
                        echo "<th>SESION</th>";
                        break;
                    case ("request"):
                        echo "<th>PETICION</th>";
                        break;
                    case ("localidad"):
                        echo "<th>LOCALIDAD</th>";
                        break;
                    case ("numeroequipos"):
                        echo "<th>NUMERO DE EQUIPOS</th>";
                        break;
                    case ("ciudad"):
                        echo "<th>CIUDAD</th>";
                        break;
                    case ("golesafavor"):
                        echo "<th>GOLES A FAVOR</th>";
                        break;
                    case ("golesencontra"):
                        echo "<th>GOLES EN CONTRA</th>";
                        break;
                    case ("partidosganados"):
                        echo "<th>VICTORIAS</th>";
                        break;
                    case ("partidosempatados"):
                        echo "<th>EMPATES</th>";
                        break;
                    case ("partidosperdidos"):
                        echo "<th>DERROTAS</th>";
                        break;
                    case ("puntos"):
                        echo "<th>PUNTOS</th>";
                        break;
                    case ("descripcion"):
                        echo "<th>DESCRIPCION</th>";
                        break;
                    case ("id_competicion"):
                        echo "<th>COMPETICION</th>";
                        break;
                    case ("id_equipo"):
                        echo "<th>EQUIPO</th>";
                        break;
                    case ("numveces"):
                        echo "<th>Nº PARTICIPACIONES</th>";
                        break;
                    case ("id_jugador"):
                        echo "<th>JUGADOR</th>";
                        break;
                    case ("puntuacion"):
                        echo "<th>PUNTUACION (0-10)</th>";
                        break;
                    case ("edad"):
                        echo "<th>EDAD</th>";
                        break;
                    case ("id_posicion"):
                        echo "<th>POSICION</th>";
                        break;
                    case ("dorsal"):
                        echo "<th>DORSAL</th>";
                        break;
                    case ("fechanacimiento"):
                        echo "<th>FECHA NACIMIENTO</th>";
                        break;
                    case ("numerojugadores"):
                        echo "<th>Nº.J</th>";
                        break;
                    case ("id_local"):
                        echo "<th>LOCAL</th>";
                        break;
                    case ("id_visitante"):
                        echo "<th>VISITANTE</th>";
                        break;
                    case ("goleslocal"):
                        echo "<th>GOLES LOCAL</th>";
                        break;
                    case ("golesvisitante"):
                        echo "<th>GOLES VISITANTE</th>";
                        break;
                    case ("nombreganador"):
                        echo "<th>EMPATE/GANADOR</th>";
                        break;
                    case ("numerojornada"):
                        echo "<th>JORNADA</th>";
                        break;
                    default:
                        echo "<th>" .$fila['Field']."</th>";
                        break;
                }
            }

            echo "<th>
                        OPERACIONES
                </th>";
            echo"</tr>";
        }
       
    }

    function mostrarNombreTabla(){
        if(isset($_GET['tabla'])){

            echo "<p style='color:black; text-align:center;padding-bottom:10px'><b>TABLA: </b>".$_GET['tabla']."</p>";
            //P4 INI -> SOLO SE MUESTRA AÑADIR SI SELECCIONAMOS UNA TABLA
            echo "<a href='?operacion=nuevo&tabla=".$_GET['tabla']."' class='boton nuevo'>AÑADIR</a>";
            echo "<a href='?accion=borrartodo&tabla=".$_GET['tabla']."' class='boton' id='all'>BORRAR TODO</a>";
            echo "";
        }else{
            echo "<p style='color:black; text-align:center;padding-bottom:10px'><b>SELECCIONE UNA TABLA DE LA BBDD</b></p>";
            //P4 FIN
        }
    }

    function mostrarDatos($conexion){
        if(isset($_GET['tabla'])){

            $peticion = "SELECT * FROM " . $_GET['tabla'] . ";";
            $resultado = mysqli_query($conexion,$peticion);

            while($fila = mysqli_fetch_assoc($resultado)){
                echo "<tr>";
                $contador = 0;
                $id = 0;
                foreach($fila as $columna=>$campo){
                    if($columna == "identificador"){
                        $id = $campo;
                    }
                    //P4 -> DESPLEGABLE EN LA CONSULTA
                    if(strpos($columna,"_") !== false){
                        if ($columna != "identificador"){

                            //ID USUARIO
                            if(explode("_",$columna)[1] == "usuario"){
                                echo "<td>";
                                $peticion2 = "SELECT ".explode("_",$columna)[1]." AS campo FROM usuarios WHERE identificador = ".$campo.";";
                                $resultado2 = mysqli_query($conexion,$peticion2);
                                while($fila2 = mysqli_fetch_assoc($resultado2)){
                                    echo $fila2['campo'];
                                }
                                echo "</td>";
                            }

                            //ID EQUIPO
                            if(explode("_",$columna)[1] == "equipo"){
                                echo "<td>";
                                $peticion2 = "SELECT nombre AS campo FROM equipos WHERE identificador = ".$campo.";";
                                $resultado2 = mysqli_query($conexion,$peticion2);

                                while($fila2 = mysqli_fetch_assoc($resultado2)){
                                    echo $fila2['campo'];
                                }
                                echo "</td>";
                            }


                            //ID POSICION
                            if(explode("_",$columna)[1] == "posicion"){
                                echo "<td>";
                                $peticion2 = "SELECT nombre AS campo FROM posiciones WHERE identificador = ".$campo.";";
                                $resultado2 = mysqli_query($conexion,$peticion2);

                                while($fila2 = mysqli_fetch_assoc($resultado2)){
                                    echo $fila2['campo'];
                                }
                                echo "</td>";
                            }

                            //ID ADMIN
                            if(explode("_",$columna)[1] == "admin"){
                                echo "<td>";
                                $peticion2 = "SELECT usuario AS campo FROM administradores WHERE identificador = ".$campo.";";
                                $resultado2 = mysqli_query($conexion,$peticion2);

                                while($fila2 = mysqli_fetch_assoc($resultado2)){
                                    echo $fila2['campo'];
                                }
                                echo "</td>";
                            }

                            //ID LOCAL
                            if(explode("_",$columna)[1] == "local"){
                                echo "<td>";
                                $peticion2 = "SELECT nombre AS campo FROM equipos WHERE identificador = ".$campo.";";
                                $resultado2 = mysqli_query($conexion,$peticion2);

                                while($fila2 = mysqli_fetch_assoc($resultado2)){
                                    echo $fila2['campo'];
                                }
                                echo "</td>";
                            }

                            //ID VISITANTE
                            if(explode("_",$columna)[1] == "visitante"){
                                echo "<td>";
                                $peticion2 = "SELECT nombre AS campo FROM equipos WHERE identificador = ".$campo.";";
                                $resultado2 = mysqli_query($conexion,$peticion2);

                                while($fila2 = mysqli_fetch_assoc($resultado2)){
                                    echo $fila2['campo'];
                                }
                                echo "</td>";
                            }
                            //ID COMPETICION
                            if(explode("_",$columna)[1] == "competicion"){
                                echo "<td>";
                                $peticion2 = "SELECT nombre AS campo FROM competiciones WHERE identificador = ".$campo.";";
                                $resultado2 = mysqli_query($conexion,$peticion2);

                                while($fila2 = mysqli_fetch_assoc($resultado2)){
                                    echo $fila2['campo'];
                                }
                                echo "</td>";
                            }

                            //ID JUGADOR
                            if(explode("_",$columna)[1] == "jugador"){
                                echo "<td>";
                                $peticion2 = "SELECT nombre AS campo FROM jugadores WHERE identificador = ".$campo.";";
                                $resultado2 = mysqli_query($conexion,$peticion2);

                                while($fila2 = mysqli_fetch_assoc($resultado2)){
                                    echo $fila2['campo'];
                                }
                                echo "</td>";
                            }
                            
                        }else{
                            echo "<td>" .$campo."</td>";
                        }
                        
                    }else{
                        echo "<td>" .$campo."</td>";
                    }
                    
                    if($contador == 0){
                        $id = $campo;
                    }
                    $contador++;
                }
                echo "<th class='operaciones'>
                        <a href='?accion=eliminar&id=".$id."&tabla=".$_GET['tabla']."' class='boton eliminar'>BORRAR</a>
                        <a href='?operacion=actualizar&id=".$id."&tabla=".$_GET['tabla']."' class='boton actualizar'>MODIFICAR</a>
                    </th>";
                echo"</tr>";
            }

            
        }
    }

    function insertarRegistro($conexion){

        $consulta = "INSERT INTO ".$_GET['tabla']." VALUES (NULL,";
        foreach ($_POST as $columna => $campo){
            if ($columna != "identificador"){

                $consulta .= "'".$campo."',";
                
            }
        }

        $consulta = substr($consulta,0,-1);
        $consulta .= ");";
        mysqli_query($conexion,$consulta);

    }

    
    function eliminarRegistro($conexion){

        $consulta = "DELETE FROM ".$_GET['tabla']." WHERE identificador = ".$_GET['id'].";";
        mysqli_query($conexion,$consulta);

    }

    function actualizarRegistro($conexion){

        $consulta = "UPDATE ".$_GET['tabla']." SET ";
        foreach ($_POST as $columna => $campo){

            if ($columna != "identificador"){

                if((strpos($columna,"_")) !== false){

                    //ID ADMIN
                    if(explode("_",$columna)[1] == "admin"){

                        $peticion1 = "SELECT * FROM administradores WHERE usuario = '".$campo."';";
                        $resultado1= mysqli_query($conexion,$peticion1);
                        $fila1 = mysqli_fetch_assoc($resultado1);

                        $id = $fila1['identificador'];

                        $consulta .= $columna. " = '".$id."',";
                    }

                    //ID CATEGORIA BLOG
                    if(explode("_",$columna)[1] == "categoriablog"){

                        $peticion1 = "SELECT * FROM categoriasblog WHERE nombre = '".$campo."';";
                        $resultado1= mysqli_query($conexion,$peticion1);
                        $fila1 = mysqli_fetch_assoc($resultado1);

                        $id = $fila1['identificador'];
                        $consulta .= $columna. " = '".$id."',";
                    }

                    //ID USUARIOS
                    if(explode("_",$columna)[1] == "usuario"){

                        $peticion1 = "SELECT * FROM usuarios WHERE usuario = '".$campo."';";
                        $resultado1= mysqli_query($conexion,$peticion1);
                        $fila1 = mysqli_fetch_assoc($resultado1);

                        $id = $fila1['identificador'];
                        $consulta .= $columna. " = '".$id."',";
                    }

                    //ID EQUIPO
                    if(explode("_",$columna)[1] == "equipo"){

                        $peticion1 = "SELECT * FROM equipos WHERE nombre = '".$campo."';";
                        $resultado1= mysqli_query($conexion,$peticion1);
                        $fila1 = mysqli_fetch_assoc($resultado1);

                        $id = $fila1['identificador'];
                        $consulta .= $columna. " = '".$id."',";
                    }

                    //ID CATEGORIA 
                    if(explode("_",$columna)[1] == "categoria"){

                        $peticion1 = "SELECT * FROM categorias WHERE nombre = '".$campo."';";
                        $resultado1= mysqli_query($conexion,$peticion1);
                        $fila1 = mysqli_fetch_assoc($resultado1);

                        $id = $fila1['identificador'];
                        $consulta .= $columna. " = '".$id."',";
                    }

                    //ID LOCAL
                    if(explode("_",$columna)[1] == "local"){

                        $peticion1 = "SELECT * FROM equipos WHERE nombre = '".$campo."';";
                        $resultado1= mysqli_query($conexion,$peticion1);
                        $fila1 = mysqli_fetch_assoc($resultado1);

                        $id = $fila1['identificador'];
                        $consulta .= $columna. " = '".$id."',";
                    }

                    //ID VISITANTE
                    if(explode("_",$columna)[1] == "visitante"){

                        $peticion1 = "SELECT * FROM equipos WHERE nombre = '".$campo."';";
                        $resultado1= mysqli_query($conexion,$peticion1);
                        $fila1 = mysqli_fetch_assoc($resultado1);

                        $id = $fila1['identificador'];
                        $consulta .= $columna. " = '".$id."',";
                    }

                    //ID JUGADOR
                    if(explode("_",$columna)[1] == "jugador"){

                        $peticion1 = "SELECT * FROM jugadores WHERE nombre = '".$campo."';";
                        $resultado1= mysqli_query($conexion,$peticion1);
                        $fila1 = mysqli_fetch_assoc($resultado1);

                        $id = $fila1['identificador'];
                        $consulta .= $columna. " = '".$id."',";
                    }


                }else{
                    $consulta .= $columna. " = '".$campo."',";
                }

                
            }
        }

        $consulta = substr($consulta,0,-1);
        $consulta .= " WHERE identificador = ".$_GET['id'].";";
        mysqli_query($conexion,$consulta);

    }

    function formularioActualizar($conexion){

        echo "<h4 class='formulariocab'>Actualizar elemento para la tabla: ".$_GET['tabla']."</h4>";
        echo "<form action='?accion=actualizar&tabla=".$_GET['tabla']."&id=".$_GET['id']."' method='POST' class='formulario'>";

        $consulta = "SELECT * FROM ".$_GET['tabla']." WHERE identificador = ".$_GET['id'].";";
        $resultado = mysqli_query($conexion,$consulta);

        while($fila = mysqli_fetch_assoc($resultado)){

            foreach($fila as $columna=>$campo){

                if((strpos($columna,"_")) !== false){

                    //ID USUARIO
                    if(explode("_",$columna)[1] == "usuario"){

                        echo "Modificar Usuario:";

                        $peticion1 = "SELECT * FROM usuarios WHERE identificador = ".$campo.";";
                        $resultado1= mysqli_query($conexion,$peticion1);
                        $fila1 = mysqli_fetch_assoc($resultado1);

                        echo "<select name='".$columna."' value='".$fila1['usuario']."'>
                        <option>".$fila1['usuario']."</option>
                        ";

                        $peticion2 = "SELECT * FROM usuarios;";
                        $resultado2 = mysqli_query($conexion,$peticion2);

                        while($fila2 = mysqli_fetch_assoc($resultado2)){
                            echo "<option value='".$fila2['usuario']."'>".$fila2['usuario']."</option>";
                        }

                        echo "</select>";
                    }

                    //ID CATEGORIA
                    if(explode("_",$columna)[1] == "categoria"){

                        echo "Modificar Categoria:";

                        $peticion1 = "SELECT * FROM categorias WHERE identificador = ".$campo.";";
                        $resultado1= mysqli_query($conexion,$peticion1);
                        $fila1 = mysqli_fetch_assoc($resultado1);

                        echo "<select name='".$columna."'value='".$fila1['nombre']."'>
                        <option>".$fila1['nombre']."</option>
                        ";

                        $peticion2 = "SELECT * FROM categorias;";
                        $resultado2 = mysqli_query($conexion,$peticion2);

                        while($fila2 = mysqli_fetch_assoc($resultado2)){
                            echo "<option value='".$fila2['nombre']."'>".$fila2['nombre']."</option>";
                        }

                        echo "</select>";
                    }

                    //ID ADMIN
                    if(explode("_",$columna)[1] == "admin"){

                        echo "Modificar Administrador:";

                        $peticion1 = "SELECT * FROM administradores WHERE identificador = ".$campo.";";
                        $resultado1= mysqli_query($conexion,$peticion1);
                        $fila1 = mysqli_fetch_assoc($resultado1);

                        echo "<select name='".$columna."' value='".$fila1['usuario']."'>
                        <option>".$fila1['usuario']."</option>
                        ";

                        $peticion2 = "SELECT * FROM administradores;";
                        $resultado2 = mysqli_query($conexion,$peticion2);

                        while($fila2 = mysqli_fetch_assoc($resultado2)){
                            echo "<option value='".$fila2['usuario']."'>".$fila2['usuario']."</option>";
                        }

                        echo "</select>";
                    }


                    //ID EQUIPO
                    if(explode("_",$columna)[1] == "equipo"){

                        echo "Modificar Equipo :";

                        $peticion1 = "SELECT * FROM equipos WHERE identificador = ".$campo.";";
                        $resultado1= mysqli_query($conexion,$peticion1);
                        $fila1 = mysqli_fetch_assoc($resultado1);

                        echo "<select name='".$columna."' value='".$fila1['nombre']."'>
                        <option>".$fila1['nombre']."</option>
                        ";

                        $peticion2 = "SELECT * FROM equipos;";
                        $resultado2 = mysqli_query($conexion,$peticion2);

                        while($fila2 = mysqli_fetch_assoc($resultado2)){
                            echo "<option value='".$fila2['nombre']."'>".$fila2['nombre']."</option>";
                        }

                        echo "</select>";
                    }

                    //ID LOCAL
                    if(explode("_",$columna)[1] == "local"){

                        echo "Modificar Equipo Local:";

                        $peticion1 = "SELECT * FROM equipos WHERE identificador = ".$campo.";";
                        $resultado1= mysqli_query($conexion,$peticion1);
                        $fila1 = mysqli_fetch_assoc($resultado1);

                        echo "<select name='".$columna."' value='".$fila1['nombre']."'>
                        <option>".$fila1['nombre']."</option>
                        ";

                        $peticion2 = "SELECT * FROM equipos;";
                        $resultado2 = mysqli_query($conexion,$peticion2);

                        while($fila2 = mysqli_fetch_assoc($resultado2)){
                        echo "<option value='".$fila2['nombre']."'>".$fila2['nombre']."</option>";
                        }

                        echo "</select>";
                    }

                    //ID VISITANTE
                    if(explode("_",$columna)[1] == "visitante"){

                        echo "Modificar Equipo Visitante:";

                        $peticion1 = "SELECT * FROM equipos WHERE identificador = ".$campo.";";
                        $resultado1= mysqli_query($conexion,$peticion1);
                        $fila1 = mysqli_fetch_assoc($resultado1);

                        echo "<select name='".$columna."' value='".$fila1['nombre']."'>
                        <option>".$fila1['nombre']."</option>
                        ";

                        $peticion2 = "SELECT * FROM equipos;";
                        $resultado2 = mysqli_query($conexion,$peticion2);

                        while($fila2 = mysqli_fetch_assoc($resultado2)){
                        echo "<option value='".$fila2['nombre']."'>".$fila2['nombre']."</option>";
                        }

                        echo "</select>";
                    }

                    //ID COMPETICION
                    if(explode("_",$columna)[1] == "competicion"){

                        echo "Modificar Competicion:";

                        $peticion1 = "SELECT * FROM competiciones WHERE identificador = ".$campo.";";
                        $resultado1= mysqli_query($conexion,$peticion1);
                        $fila1 = mysqli_fetch_assoc($resultado1);

                        echo "<select name='".$columna."' value='".$fila1['nombre']."'>
                        <option>".$fila1['nombre']."</option>
                        ";

                        $peticion2 = "SELECT * FROM equipos;";
                        $resultado2 = mysqli_query($conexion,$peticion2);

                        while($fila2 = mysqli_fetch_assoc($resultado2)){
                        echo "<option value='".$fila2['nombre']."'>".$fila2['nombre']."</option>";
                        }

                        echo "</select>";
                    }

                    //ID JUGADOR
                    if(explode("_",$columna)[1] == "jugador"){

                        echo "Modificar Jugador:";

                        $peticion1 = "SELECT * FROM jugadores WHERE identificador = ".$campo.";";
                        $resultado1= mysqli_query($conexion,$peticion1);
                        $fila1 = mysqli_fetch_assoc($resultado1);

                        echo "<select name='".$columna."' value='".$fila1['nombre']."'>
                        <option>".$fila1['nombre']."</option>
                        ";

                        $peticion2 = "SELECT * FROM jugadores;";
                        $resultado2 = mysqli_query($conexion,$peticion2);

                        while($fila2 = mysqli_fetch_assoc($resultado2)){
                        echo "<option value='".$fila2['nombre']."'>".$fila2['nombre']."</option>";
                        }

                        echo "</select>";
                    }
                    
                
                }else{
                    switch($columna){
                        case "nombre":
                            echo "Modificar Nombre:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "apellidos":
                            echo "Modificar Apellidos:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "email":
                            echo "Modificar Email:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "localidad":
                            echo "Modificar Localidad:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "contrasena":
                            echo "Modificar Conraseña:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "usuario":
                            echo "Modificar Nombre de Usuario:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "numeroequipos":
                            echo "Modificar Nº de Equipos:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "dorsal":
                            echo "Modificar Dorsal:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "edad":
                            echo "Modificar Edad:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "fechanacimiento":
                            echo "Modificar Fecha Nacimiento:";
                            echo "<input type='date' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "ciudad":
                            echo "Modificar Ciudad:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "titulo":
                            echo "Modificar Titulo:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "numveces":
                            echo "Modificar Nº de Participaciones:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "descripcion":
                            echo "Modificar Descripcion:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "golesafavor":
                            echo "Modificar Goles A Favor:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "golesencontra":
                            echo "Modificar Goles En Contra:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "partidosganados":
                            echo "Modificar Partidos Ganados:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "partidosempatados":
                            echo "Modificar Partidos Empatados:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "partidosperdidos":
                            echo "Modificar Partidos Perdidos:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "puntos":
                            echo "Modificar Puntos:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "numerojugadores":
                            echo "Modificar Numero de Jugadores:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "goleslocal":
                            echo "Modificar Goles Local:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "golesvisitante":
                            echo "Modificar Goles Visitante:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "nombreganador":
                            echo "Modificar Nombre Ganador:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "fecha":
                            echo "Modificar Fecha:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "numerojornada":
                            echo "Modificar Nº Jornada:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "epoch":
                            echo "Modificar Fecha:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "navegador":
                            echo "Modificar Navegador:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "sesion":
                            echo "Modificar Sesion:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "request":
                            echo "Modificar Peticion:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "ip":
                            echo "Modificar IP:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "puntuacion":
                            echo "Modificar Puntuacion:";
                            echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                            break;
                        case "identificador":
                            echo "IDENTIFICADOR NO MODIFICABLE";
                            echo "<input type='text' name='".$columna."' value='".$campo."' disabled></input>";
                            break;
                       default:
                           echo "<input type='text' name='".$columna."' value='".$campo."'></input>";
                    }
                    
                }
            }
        }

        echo "<input type='submit'>";
        echo "</form>";

    }

    function formularioInsertar($conexion){
        echo "<div><h4>INSERTAR ELEMENTO EN LA TABLA: "."<p id='nomtabla'>".strtoupper($_GET['tabla'])."</p>"."</h4></div>";
        echo "<form action='?accion=insertar&tabla=".$_GET['tabla']."' method='POST'>";

        $peticion = "SHOW COLUMNS FROM " . $_GET['tabla'] . ";";
        $resultado = mysqli_query($conexion,$peticion);

        echo "<table id='tablaforminsert'>";
        while($fila = mysqli_fetch_assoc($resultado)){

            echo "<tr>";

            if(strpos($fila['Field'],"_") !== false){
                

                //ID USUARIO
                if(explode("_",$fila['Field'])[1] == "usuario"){
                    echo "<td>";
                    echo "<p><b>USUARIO: </b></p>";
                    echo "</td>";
                    echo "<td>";
                    echo "<select name='".$fila['Field']."' placeholder='Introduce el USUARIO'>
                    <option>Introduce el USUARIO</option>
                    ";

                    $peticion2 = "SELECT * FROM usuarios;";
                    $resultado2 = mysqli_query($conexion,$peticion2);

                    while($fila2 = mysqli_fetch_assoc($resultado2)){
                        echo "<option value='".$fila2['identificador']."'>".$fila2['usuario']."</option>";
                    }

                    echo "</select>";
                    echo "</td>";
                }

                //ID EQUIPO
                if(explode("_",$fila['Field'])[1] == "equipo"){

                    echo "<td>";
                    echo "<p><b>EQUIPO: </b></p>";
                    echo "</td>";
                    echo "<td>";
                    echo "<select name='".$fila['Field']."' placeholder='Introduce el EQUIPO'>
                    <option>Introduce el EQUIPO</option>
                    ";

                    $peticion2 = "SELECT * FROM equipos;";
                    $resultado2 = mysqli_query($conexion,$peticion2);

                    while($fila2 = mysqli_fetch_assoc($resultado2)){
                        echo "<option value='".$fila2['identificador']."'>".$fila2['nombre']."</option>";
                    }

                    echo "</select>";
                    echo "</td>";
                }

                //ID POSICION
                if(explode("_",$fila['Field'])[1] == "posicion"){

                    echo "<td>";
                    echo "<p><b>POSICION: </b></p>";
                    echo "</td>";
                    echo "<td>";
                    echo "<select name='".$fila['Field']."' placeholder='Introduce la POSICION'>
                    <option>Introduce la POSICION</option>
                    ";

                    $peticion2 = "SELECT * FROM posiciones;";
                    $resultado2 = mysqli_query($conexion,$peticion2);

                    while($fila2 = mysqli_fetch_assoc($resultado2)){
                        echo "<option value='".$fila2['identificador']."'>".$fila2['nombre']."</option>";
                    }

                    echo "</select>";
                    echo "</td>";
                }

                //ID LOCAL
                if(explode("_",$fila['Field'])[1] == "local"){
                    echo "<td>";
                    echo "<p><b>EQUIPO LOCAL: </b></p>";
                    echo "</td>";
                    echo "<td>";
                    echo "<select name='".$fila['Field']."'>
                    <option>Selecciona un EQUIPO COMO LOCAL</option>
                    ";

                    $peticion2 = "SELECT * FROM equipos;";
                    $resultado2 = mysqli_query($conexion,$peticion2);

                    while($fila2 = mysqli_fetch_assoc($resultado2)){
                        echo "<option value='".$fila2['identificador']."'>".$fila2['nombre']."</option>";
                    }

                    echo "</select>";
                }

                //ID VISITANTE
                if(explode("_",$fila['Field'])[1] == "visitante"){
                    echo "<td>";
                    echo "<p><b>EQUIPO VISTANTE: </b></p>";
                    echo "</td>";
                    echo "<td>";
                    echo "<select name='".$fila['Field']."'>
                    <option>Selecciona un EQUIPO COMO VISITANTE</option>
                    ";

                    $peticion2 = "SELECT * FROM equipos;";
                    $resultado2 = mysqli_query($conexion,$peticion2);

                    while($fila2 = mysqli_fetch_assoc($resultado2)){
                        echo "<option value='".$fila2['identificador']."'>".$fila2['nombre']."</option>";
                    }

                    echo "</select>";
                }

                //ID COMPETICION
                if(explode("_",$fila['Field'])[1] == "competicion"){
                    echo "<td>";
                    echo "<p><b>COMPETICION: </b></p>";
                    echo "</td>";
                    echo "<td>";
                    echo "<select name='".$fila['Field']."'>
                    <option>Selecciona una COMPETICION</option>
                    ";

                    $peticion2 = "SELECT * FROM competiciones;";
                    $resultado2 = mysqli_query($conexion,$peticion2);

                    while($fila2 = mysqli_fetch_assoc($resultado2)){
                        echo "<option value='".$fila2['identificador']."'>".$fila2['nombre']."</option>";
                    }

                    echo "</select>";
                }

                //ID JUGADOR
                if(explode("_",$fila['Field'])[1] == "jugador"){
                    echo "<td>";
                    echo "<p><b>JUGADOR: </b></p>";
                    echo "</td>";
                    echo "<td>";
                    echo "<select name='".$fila['Field']."'>
                    <option>Selecciona una JUGADOR</option>
                    ";

                    $peticion2 = "SELECT * FROM jugadores;";
                    $resultado2 = mysqli_query($conexion,$peticion2);

                    while($fila2 = mysqli_fetch_assoc($resultado2)){
                        echo "<option value='".$fila2['identificador']."'>".$fila2['nombre']."</option>";
                    }

                    echo "</select>";
                }

            }else{

                switch($fila['Field']){
                    case ("edad"):
                        echo "<td>";
                        echo "<p><b>EDAD: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce la EDAD'></input>";
                        echo "</td>";
                        break;
                        case ("usuario"):
                            echo "<td>";
                            echo "<p><b>USUARIO: </b></p>";
                            echo "</td>";
                            echo "<td>";
                            echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce el NOMBRE DE USUARIO'></input>";
                            echo "</td>";
                            break;
                    case ("contrasena"):
                            echo "<td>";
                            echo "<p><b>CONTRASEÑA: </b></p>";
                            echo "</td>";
                            echo "<td>";
                            echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce la CONTRASEÑA'></input>";
                            echo "</td>";
                            break;
                    case ("numeroequipos"):
                            echo "<td>";
                            echo "<p><b>NUMERO DE EQUIPOS: </b></p>";
                            echo "</td>";
                            echo "<td>";
                            echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce el Nº DE EQUIPOS'></input>";
                            echo "</td>";
                            break;
                    case ("nombre"):
                        echo "<td>";
                        echo "<p><b>NOMBRE: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce el NOMBRE'></input>";
                        echo "</td>";
                        break;
                    case ("numerojornada"):
                        echo "<td>";
                        echo "<p><b>NUMERO DE JORNADA: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce el Nº DE LA JORNADA'></input>";
                        echo "</td>";
                        break;
                    case ("apellidos"):
                        echo "<td>";
                        echo "<p><b>APELLIDOS: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce los APELLIDOS'></input>";
                        echo "</td>";
                        break;
                    case ("email"):
                        echo "<td>";
                        echo "<p><b>EMAIL: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce el EMAIL'></input>";
                        echo "</td>";
                        break;
                    case ("localidad"):
                        echo "<td>";
                        echo "<p><b>LOCALIDAD: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce la LOCALIDAD'></input>";
                        echo "</td>";
                        break;
                    case ("dorsal"):
                        echo "<td>";
                        echo "<p><b>DORSAL: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce el DORSAL'></input>";
                        echo "</td>";
                        break;
                    case ("fechanacimiento"):
                        echo "<td>";
                        echo "<p><b>FECHA DE NACIMIENTO: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='date' name='".$fila['Field']."' placeholder='Introduce FECHA DE NACIMIENTO'></input>";
                        echo "</td>";
                        break;
                    case ("ciudad"):
                        echo "<td>";
                        echo "<p><b>CIUDAD: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce CIUDAD'></input>";
                        echo "</td>";
                        break;
                    case ("golesafavor"):
                        echo "<td>";
                        echo "<p><b>GOLES A FAVOR: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce GOLES A FAVOR'></input>";
                        echo "</td>";
                        break;
                    case ("golesencontra"):
                        echo "<td>";
                        echo "<p><b>GOLES EN CONTRA: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce GOLES EN CONTRA'></input>";
                        echo "</td>";
                        break;
                    case ("partidosganados"):
                        echo "<td>";
                        echo "<p><b>VICTORIAS: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce PARTIDOS GANADOS'></input>";
                        echo "</td>";
                        break;
                    case ("partidosempatados"):
                        echo "<td>";
                        echo "<p><b>EMPATES: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce PARTIDOS EMPATADOS'></input>";
                        echo "</td>";
                        break;
                    case ("partidosperdidos"):
                        echo "<td>";
                        echo "<p><b>DERROTAS: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce PARTIDOS PERDIDOS'></input>";
                        echo "</td>";
                        break;
                    case ("puntos"):
                        echo "<td>";
                        echo "<p><b>PUNTOS: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce PUNTOS'></input>";
                        echo "</td>";
                        break;
                    case ("numerojugadores"):
                        echo "<td>";
                        echo "<p><b>Nº JUGADORES: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce Nº JUGADORES'></input>";
                        echo "</td>";
                        break;
                    case ("goleslocal"):
                        echo "<td>";
                        echo "<p><b>GOLES LOCAL: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce GOLES LOCAL'></input>";
                        echo "</td>";
                        break;
                    case ("golesvisitante"):
                        echo "<td>";
                        echo "<p><b>GOLES VISITANTE: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce GOLES VISITANTE'></input>";
                        echo "</td>";
                        break;
                    case ("nombreganador"):
                        echo "<td>";
                        echo "<p><b>NOMBRE GANADOR: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce NOMBRE GANADOR'></input>";
                        echo "</td>";
                        break;
                    case ("fecha"):
                        echo "<td>";
                        echo "<p><b>FECHA: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='date' name='".$fila['Field']."' placeholder='Introduce FECHA'></input>";
                        echo "</td>";
                        break;
                    case ("descripcion"):
                        echo "<td>";
                        echo "<p><b>DESCRIPCION: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce DESCRIPCION'></input>";
                        echo "</td>";
                        break;
                    case ("numveces"):
                        echo "<td>";
                        echo "<p><b>NUMERO DE VECES: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce Nº DE PARTICIPACIONES'></input>";
                        echo "</td>";
                        break;
                    case ("puntuacion"):
                        echo "<td>";
                        echo "<p><b>PUNTUACION 1-10: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce PUNTUACION'></input>";
                        echo "</td>";
                        break;
                    case ("titulo"):
                        echo "<td>";
                        echo "<p><b>TITULO: </b></p>";
                        echo "</td>";
                        echo "<td>";
                        echo "<input type='text' name='".$fila['Field']."' placeholder='Introduce TITULO'></input>";
                        echo "</td>";
                        break;
                    default:
                        if ($fila['Field'] != "identificador"){
                            echo "<td>";
                            echo "</td>";
                            echo "<td>";
                            echo "<input type='text' name='".$fila['Field']."' placeholder='".strtoupper($fila['Field'])."'></input>";
                            echo "</td>";
                        }else{
                            echo "<td>";
                            echo "</td>";
                            echo "<td>";
                            echo "<input type='text' name='".$fila['Field']."' placeholder='".strtoupper($fila['Field'])." (NO RELLENABLE)' disabled></input>";
                            echo "</td>";
                        }
                        
                }
               
            }

            echo "</tr>";

        }    
        echo "</table>";
        echo "<input id='botoninsert' type='submit'>";
        echo "</form>";
    }

    function borrartodo($conexion){

        $peticion = "DELETE FROM " . $_GET['tabla'] . ";";
        $resultado = mysqli_query($conexion,$peticion);

    }

?>