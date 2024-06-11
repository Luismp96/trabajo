//CARGA INICIAL PREGUNTAS AL ABRIR VENTANA
window.onload = function(){
    //document.cookie = "carrito=0;";

    cargaNoticias();  

/*---------------------------------------------------------------------------------------------------------------------------*/
/*                    JAVASCRIPT ASOCIADO AL MENU DE ACCIONES (PARA TODO USUARIO - GENERAL)                                  */
/*---------------------------------------------------------------------------------------------------------------------------*/

    /*CUANDO PINCHAMOS EN BOTON PARA INCIO DE SESION
      - MOSTRAMOS MODAL QUE TENIAMOS PREVIAMENTE CON DISPLAY - NONE
      - CARGA PLANTILLA INICIO DE SESION
      - FETCH A LOGIN.PHP (NOMBRE Y CONTRASEÑA USUARIO)
            SI RECIBE COMO RESPUESTA 'SI' -> DISPLAY DEL MODAL DE NUEVO A NONE
                                          -> GUARDAMOS EN COOKIE USUARIO EL VALOR QUE TENGA EL NOMBRE DE USUARIO INTRODUCIDO
                                          -> REFRESCAMOS LA PAGINA YA CON COOKIE GUARDADA
            SI RECIBE COMO RESPUESTA 'NO' -> REFRESCAMOS SIMPLEMENTE LA PAGINA
    */
    document.getElementById('iniciarsesion').onclick = function(){

        console.log("Vamos a Iniciar Sesion");

        document.getElementById('modal').style.display = "block";
        document.getElementById('contenedormodal').innerHTML = "";

        let plantilla = document.getElementById('iniciosesion');
        let importado = document.importNode(plantilla.content,true);
        document.getElementById('contenedormodal').appendChild(importado);

        document.getElementById('enviainiciosesion').onclick = function(){

            console.log("Iniciamos Sesion");

            let nombre = document.getElementById('usuario').value;
            let contrasena = document.getElementById('contrasena').value;

            fetch("../../trabajo/API/login.php?usuario="+nombre+"&contrasena="+contrasena)
            .then(function(response){
                    return response.json()
            })
            .then(function(datos){

                console.log(datos);

                if(datos.llave == 'si'){
                    document.getElementById('modal').style.display = "none";
                    document.cookie = " usuario=" + nombre + ";";
                    document.cookie = "carrito=0;";
                }

                cargaNoticias();
                window.location = window.location;
            
            })

           
        }
    }

    /*CUANDO PINCHAMOS EN BOTON PARA REGISTRARSE
      - BORRAMOS CONTENIDO SE LA SECCION
      - CREAMOS DIV QUE VA A CONTENER LOS CAMPOS A INTRODUCIR
      - CUANDO SE COMPLETAN LOS CAMPOS Y DAMOS A BOTON ENVIAR -> FECTH A NUEVOUSUARIO.PHP (DA DE ALTA REGISTRO) Y VUELVE A CARGAR NOTICIAS
    */
    document.getElementById('registro').onclick = function(){
        console.log("Vamos a Registro");

        let seccion = document.querySelector('section');
        seccion.innerHTML = "";

        let cabecera = document.createElement('p');
        cabecera.innerHTML = "REGISTRO NUEVO USUARIO";
        cabecera.style.color = "red";
        cabecera.style.fontWeight="bold";
        cabecera.classList.add('cabeceraformregistro')
        seccion.appendChild(cabecera);

        //DIV CONTENEDOR FORM REGISTRO
        let div = document.createElement("div");
        div.classList.add("formularioregistro");
        seccion.appendChild(div);
        
        let inputusuario = document.createElement("input");
        inputusuario.setAttribute("type","text");
        inputusuario.placeholder = "Nombre de Usuario...";
        div.appendChild(inputusuario);
        
        let inputcontrasena = document.createElement("input");
        inputcontrasena.setAttribute("type","password");
        inputcontrasena.placeholder = "Contraseña...";
        div.appendChild(inputcontrasena);
        
        let inputnombre = document.createElement("input");
        inputnombre.setAttribute("type","text");
        inputnombre.placeholder = "Nombre...";
        div.appendChild(inputnombre);
        
        let inputapellidos = document.createElement("input");
        inputapellidos.setAttribute("type","text");
        inputapellidos.placeholder = "Apellidos...";
        div.appendChild(inputapellidos);
        
        let inputemail = document.createElement("input");
        inputemail.setAttribute("type","email");
        inputemail.placeholder = "E-Mail...";
        div.appendChild(inputemail);
        
        let inputlocalidad = document.createElement("input");
        inputlocalidad.setAttribute("type","text");
        inputlocalidad.placeholder = "Localidad...";
        div.appendChild(inputlocalidad);

        let saltolinea = document.createElement("br");
        div.appendChild(saltolinea);
        let saltolinea1 = document.createElement("br");
        div.appendChild(saltolinea1);

        let boton = document.createElement("button");
        boton.setAttribute("value","enviar");
        boton.innerHTML = "Enviar";
        div.appendChild(boton);

        boton.onclick = function(){
            console.log("Registramos Nuevo Usuario...");

                fetch("../../trabajo/API/nuevousuario.php?usuario="+inputusuario.value + "&contrasena=" +inputcontrasena.value + "&nombre=" + inputnombre.value + "&apellidos=" + inputapellidos.value+ "&email=" + inputemail.value+ "&localidad=" + inputlocalidad.value)

                .then(function(response){
                    return response.json()
                })
                cargaNoticias();
        }

    }

    /*CUANDO PINCHAMOS EN BOTON PARA REALIZAR CONSULTA
      - BORRAMOS CONTENIDO SE LA SECCION
      - CREAMOS DIV QUE VA A CONTENER LOS CAMPOS A INTRODUCIR
      - CUANDO SE COMPLETAN LOS CAMPOS Y DAMOS A BOTON ENVIAR -> FECTH A NUEVACONSULTA.PHP (DA DE ALTA CONSULTA) Y VUELVE A CARGAR NOTICIAS
    */
    document.getElementById('consulta').onclick = function(){

        console.log('Entramos a realizar consulta...');

        let seccion = document.querySelector('section');
        seccion.innerHTML = "";

        let cabecera = document.createElement('p');
        cabecera.innerHTML = "CONSULTA GENERAL";
        cabecera.style.color = "red";
        cabecera.style.fontWeight="bold";
        cabecera.style.padding = "20px";
        seccion.appendChild(cabecera);

        //DIV CONTENEDOR FORM CONSULTA
        let div = document.createElement("div");
        div.classList.add("formularioconsulta");
        seccion.appendChild(div);

        let inputcorreo = document.createElement("input");
        inputcorreo.setAttribute("type","text");
        inputcorreo.placeholder = "E-Mail donde recibir respuesta.";
        div.appendChild(inputcorreo);

        let inputtitulo = document.createElement("input");
        inputtitulo.setAttribute("type","text");
        inputtitulo.placeholder = "Titulo de la Consulta.";
        div.appendChild(inputtitulo);

        let inputresumen = document.createElement("input");
        inputresumen.setAttribute("id","resumen");
        inputresumen.setAttribute("rows","4");
        inputresumen.setAttribute("cols","50");
        inputresumen.setAttribute("type","text-area");
        inputresumen.placeholder = "Descripcion de la Consulta.";
        div.appendChild(inputresumen);

        let saltolinea = document.createElement("br");
        div.appendChild(saltolinea);
        let saltolinea1 = document.createElement("br");
        div.appendChild(saltolinea1);

        let boton = document.createElement("button");
        boton.setAttribute("value","enviar");
        boton.innerHTML = "Enviar";
        div.appendChild(boton);

        boton.onclick = function(){
            console.log("Registramos Nuevo Consulta...");

                fetch("../../trabajo/API/nuevaconsulta.php?correo="+inputcorreo.value + "&titulo=" +inputtitulo.value + "&resumen=" + inputresumen.value)

                .then(function(response){
                    return response.json()
                })

                cargaNoticias();
        }
    }


/*---------------------------------------------------------------------------------------------------------------------------*/
/*                    JAVASCRIPT ASOCIADO AL MENU DE ACCIONES (USUARIOS YA LOGEADOS)                                         */
/*---------------------------------------------------------------------------------------------------------------------------*/

    /* SI EN EL VALOR DE LA COOKIE USUARIO TENEMOS ALGUN VALOR GUARDADO
       - DESHABILITAMOS LOS BOTONES DE REGISTRO DE USUARIO Y DE CONSULTA (BOTON QUE AUN NO FUNCIONA)
    */
    if (valorCookieUsuario() != "" && valorCookieUsuario() != undefined){

        document.getElementById('registro').style.display = "none";
        document.getElementById('consulta').style.display = "none";      

        //************* */
        //BOTON LOGOFF
        //************* */
        let botonlogoff = document.getElementById("logoff");
        botonlogoff.innerHTML = "LOG OFF";
        botonlogoff.onclick = null;
       
        botonlogoff =  document.getElementById("logoff");

        botonlogoff.onclick = function (){

            console.log("LOG OFF");
            document.cookie = "usuario=;";
            window.location = window.location;
        }

        //************* */
        //BOTON NUEVA NOTICIA
        //************* */

        let boton = document.getElementById("iniciarsesion");
        boton.innerHTML = "NUEVA NOTICIA";
        boton.classList.add("botonnuevanoticia");
        //Se quita onclik (=null) para que no vaya a inicio de sesion de nuevo.
        boton.onclick = null;
        boton.setAttribute("id","nuevanoticia");
        boton =  document.getElementById("nuevanoticia");

        boton.onclick = function (){

            let seccion = document.querySelector('section');
            seccion.innerHTML = "";

            let contenedor = document.createElement("div");
            contenedor.classList.add("contenedorinterior");
            //INPUT PARA EL TITULO DE LA PREGUNTA
            let texto = document.createElement("p");
            texto.innerHTML = "Introduce titulo de tu noticia: ";
            texto.setAttribute("class","textoformnoticia");
            contenedor.appendChild(texto);
            let titulo = document.createElement("input");
            titulo.setAttribute("type","text");
            contenedor.appendChild(titulo);

            //INPUT PARA EL CONTENIDO DE LA PREGUNTA
            texto = document.createElement("p");
            texto.innerHTML = "Contenido de la noticia: ";
            texto.setAttribute("class","textoformnoticia");
            contenedor.appendChild(texto);
            let textonoticia = document.createElement("textarea");
            contenedor.appendChild(textonoticia);

            let boton = document.createElement("button");
            boton.setAttribute("value","enviar");
            boton.innerHTML = "Enviar";
            contenedor.appendChild(boton);

            boton.onclick = function(){
                console.log("Creamos Nueva Noticia...");

                console.log(valorCookieUsuario());

                fetch("../../trabajo/API/obtenerid.php?usuario="+valorCookieUsuario())

                .then(function(response){
                    return response.json()
                })
                .then(function(datos){
                    console.log("Entramos a recorrer datos");
                    console.log(datos.length);

                    for(let i=0;i<datos.length;i++){
                        console.log("Obtenemos ID del Usuario: " + datos[i].identificador);

                        if (datos.id != ""){
                            fetch("../../trabajo/API/nuevanoticia.php?titulo="+titulo.value+"&textonoticia="+textonoticia.value+"&idusuario="+datos[i].identificador)
                            .then(function(datos){
        
                                console.log(datos);
                                cargaNoticiasCorrecto();
                            })
                        }else{
                            console.log("No obtenemos ID del usuario");
                        }

                    }
                    
                })

            }

            seccion.appendChild(contenedor);
            
        }
        
        //************* */
        //BOTON AÑADIR JUGADOR
        //************* */
        let boton1 = document.getElementById("anadirJugador");
        boton1.innerHTML = "NUEVO JUGADOR";
        boton1.classList.add("botonnuevojugador");
        boton1.onclick = null;
        boton1.setAttribute("id","nuevojugador");
        boton1 =  document.getElementById("nuevojugador");

        boton1.onclick = function (){

            fetch("../../trabajo/API/equipousuario.php?usuario="+valorCookieUsuario())

            .then(function(response){
                return response.json()
            })
            .then(function(datos){

                console.log("Datos para buscar equipo del usuario..." );
                console.log(datos);

                if(datos.length > 0){
                    let seccion = document.querySelector('section');
                    seccion.innerHTML = "";

                    let contenedor = document.createElement("div");
                    contenedor.classList.add("contenedorinterior1");
                    seccion.appendChild(contenedor);

                    let cabeceranuevojugador = document.createElement("p");
                    cabeceranuevojugador.innerHTML = "FORMULARIO PARA AÑADIR JUGADOR";
                    cabeceranuevojugador.style.color = "red";
                    cabeceranuevojugador.style.fontSize = "30px";
                    cabeceranuevojugador.style.fontWeight = "bold";

                    contenedor.appendChild(cabeceranuevojugador);

                    //INPUT PARA EL NOMBRE DEL JUGADOR
                    let texto = document.createElement("p");
                    texto.innerHTML = "Introduce NOMBRE del jugador: ";
                    texto.setAttribute("class","textoformjugador");
                    contenedor.appendChild(texto);
                    let nombrejugador = document.createElement("input");
                    nombrejugador.setAttribute("type","text");
                    contenedor.appendChild(nombrejugador);

                    //SELECT PARA USUARIO
                    let texto1 = document.createElement("p");
                    texto1.innerHTML = "Introduce el NOMBRE del Usuario: ";
                    texto1.setAttribute("class","textoformjugador");
                    contenedor.appendChild(texto1);
                    let usuariojugador = document.createElement("select");
                    contenedor.appendChild(usuariojugador);

                    let opciondefecto = document.createElement("option");
                    opciondefecto.setAttribute("value","");
                    opciondefecto.innerHTML ="Selecciona un Usuario...";
                    usuariojugador.appendChild(opciondefecto);

                    fetch("../../trabajo/API/allusuarios.php")

                    .then(function(response){
                        return response.json()
                    })
                    .then(function(datos){

                        console.log(datos);

                        for(let i=0;i<datos.length;i++){
                            let opcionequipo = document.createElement("option");
                            opcionequipo.setAttribute("value",datos[i].identificador);
                            opcionequipo.innerHTML = datos[i].usuario;
                            usuariojugador.appendChild(opcionequipo);
                        }
                    
                    })

                    //SELECT PARA EQUIPO
                    let texto2 = document.createElement("p");
                    texto2.innerHTML = "EQUIPO al que pertenece: ";
                    texto2.setAttribute("class","textoformjugador");
                    contenedor.appendChild(texto2);
                    let equipojugador = document.createElement("select");
                    contenedor.appendChild(equipojugador);

                    let equipo = document.createElement("option");
            
                    fetch("../../trabajo/API/equipousuario.php?usuario="+valorCookieUsuario())

                    .then(function(response){
                        return response.json()
                    })
                    .then(function(datos){

                        if (datos[0].nombreequipo != ""){
                            console.log(datos[0].nombreequipo);
                
                            equipo.setAttribute("value",datos[0].idequipo);
                            equipojugador.appendChild(equipo);

                            let texto2 = document.createElement("p");
                            texto2.innerHTML = datos[0].nombreequipo;
                            equipo.appendChild(texto2);
                        }else{
                            equipo.setAttribute("value","");
                            equipojugador.appendChild(equipo);
                        }

                        equipojugador.disabled=true;
                    
                    })

                    //INPUT PARA LA EDAD DEL JUGADOR
                    let texto3 = document.createElement("p");
                    texto3.innerHTML = "Introduce la EDAD del jugador: ";
                    texto3.setAttribute("class","textoformjugador");
                    contenedor.appendChild(texto3);
                    let edadjugador = document.createElement("input");
                    edadjugador.setAttribute("type","text");
                    contenedor.appendChild(edadjugador);

                    //SELECT PARA POSICION
                    let texto6 = document.createElement("p");
                    texto6.innerHTML = "Introduce la POSICION del Jugador: ";
                    texto6.setAttribute("class","textoformjugador");
                    contenedor.appendChild(texto6);
                    let posicionjugador = document.createElement("select");
                    contenedor.appendChild(posicionjugador);

                    let opciondefecto1 = document.createElement("option");
                    opciondefecto1.setAttribute("value","");
                    opciondefecto1.innerHTML ="Selecciona una Posicion...";
                    posicionjugador.appendChild(opciondefecto1);

                    fetch("../../trabajo/API/allposiciones.php")

                    .then(function(response){
                        return response.json()
                    })
                    .then(function(datos){

                        console.log(datos);

                        for(let i=0;i<datos.length;i++){
                            let opcionposicion = document.createElement("option");
                            opcionposicion.setAttribute("value",datos[i].identificador);
                            opcionposicion.innerHTML = datos[i].nombre;
                            posicionjugador.appendChild(opcionposicion);
                        }
                    
                    })

                    //INPUT PARA EL DORSAL DEL JUGADOR
                    let texto4 = document.createElement("p");
                    texto4.innerHTML = "Introduce el DORSAL del jugador: ";
                    texto4.setAttribute("class","textoformjugador");
                    contenedor.appendChild(texto4);
                    let dorsaljugador = document.createElement("input");
                    dorsaljugador.setAttribute("type","text");
                    contenedor.appendChild(dorsaljugador);

                    //INPUT PARA LA FECHA DE NACIMIENTO
                    let texto5 = document.createElement("p");
                    texto5.innerHTML = "Introduce FECHA DE NACIMIENTO: ";
                    texto5.setAttribute("class","textoformjugador");
                    contenedor.appendChild(texto5);
                    let fechanacimiento = document.createElement("input");
                    fechanacimiento.setAttribute("type","date");
                    contenedor.appendChild(fechanacimiento);

                    let boton = document.createElement("button");
                    boton.setAttribute("value","enviar");
                    boton.classList.add("botonenviarjugador");
                    boton.innerHTML = "Enviar";
                    contenedor.appendChild(boton);

                    boton.onclick = function(){
                        console.log("Creamos Nuevo Jugador...");

                        //VALIDAMOS QUE NO EXISTA
                        var existe = false;
                        var nombrein = nombrejugador.value;
                        var nombreinminus = nombrein.toLowerCase();

                        console.log(nombreinminus);

                        fetch("../../trabajo/API/alljugadores.php")

                        .then(function(response){
                            return response.json()
                        })
                        .then(function(datos){

                            console.log(datos);

                            for(let i=0;i<datos.length;i++){

                                var nombrerecogido = datos[i].nombre;
                                var nombrerecogidominus = nombrerecogido.toLowerCase();

                                console.log(nombreinminus);
                                console.log(nombrerecogidominus);

                                if(nombrerecogidominus == nombreinminus){
                                    console.log("Encontramos Jugador con mismo nombre.");
                                    existe = true;
                                }
                            }

                            console.log(existe);

                            if(existe){

                                console.log("Entramos IF");
                                //INPUT PARA EL NOMBRE DEL JUGADOR

                                if (document.getElementById("mensajeerror") != null){
                                    console.log("Error se repite");
                                }else{
                                    let texto = document.createElement("p");
                                    texto.setAttribute("id","mensajeerror");
                                    texto.innerHTML = "Ya existe un jugador con ese nombre.";
                                    texto.style.color="red";
                                    contenedor.appendChild(texto);
                                }

                            }else{
                                console.log("Entramos ELSE");

                                fetch("../../trabajo/API/insertarjugador.php?nombre="+nombrejugador.value+"&idusuario="+usuariojugador.value+"&idequipo="+equipojugador.value+"&edad="
                                +edadjugador.value+"&idposicion="+posicionjugador.value+"&dorsal="+dorsaljugador.value+"&fechanacimiento="+fechanacimiento.value)
    
                                .then(function(datos){
                                    console.log(datos);
                                    cargaNoticias();
                                    //window.location = window.location;
                                    //   
                                })
                            }

                        })                
                    }
                    
                }else{
                    alert("Usuario sin equipo. No puede añadir Jugador.")
                }

            })
            
        }

        //************* */
        //BOTON ELIMINAR JUGADOR
        //************* */

        let botoneliminar = document.getElementById("eliminarJugador");
        botoneliminar.onclick = null;
        botoneliminar.setAttribute("id","eliminarJugador");
        botoneliminar =  document.getElementById("eliminarJugador");

        botoneliminar.onclick = function(){

            fetch("../../trabajo/API/equipousuario.php?usuario="+valorCookieUsuario())

            .then(function(response){
                return response.json()
            })
            .then(function(datos){

                console.log("Datos para buscar equipo del usuario..." );
                console.log(datos);

                if(datos.length > 0){
                    let seccion = document.querySelector('section');
                    seccion.innerHTML = "";
        
                    let contenedor = document.createElement("div");
                    contenedor.classList.add("contenedorinterior");

                    let cabeceraeliminarjugador = document.createElement("p");
                    cabeceraeliminarjugador.innerHTML = "FORMULARIO PARA ELIMINAR JUGADOR";
                    cabeceraeliminarjugador.style.color = "red";
                    cabeceraeliminarjugador.style.fontSize = "30px";
                    cabeceraeliminarjugador.style.fontWeight = "bold";

                    contenedor.appendChild(cabeceraeliminarjugador);
        
                    let texto1 = document.createElement("p");
                    texto1.innerHTML = "Selecciona Jugador a ELIMINAR: ";
                    texto1.setAttribute("class","textoformjugador");
                    contenedor.appendChild(texto1);
        
                    //SELECT PARA JUGADOR
                    let jugador = document.createElement("select");
                    contenedor.appendChild(jugador);
        
                    fetch("../../trabajo/API/equipousuario.php?usuario="+valorCookieUsuario())
        
                    .then(function(response){
                        return response.json()
                    })
                    .then(function(datos){
        
                        let idequipousuario = datos[0].idequipo;
        
                        fetch("../../trabajo/API/alljugadores.php")
                        .then(function(response){
                            return response.json()
                        })
                        .then(function(datos){
                            console.log(datos);
        
        
                            for(let i=0;i<datos.length;i++){
        
                                if(idequipousuario == datos[i].id_equipo){
                                    let opcion = document.createElement("option");
                                    opcion.setAttribute("value",datos[i].identificador);
                                    opcion.innerHTML = datos[i].nombre;
                                    jugador.appendChild(opcion);
                                }
                            }            
                        })
                    })
        
                    contenedor.appendChild(jugador);
        
                    let boton = document.createElement("button");
                    boton.setAttribute("value","enviar");
                    boton.innerHTML = "Enviar";
        
                    contenedor.appendChild(boton);
                    seccion.appendChild(contenedor);
        
                    boton.onclick = function(){
                    console.log("Eliminamos Jugador...");
        
                    console.log(jugador.value);
        
                        fetch("../../trabajo/API/eliminarjugador.php?id="+jugador.value)
        
                        .then(function(datos){
                            console.log("Se elimina correctamente el Jugador.")
                        })
                        cargaNoticias();
                    }

                }else{
                    alert("Usuario sin equipo. No puede eliminar Jugador.");
                    cargarNoticias();
                }


            })    

        }

        //************* */
        //BOTON BUSCAR JUGADOR
        //************* */

        let boton2 = document.getElementById("buscarJugador");
        boton2.style.display="block";
        boton2.innerHTML = "BUSCAR JUGADOR";
        boton2.classList.add("botonbuscarjugador");
        boton2.onclick = null;
        boton2.setAttribute("id","buscarjugador");
        boton2 =  document.getElementById("buscarjugador");

        boton2.onclick = function(){

            var busqueda = document.getElementById('buscador').value;
            var busquedaminus = busqueda.toLowerCase();

            let seccion = document.querySelector('section');
            seccion.innerHTML = "";
            console.log("Buscamos Jugador...");

            fetch("../../trabajo/API/alljugadores.php")
            .then(function(response){
                return response.json()
            })
            .then(function(datos){
                console.log(datos);

                let plantilla = document.getElementById('plantillajugadoresb');
                let seccion = document.querySelector('section');
                seccion.innerHTML = "";
                

                let texto = document.createElement('p');
                texto.innerHTML="RESULTADOS DE LA BUSQUEDA";
                texto.style.color="green";
                texto.style.fontSize = "35px";

                seccion.appendChild(texto);

                let salto = document.createElement('br');
                seccion.appendChild(salto);

                let contador = 0;

                for(let i=0;i<datos.length;i++){

                    
                    let nombre = datos[i].nombre;
                    let nombreminus = nombre.toLowerCase();

                    if(nombreminus.indexOf(busquedaminus) != -1){

                        let importado = document.importNode(plantilla.content,true);

                        importado.querySelector('article').setAttribute('name',datos[i].identificador);
                        importado.querySelector('h3').textContent = datos[i].nombre;
        
                        let p = document.createElement('p');
                    
                        fetch("../../trabajo/API/equipojugador.php?id="+datos[i].id_equipo)
                        .then(function(response){
                            return response.json()
                        })

                        .then(function(datos){
                            console.log(datos);
                            p.innerHTML=datos.equipo;
                            p.style.color="white";
                        })
        
                        importado.getElementById('equipojugador').appendChild(p);
                        importado.getElementById('equipojugador').style.color="orange";

                        let p1 = document.createElement('p');

                        fetch("../../trabajo/API/posicionjugador.php?id="+datos[i].id_posicion)
                        .then(function(response){
                            return response.json()
                        })

                        .then(function(datos){
                            console.log(datos);
                            p1.innerHTML=datos.posicion;
                            p1.style.color="white";
                        })
                            
                        importado.getElementById('posicionjugador').appendChild(p1);
                        importado.getElementById('posicionjugador').style.color="orange";
        
                        let p2 = document.createElement('p');
                        p2.innerHTML=datos[i].dorsal;
                        p2.style.color="white";
        
                        importado.getElementById('dorsaljugador').appendChild(p2);
                        importado.getElementById('dorsaljugador').style.color="orange";

                        seccion.appendChild(importado);

                        contador ++;
                        
                    }

                }

                let resultado = contador;
                console.log(resultado);

                if(resultado == 0){
                    let seccion = document.querySelector('section');
                    seccion.innerHTML = "";

                    let salto = document.createElement("br");
                    seccion.appendChild(salto);
                    seccion.appendChild(salto);

                    let texto = document.createElement('p');
                    texto.innerHTML="NO HAY RESULTADOS PARA EL JUGADOR BUSCADO";
                    texto.style.color="red";
                    texto.style.fontSize = "35px";

                    seccion.appendChild(texto);
                }

                
            })

        }

        //************* */
        //BOTON BUSCAR EQUIPO
        //************* */
        let boton3 = document.getElementById("buscarEquipo");
        boton3.style.display="block";
        boton3.innerHTML = "BUSCAR EQUIPO";
        boton3.classList.add("botonbuscarequipo");
        boton3.onclick = null;
        boton3.setAttribute("id","buscarequipo");

        boton3.onclick = function(){

            var busqueda = document.getElementById('buscador').value;
            var busquedaminus = busqueda.toLowerCase();

            let seccion = document.querySelector('section');
            seccion.innerHTML = "";
            console.log("Buscamos Equipo...");

            fetch("../../trabajo/API/allequipos.php")
            .then(function(response){
                return response.json()
            })
            .then(function(datos){

                console.log(datos);

                let plantilla = document.getElementById('plantillaequipob');
                let seccion = document.querySelector('section');
                seccion.innerHTML = "";

                let texto = document.createElement('p');
                texto.innerHTML="RESULTADOS DE LA BUSQUEDA";
                texto.style.color="green";
                texto.style.fontSize = "35px";

                seccion.appendChild(texto);

                let salto = document.createElement('br');
                seccion.appendChild(salto);

                let contador = 0;
                
                for(let i=0;i<datos.length;i++){

                    let posicion = 0;

                    let nombre = datos[i].nombre;
                    let nombreminus = nombre.toLowerCase();

                    if(nombreminus.indexOf(busquedaminus) != -1){

                        let importado = document.importNode(plantilla.content,true);

                        importado.querySelector('article').setAttribute('name',datos[i].identificador);
                        importado.querySelector('h3').textContent = datos[i].nombre;

                        let p = document.createElement('p');
            
                        fetch("../../trabajo/API/clasificacion.php")
                        .then(function(response){
                            return response.json()
                        })

                        .then(function(datos1){
                            console.log(datos1);

                            for(let j=0;j<datos1.length;j++){

                                posicion++;

                                console.log(datos1[j].nombre);
                                console.log(datos[i].nombre);
                                console.log(posicion);

                                if (datos1[j].nombre == datos[i].nombre){
                                    console.log("Es el equipo que buscamos");
                                    
                                    var puesto = posicion;
                                }

                            }

                            p.innerHTML=puesto;
                            p.style.color="white";
                            
                        })
            
                        importado.getElementById('posicion').appendChild(p);
                        importado.getElementById('posicion').style.color="orange";
    
                        let p1 = document.createElement('p');
                        p1.innerHTML=datos[i].puntos;
                        p1.style.color="white";
                                
                        importado.getElementById('ptotales').appendChild(p1);
                        importado.getElementById('ptotales').style.color="orange";
            
                        let p2 = document.createElement('p');
                        p2.innerHTML=datos[i].numerojugadores;
                        p2.style.color="white";
            
                        importado.getElementById('njugadores').appendChild(p2);
                        importado.getElementById('njugadores').style.color="orange";
    
                        seccion.appendChild(importado);
    
                        contador ++;
                    }
                }

                let resultado = contador;
                console.log(resultado);

                if(resultado == 0){
                    let seccion = document.querySelector('section');
                    seccion.innerHTML = "";

                    let salto = document.createElement("br");
                    seccion.appendChild(salto);
                    seccion.appendChild(salto);

                    let texto = document.createElement('p');
                    texto.innerHTML="NO HAY RESULTADOS PARA EL EQUIPO BUSCADO";
                    texto.style.color="red";
                    texto.style.fontSize = "35px";

                    seccion.appendChild(texto);
                }
                
            })

        }

        //BOTON PLANTILLA

        let botonplantilla = document.getElementById("miequipo");
        botonplantilla.onclick = null;
        botonplantilla.setAttribute("id","miequipo");
        botonplantilla =  document.getElementById("miequipo");

        botonplantilla.onclick = function(){
            
            fetch("../../trabajo/API/equipousuario.php?usuario="+valorCookieUsuario())

            .then(function(response){
                return response.json()
            })
            .then(function(datos){

                console.log("Entramos en plantilla...");

                document.querySelector("aside").style.display = "none";

                let seccion = document.querySelector('section');
                seccion.innerHTML = "";

                console.log("Datos para buscar equipo del usuario..." );
                console.log(datos);

                if(datos.length > 0){

                    let nombreequipo = datos[0].nombreequipo;

                    let cabeceraplantilla = document.createElement("p");
                    cabeceraplantilla.innerHTML = "PLANTILLA EQUIPO - " + nombreequipo;
                    cabeceraplantilla.style.color = "red";
                    cabeceraplantilla.style.fontSize = "30px";
                    cabeceraplantilla.style.fontWeight = "bold";

                    seccion.appendChild(cabeceraplantilla);

                    let idequipousuario = datos[0].idequipo;

                    fetch("../../trabajo/API/alljugadores.php")

                    .then(function(response){
                        return response.json()
                    })
                    .then(function(datos){

                        console.log(datos);

                        for(let i=0;i<datos.length;i++){

                            if (datos[i].id_equipo == idequipousuario){

                                console.log("Encontramos el equipo del usuario");


                                let plantilla = document.getElementById('plantillajugadores');

                                let importado1 = document.importNode(plantilla.content,true);

                                importado1.querySelector('article').setAttribute('name',datos[i].identificador);
                                importado1.querySelector('h3').textContent = datos[i].nombre;

                                let p2 = document.createElement('p');
                                p2.innerHTML=datos[i].edad;
                                p2.style.color="white";

                                importado1.getElementById('edadjugador').appendChild(p2);
                                importado1.getElementById('edadjugador').style.color="orange";

                                let p4 = document.createElement('p');

                                console.log(datos[i].id_posicion);

                                fetch("../../trabajo/API/posicionjugador.php?id="+datos[i].id_posicion)
                                .then(function(response){
                                    return response.json()
                                })

        
                                .then(function(datos){
                                    console.log(datos);
                                    p4.innerHTML=datos.posicion;
                                    p4.style.color="white";
                                })
            
                                importado1.getElementById('posicionjugador').appendChild(p4);
                                importado1.getElementById('posicionjugador').style.color="orange";

                                let p1 = document.createElement('p');
                                p1.innerHTML=datos[i].dorsal;
                                p1.style.color="white";

                                importado1.getElementById('dorsaljugador').appendChild(p1);
                                importado1.getElementById('dorsaljugador').style.color="orange";

                                seccion.appendChild(importado1);
                            }
                        }

                    })

                }else{
                    console.log("Usuario sin equipo...........");
                    cargaNoticias();
                    alert("Usuario sin equipo! Necesita ser dado de alta en alguno.");
                    
                }

            })

            
        }

        var temporizador;

        //********************/
        //BOTON CHAT GENERAL
        //********************/

        let nav = document.querySelector('nav');

        let botonchatgeneral = document.getElementById("chatgeneral");
        botonchatgeneral.style.display="block";
        

        nav.appendChild(botonchatgeneral);

        botonchatgeneral.onclick = function(){

            document.querySelector("aside").style.display = "none";

            let seccion = document.querySelector('section');
            seccion.innerHTML = "";
            console.log("Vamos a Chat General...");

            let titulo = document.createElement("p");
            titulo.innerHTML = "CHAT GENERAL";
            titulo.style.color = "red";
            titulo.style.fontWeight = "bold";
            titulo.style.fontSize = "40px";
            seccion.appendChild(titulo);

            let chatgeneral = document.createElement("div");
            chatgeneral.setAttribute("id","chat");

            let contienemensajes = document.createElement("div");
            contienemensajes.setAttribute("id","contienemensajes");

            chatgeneral.appendChild(contienemensajes);

            let tumensaje = document.createElement("p");
            tumensaje.innerHTML = "Tu mensaje: ";
            tumensaje.style.color = "white";
            tumensaje.style.fontSize = "20px";

            chatgeneral.appendChild(tumensaje);

            let inputmensaje = document.createElement("input");
            inputmensaje.setAttribute("id","mensaje");
            inputmensaje.setAttribute("type","text");
            
            chatgeneral.appendChild(inputmensaje);

            let boton = document.createElement("button");
            boton.classList.add("botonenviarmensaje");
            boton.setAttribute("id","botonenviarmensaje");
            boton.setAttribute("value","enviar");
            boton.innerHTML = "ENVIAR";

            chatgeneral.appendChild(boton);

            seccion.appendChild(chatgeneral);

            temporizador = setTimeout("bucle()",1000);

            document.getElementById("botonenviarmensaje").onclick = function(){
                console.log("El mensaje que voy a mandar es: " + document.getElementById("mensaje").value);

                if (inputmensaje.value != ""){
                    fetch("../../trabajo/API/enviamensaje.php?usuario="+valorCookieUsuario()+"&mensaje=" + inputmensaje.value);
                    inputmensaje.value = "";
                }
                
            }


        }

        //BOTON VER CARRITO

        let botonvercarrito = document.getElementById("carrito");
        botonvercarrito.style.display="block";

        nav.appendChild(botonvercarrito);

        botonvercarrito.onclick = function(){
            mostrarCarritoUsuario(valorCookieUsuario());
        }

    }else{
        document.getElementById('anadirJugador').style.display = "none";
        document.getElementById('buscador').style.display = "none";
        document.getElementById('anadirJugador').style.display = "none";
        document.getElementById('logoff').style.display = "none";
        document.getElementById('buscarJugador').style.display = "none";
        document.getElementById('buscarEquipo').style.display = "none";
        document.getElementById('eliminarJugador').style.display = "none";
        document.getElementById('chatgeneral').style.display = "none";
        document.getElementById('cabeceramiequipo').style.display = "none";
        document.getElementById('cabecerachats').style.display = "none";
        document.getElementById('carrito').style.display = "none";
        document.getElementById('miequipo').style.display = "none";
        document.getElementById('contenedorcarrito').style.display = "none";
        console.log("El usuario no existe.");
    }



/*---------------------------------------------------------------------------------------------------------------------------*/
/*                    JAVASCRIPT AL MENU DE NAVEGACION (GENERAL PARA TODOS LOS USUARIOS)                                     */
/*---------------------------------------------------------------------------------------------------------------------------*/

    //SI PINCHAMOS INICIO O TITULO PAGINA -> CARGAMOS NOTICIAS
    
    document.querySelector("h1").onclick = function(){
        cargaNoticias();
    }

    document.getElementById('botonmenu1').onclick = function(){
        cargaNoticias();
    }

    //SI PINCHAMOS EQUIPOS -> CARGAMOS EQUIPOS

    document.getElementById('botonmenu2').onclick = function(){
        cargaEquipos();
    }

    //SI PINCHAMOS COMPETICIONES -> CARGAMOS COMPETICIONES

    document.getElementById('botonmenu3').onclick = function(){
        cargaCompeticiones();
    }

    //SI PINCHAMOS JORNADAS -> CARGAMOS JORNADAS

    document.getElementById('botonmenu4').onclick = function(){
        cargaJornadas();
    }
    //SI PINCHAMOS EVENTOS -> CARGAMOS EVENTOS

    document.getElementById('botonmenu5').onclick = function(){
        cargaEventos();
    }
    //SI PINCHAMOS TIENDA -> CARGAMOS TIENDA

    document.getElementById('botonmenu6').onclick = function(){
        cargaTienda();
    }

}

