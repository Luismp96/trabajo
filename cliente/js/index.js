//CARGA INICIAL PREGUNTAS AL ABRIR VENTANA
window.onload = function(){

    cargaNoticias();

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

            console.log(nombre);
            console.log(contrasena);

            fetch("../../trabajo/API/login.php?usuario="+nombre+"&contrasena="+contrasena)
            .then(function(response){
                    return response.json()
            })
            .then(function(datos){

                console.log(datos);

                if(datos.llave == 'si'){
                    document.getElementById('modal').style.display = "none";
                    document.getElementById('registro').style.display = "none";
                    document.cookie = "usuario=" + nombre + ";";
                }

                cargaNoticias();
                window.location = window.location;
            
            })

           
        }
    }

    document.getElementById('registro').onclick = function(){
        console.log("Vamos a Registro");

        let seccion = document.querySelector('section');
        seccion.innerHTML = "";

        //DIV CONTENEDOR FORM REGISTRO
        let div = document.createElement("div");
        div.classList.add("formularioregistro");
        seccion.appendChild(div);

        //INPUT PARA EL NOMBRE DE USUARIO
        let texto1 = document.createElement("p");
        texto1.innerHTML = "Introduce Nombre Usuario: ";
        texto1.style.color = "white";
        div.appendChild(texto1);
        
        let inputusuario = document.createElement("input");
        inputusuario.setAttribute("type","text");
        div.appendChild(inputusuario);

        //INPUT PARA CONTRASEÑA
        let texto2 = document.createElement("p");
        texto2.innerHTML = "Introduce Contraseña: ";
        texto2.style.color = "white";
        div.appendChild(texto2);
        
        let inputcontrasena = document.createElement("input");
        inputcontrasena.setAttribute("type","password");
        div.appendChild(inputcontrasena);

        //INPUT PARA NOMBRE
        let texto3 = document.createElement("p");
        texto3.innerHTML = "Introduce Nombre: ";
        texto3.style.color = "white";
        div.appendChild(texto3);
        
        let inputnombre = document.createElement("input");
        inputnombre.setAttribute("type","text");
        div.appendChild(inputnombre);

        //INPUT PARA APELLIDOS
        let texto4 = document.createElement("p");
        texto4.innerHTML = "Introduce Apellidos: ";
        texto4.style.color = "white";
        div.appendChild(texto4);
        
        let inputapellidos = document.createElement("input");
        inputapellidos.setAttribute("type","text");
        div.appendChild(inputapellidos);

        //INPUT PARA EMAIL
        let texto5 = document.createElement("p");
        texto5.innerHTML = "Introduce E-Mail: ";
        texto5.style.color = "white";
        div.appendChild(texto5);
        
        let inputemail = document.createElement("input");
        inputemail.setAttribute("type","email");
        div.appendChild(inputemail);

        //INPUT PARA LOCALIDAD
        let texto6 = document.createElement("p");
        texto6.innerHTML = "Introduce Localidad: ";
        texto6.style.color = "white";
        div.appendChild(texto6);
        
        let inputlocalidad = document.createElement("input");
        inputlocalidad.setAttribute("type","text");
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

    if (valorCookie("usuario") != "" && valorCookie("usuario") != undefined){
        console.log("El usuario existe.");

        document.getElementById('registro').style.display = "none";

        //BOTON LOGOFF
        let botonlogoff = document.getElementById("logoff");
        botonlogoff.innerHTML = "LOG OFF";
       
        //Se quita onclik (=null) para que no vaya a inicio de sesion de nuevo.
        botonlogoff.onclick = null;
       
        botonlogoff =  document.getElementById("logoff");

        botonlogoff.onclick = function (){

            console.log("LOG OFF");
            document.cookie = "usuario=;";
            window.location = window.location;
        }


        //BOTON NUEVA NOTICIA
        let boton = document.getElementById("iniciarsesion");
        boton.innerHTML = "Nueva Noticia";
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

                console.log(valorCookie('usuario'));

                fetch("../../trabajo/API/obtenerid.php?usuario="+valorCookie('usuario'))

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

        
        //BOTON AÑADIR JUGADOR
        let boton1 = document.getElementById("anadirJugador");
        boton1.innerHTML = "Nuevo Jugador";
        boton1.classList.add("botonnuevojugador");
        boton1.onclick = null;
        boton1.setAttribute("id","nuevojugador");
        boton1 =  document.getElementById("nuevojugador");

        boton1.onclick = function (){
            let seccion = document.querySelector('section');
            seccion.innerHTML = "";

            let contenedor = document.createElement("div");
            contenedor.classList.add("contenedorinterior1");
            seccion.appendChild(contenedor);

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
            
            fetch("../../trabajo/API/equipousuario.php?usuario="+valorCookie('usuario'))

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
            usuariojugador.appendChild(opciondefecto1);

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
            texto5.innerHTML = "Introduce la FECHA DE NACIMIENTO del jugador: ";
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

                fetch("../../trabajo/API/insertarjugador.php?nombre="+nombrejugador.value+"&idusuario="+usuariojugador.value+"&idequipo="+equipojugador.value+"&edad="
                +edadjugador.value+"&idposicion="+posicionjugador.value+"&dorsal="+dorsaljugador.value+"&fechanacimiento="+fechanacimiento.value)

                .then(function(datos){
                    console.log(datos);
                    cargaNoticias();
                    window.location = window.location;
                    
                })

            }
            
        }

        //BOTON BUSCAR JUGADOR
        let boton2 = document.getElementById("buscarJugador");
        boton2.style.display="block";
        boton2.innerHTML = "Buscar Jugador";
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
                
            })

        }

        //BOTON BUSCAR EQUIPO
        let boton3 = document.getElementById("buscarEquipo");
        boton3.style.display="block";
        boton3.innerHTML = "Buscar Equipo";
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
                
            })

        }


    }else{
        document.getElementById('anadirJugador').style.display = "none";
        document.getElementById('buscador').style.display = "none";
        document.getElementById('anadirJugador').style.display = "none";
        document.getElementById('logoff').style.display = "none";
        console.log("El usuario no existe.");
    }
    
    document.querySelector("h1").onclick = function(){
        cargaNoticias();
    }

    document.getElementById('botonmenu1').onclick = function(){
        cargaNoticias();
    }

    document.getElementById('botonmenu2').onclick = function(){
        cargaEquipos();
    }

    document.getElementById('botonmenu3').onclick = function(){
        cargaCompeticiones();
    }

    document.getElementById('botonmenu4').onclick = function(){
        cargaJornadas();
    }



}