//CHAT

var temporizador;

function bucle(){
    
    let fecha = new Date();

    console.log("Entramos bucle")


        fetch("./mensajes.json?fecha=" + fecha.getUTCSeconds())

        .then(function(response){
            return response.json();
        })
        .then(function(datos){    
    
            console.log(datos);
            
            cadena1 = "";
    
            for(let i=0;i<datos.length;i++){

                if(datos[i].usuario === valorCookieUsuario()){
                    console.log("Es el Usuario de la Sesion");
                    cadena1 += `
                    <div class="mensajepropio">
                        <div class="usuario">` + datos[i].usuario+ `</div>
                        <br>
                        <div class="fecha">`+ datos[i].fecha+`</div>
                        <div class="texto">`+ datos[i].mensaje+`</div>
                    </div>`
                }else{
                    console.log("No es el Usuario de la Sesion");
                    cadena1 += `
                    <div class="mensaje">
                        <div class="usuario">` + datos[i].usuario+ `</div>
                        <br>
                        <div class="fecha">`+ datos[i].fecha+`</div>
                        <div class="texto">`+ datos[i].mensaje+`</div>
                    </div>`
                }
                
            }
            

            if (document.getElementById("contienemensajes") !=null){
                document.getElementById("contienemensajes").innerHTML = cadena1;
                document.getElementById("contienemensajes").scrollTop = 10000000;
            }
            
        })

    

    //EL BUCLE SE LLAMA A SI MISMO CADA SEGUNDO
    clearTimeout(temporizador);

    console.log(document.getElementById("contienemensajes"));

    temporizador = setTimeout("bucle()",1000);
    

}
