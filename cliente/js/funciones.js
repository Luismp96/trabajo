
/********************************************************************* 
         FUNCION PARA DEVOLVER EL VALOR ALMACENADO EN COOKIE
//*******************************************************************/
function valorCookieUsuario(){

    let todaslascookies = document.cookie;
    let partido = todaslascookies.split(";");

    console.log(todaslascookies);
    console.log(partido);

    for (let i=0;i<partido.length;i++){
        let partido2 = partido[i].split("=");

        if(partido2[0] == 'usuario' || partido2[0] == ' usuario'){
            return partido2[1];
        }
    }
}

function valorCookieCarrito(){

    let todaslascookies = document.cookie;
    let partido = todaslascookies.split(";");

    console.log(todaslascookies);
    console.log(partido);

    for (let i=0;i<partido.length;i++){
        let partido2 = partido[i].split("=");

        if(partido2[0] == 'carrito' || partido2[0] == ' carrito'){
            return partido2[1];
        }
    }
}

/********************************************************************* 
         FUNCION PARA INFORMAR DE NOTICIA AÑADIDA CORRECTAMENTE
//*******************************************************************/
function cargaNoticiasCorrecto(){
    fetch("../../trabajo/API/noticias.php")
    .then(function(response){
        return response.json()
    })

    .then(function(datos){

        console.log(datos);

        let plantilla = document.getElementById('plantillanoticia');
        let seccion = document.querySelector('section');
        seccion.innerHTML = "";

        let correcto = document.createElement("div");
        let mensaje = document.createElement("p");
        correcto.classList.add("insertcorrecto");
        mensaje.innerHTML = "Se ha insertado correctamente la noticia.";
        correcto.appendChild(mensaje);
        seccion.appendChild(correcto);

        for(let i=0;i<datos.length;i++){
            let importado = document.importNode(plantilla.content,true);

            importado.querySelector('article').setAttribute('name',datos[i].identificador);
            importado.querySelector('h3').textContent = datos[i].titulo;
            importado.querySelector('time').textContent = datos[i].fecha;
            importado.querySelector('p').textContent = datos[i].descripcion;

            importado.querySelector('article').onclick = function(){
                let identificador = this.getAttribute('name');

                console.log("Has hecho click en la pregunta con ID: " + identificador);
                console.log(plantilla.content);
                cargaArticuloSeleccionado(identificador);
            }
            seccion.appendChild(importado);
        }
    })
}

/*---------------------------------------------------------------------------------------------------------------------------*/
/*                    FUNCIONES ASOCIADAS AL MENU DE NAVEGACION (GENERAL PARA TODOS LOS USUARIOS)                            */
/*---------------------------------------------------------------------------------------------------------------------------*/

/********************************************************************* 
                  FUNCION PARA CARGAR NOTICIAS
//*******************************************************************/
function cargaNoticias(){

    document.querySelector("aside").style.display = "none";
    
    fetch("../../trabajo/API/noticias.php")
    .then(function(response){
        return response.json()
    })

    .then(function(datos){

        console.log(datos);

        let plantilla = document.getElementById('plantillanoticia');
        let seccion = document.querySelector('section');
        seccion.innerHTML = "";

        for(let i=0;i<datos.length;i++){
            let importado = document.importNode(plantilla.content,true);
            //SE PASADA IDENTIFICADOR PARA PONER COMO NAME A CADA UNA DE LAS ETIQUETAS HIJAS
            importado.querySelector('article').setAttribute('name',datos[i].identificador);
            importado.querySelector('h3').textContent = datos[i].titulo;
            importado.querySelector('time').textContent = datos[i].fecha;
            importado.querySelector('p').textContent = datos[i].descripcion;
            seccion.appendChild(importado);
        }
    })
}

/********************************************************************* 
                  CARGA DE UN ARTICULO EN CONCRETO
//*******************************************************************/
function cargaArticuloSeleccionado(identificador){

    document.querySelector('section').innerHTML = "";

    fetch("../../trabajo/API/equiposyjugadores.php?id="+identificador)
    .then(function(response){
        return response.json()
    })

    .then(function(datos){

        console.log(datos);

        let plantilla = document.getElementById('plantillapregunta');
        let seccion = document.querySelector('section');
        let pregunta = datos.pregunta[0];
        let importado = document.importNode(plantilla.content,true);
 
        importado.querySelector('article').setAttribute('name',pregunta.identificador);
        importado.querySelector('h3').textContent = pregunta.titulo;
        importado.querySelector('time').textContent = pregunta.fecha;
        importado.querySelector('p').textContent = pregunta.texto;

        seccion.appendChild(importado);

        let cabecerarespuestas = document.getElementById('cabecerarespuestas');
        let importado1 = document.importNode(cabecerarespuestas.content,true);
        importado1.querySelector('p').textContent = "Respuestas Pregunta";
        seccion.appendChild(importado1);

        let plantilla1 = document.getElementById('plantillarespuesta');
        let respuestas = datos.respuestas;

        console.log(respuestas);
        let contador=0;

        for(let i=0;respuestas.length;i++){

            let importado = document.importNode(plantilla1.content,true);

            importado.querySelector('article').setAttribute('name',respuestas[i].identificador);
            importado.querySelector('time').textContent = respuestas[i].fecha;
            importado.querySelector('p').textContent = respuestas[i].texto;
            seccion.appendChild(importado);
            contador++;
        }
        console.log(contador);

        if(contador == 0){
            
            let plantilla2 = document.getElementById('plantillasinresultado');
            let importado2 = document.importNode(plantilla2.content,true);
            importado2.querySelector('p').textContent = "No hay respuestas a esta pregunta";
            seccion.appendChild(importado2);
        }

    })
}


/********************************************************************* 
                   FUNCION PARA CARGAR EQUIPOS
//*******************************************************************/

function cargaEquipos(){

    fetch("../../trabajo/API/allequipos.php")
    .then(function(response){
        return response.json()
    })

    .then(function(datos){

        console.log(datos);

        if (valorCookieUsuario() != "" && valorCookieUsuario() != undefined){
            document.getElementById('registro').style.display = "none";
        }

        let plantilla = document.getElementById('plantillaequipo');
        let seccion = document.querySelector('section');
        seccion.innerHTML = "";

        let titulo = document.createElement("p");
        titulo.innerHTML = "EQUIPOS DE LA LIGA";
        titulo.style.color = "red";
        titulo.style.fontWeight = "bold";
        titulo.style.fontSize = "40px";
        seccion.appendChild(titulo);

        for(let i=0;i<datos.length;i++){
            let importado = document.importNode(plantilla.content,true);
            //SE PASADA IDENTIFICADOR PARA PONER COMO NAME A CADA UNA DE LAS ETIQUETAS HIJAS
            importado.querySelector('article').setAttribute('name',datos[i].identificador);
            importado.querySelector('h3').textContent = datos[i].nombre;
            importado.querySelector('h5').textContent = datos[i].ciudad;
            importado.querySelector('p').textContent = datos[i].puntos;

            let p = document.createElement('p');
            p.innerHTML=datos[i].numerojugadores;
            p.style.color="white";

            importado.getElementById('njugadores').appendChild(p);

            importado.querySelector('article').style.color="orange";
            importado.querySelector('h3').style.color="brown";
            importado.querySelector('h5').style.color="white";
            importado.querySelector('p').style.color="white";

            importado.querySelector('article').onclick = function(){
                let identificador = this.getAttribute('name');

                console.log("Has hecho click en el equipo con ID: " + identificador);
                console.log(plantilla.content);
                cargaEquipoSeleccionado(identificador);
            }
            seccion.appendChild(importado);
        }
    })
}

/********************************************************************* 
       FUNCION PARA DESPLEGAR EQUIPO SELECCIONADO EN SUS JUGADORES
//*******************************************************************/
function cargaEquipoSeleccionado(identificador){

    document.querySelector('section').innerHTML = "";

    fetch("../../trabajo/API/equiposyjugadores.php?id="+identificador)
    .then(function(response){
        return response.json()
    })

    //UTILIZANDO TEMPLATE
    .then(function(datos){

        console.log(datos);
        //PREGUNTAS
        let plantilla = document.getElementById('plantillaequipo');
        let seccion = document.querySelector('section');
        let equipo = datos.equipo[0];
        let importado = document.importNode(plantilla.content,true);

        //SE PASADA IDENTIFICADOR PARA PONER COMO NAME A CADA UNA DE LAS ETIQUETAS HIJAS
        importado.querySelector('article').setAttribute('name',equipo.identificador);
        importado.querySelector('h3').textContent = equipo.nombre;

        importado.getElementById('ciudad').style.color="green";
        importado.querySelector('h5').textContent = equipo.ciudad;
        importado.querySelector('h5').style.color="white";
        
        importado.getElementById('ptotales').style.color="green";
        importado.querySelector('p').textContent = equipo.puntos;
        importado.querySelector('p').style.color="white";

        let p3 = document.createElement('p');
        p3.innerHTML=equipo.numerojugadores;
        p3.style.color="white";

        importado.getElementById('njugadores').appendChild(p3);
        importado.getElementById('njugadores').style.color="green";

        seccion.appendChild(importado);

        let cabecerajugadores = document.getElementById('cabecerajugadores');
        let importado1 = document.importNode(cabecerajugadores.content,true);
        importado1.querySelector('p').textContent = "JUGADORES DEL EQUIPO";
        seccion.appendChild(importado1);

        let plantilla1 = document.getElementById('plantillajugadores');
        let jugadores = datos.jugadores;

        console.log(jugadores);
        let contador=0;

        for(let i=0;jugadores.length;i++){

            let importado1 = document.importNode(plantilla1.content,true);

            importado1.querySelector('article').setAttribute('name',jugadores[i].identificador);
            importado1.querySelector('h3').textContent = jugadores[i].nombre;

            let p2 = document.createElement('p');
            p2.innerHTML=jugadores[i].edad;
            p2.style.color="white";

            importado1.getElementById('edadjugador').appendChild(p2);
            importado1.getElementById('edadjugador').style.color="orange";

            let p4 = document.createElement('p');

            console.log(jugadores[i].id_posicion);

            fetch("../../trabajo/API/posicionjugador.php?id="+jugadores[i].id_posicion)
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
            p1.innerHTML=jugadores[i].dorsal;
            p1.style.color="white";

            importado1.getElementById('dorsaljugador').appendChild(p1);
            importado1.getElementById('dorsaljugador').style.color="orange";

            seccion.appendChild(importado1);
            contador++;
        }
        console.log(contador);

        if(contador == 0){
            
            let plantilla2 = document.getElementById('plantillasinresultado');
            let importado2 = document.importNode(plantilla2.content,true);
            importado2.querySelector('p').textContent = "No hay respuestas a esta pregunta";
            seccion.appendChild(importado2);
        }

    })

}

/********************************************************************* 
                   FUNCION PARA CARGAR COMPETICIONES
//*******************************************************************/
function cargaCompeticiones(){

    fetch("../../trabajo/API/competiciones.php")
    .then(function(response){
        return response.json()
    })

    .then(function(datos){

        console.log(datos);

        if (valorCookieUsuario() != "" && valorCookieUsuario() != undefined){
            document.getElementById('registro').style.display = "none";
        }

        let plantilla = document.getElementById('plantillacompeticiones');
        let seccion = document.querySelector('section');
        seccion.innerHTML = "";

        let titulo = document.createElement("p");
        titulo.innerHTML = "COMPETICIONES";
        titulo.style.color = "red";
        titulo.style.fontWeight = "bold";
        titulo.style.fontSize = "40px";
        seccion.appendChild(titulo);

        for(let i=0;i<datos.length;i++){
            let importado = document.importNode(plantilla.content,true);

            importado.querySelector('article').setAttribute('name',datos[i].identificador);
            importado.querySelector('article').style.color="orange";
            importado.querySelector('h3').style.color="white";
            importado.querySelector('p').style.color="white";
            importado.querySelector('h3').textContent = datos[i].nombre;
            importado.querySelector('p').textContent = datos[i].numeroequipos;

            importado.querySelector('article').onclick = function(){
                let identificador = this.getAttribute('name');

                console.log("Has hecho click en la competicion con ID: " + identificador);
                console.log(plantilla.content);
                cargaCompeticionSeleccionada(identificador);
            }
            seccion.appendChild(importado);
        }
    })
}

/********************************************************************* 
       FUNCION PARA DESPLEGAR LA COMPETICION SELECCIONADA
//*******************************************************************/
function cargaCompeticionSeleccionada(identificador){

    //EN CASO DE LA LIGA SE MUESTRA CLASIFICACION
    if(identificador == 1){
        document.querySelector('section').innerHTML = "";

        seccion = document.querySelector('section');
        let cabecerajugadores = document.getElementById('cabeceraliga');
        let importado1 = document.importNode(cabecerajugadores.content,true);
        importado1.querySelector('p').textContent = "CLASIFICACION";
        seccion.appendChild(importado1);

        fetch("../../trabajo/API/clasificacion.php?id="+identificador)
        .then(function(response){
            return response.json()
        })
        .then(function(datos){

            console.log(datos);
            let contador = 1;

            for(let i=0;i<datos.length;i++){

                let plantilla1 = document.getElementById('cabeceraposicion');
                let seccion1 = document.querySelector('section');
                let importado1 = document.importNode(plantilla1.content,true);
                importado1.querySelector('p').textContent = "Posicion " + contador;
                seccion1.appendChild(importado1);

                let plantilla = document.getElementById('plantillaequipoliga');
                let seccion = document.querySelector('section');
                let equipo = datos[i];
    
                let importado = document.importNode(plantilla.content,true);
                importado.querySelector('h3').textContent = equipo.nombre;
    
                importado.getElementById('puntos').style.color="blue";
                let p5 = document.createElement("p");
                p5.textContent = datos[i].puntos;
                p5.style.color="white";
                importado.getElementById('puntos').appendChild(p5);

                importado.getElementById('ganados').style.color="green";
                let p6 = document.createElement("p");
                p6.textContent = datos[i].partidosganados;
                p6.style.color="white";
                importado.getElementById('ganados').appendChild(p6);

                importado.getElementById('empatados').style.color="yellow";
                let p7 = document.createElement("p");
                p7.textContent = datos[i].partidosempatados;
                p7.style.color="white";
                importado.getElementById('empatados').appendChild(p7);

                importado.getElementById('perdidos').style.color="red";
                let p8 = document.createElement("p");
                p8.textContent = datos[i].partidosperdidos;
                p8.style.color="white";
                importado.getElementById('perdidos').appendChild(p8);
    
                seccion.appendChild(importado);
                contador++;
            }
        })

    //PARA LAS COPAS, SIMPLEMENTE LOS PARTICIPANTES
    }else{

        document.querySelector('section').innerHTML = "";

        seccion = document.querySelector('section');
        let cabecerajugadores = document.getElementById('cabeceracompeticiones');
        let importado1 = document.importNode(cabecerajugadores.content,true);
        importado1.querySelector('p').textContent = "EQUIPOS INSCRITOS";
        seccion.appendChild(importado1);

        fetch("../../trabajo/API/competicionesyequipos.php?id="+identificador)
        .then(function(response){
            return response.json()
        })

        .then(function(datos){

            let participaciones = datos.participaciones;
            console.log(participaciones);

            let contador=0;

            for(let j=0;participaciones.length;j++){

                console.log(participaciones[j].id_equipo);

                fetch("../../trabajo/API/buscarequipo.php?id="+ participaciones[j].id_equipo)
                .then(function(response){
                    return response.json()
                })

    
                .then(function(datos){
                    console.log(datos);

                    let plantilla = document.getElementById('plantillaequipocompeticiones');
                    let seccion = document.querySelector('section');
                    let equipo = datos.equipo[0];
    
                    let importado = document.importNode(plantilla.content,true);
                    importado.querySelector('h3').textContent = equipo.nombre;
    
                    importado.getElementById('ciudad').style.color="green";
                    importado.querySelector('h5').textContent = equipo.ciudad;
                    importado.querySelector('h5').style.color="white";
    
                    importado.getElementById('njugadores').style.color="green";
                    let p= document.createElement("p");
                    p.innerHTML=equipo.numerojugadores;
                    p.style.color="white";
    
                    importado.getElementById('njugadores').appendChild(p);
                    seccion.appendChild(importado);

                })
        
                contador++;
            }

            console.log(contador);

            if(contador == 0){

                let seccion = document.querySelector('section');
                let plantilla2 = document.getElementById('plantillasinresultadocompeticion');
                let importado2 = document.importNode(plantilla2.content,true);
                importado2.querySelector('p').textContent = "No hay equipos inscritos en esta competicion.";
                seccion.appendChild(importado2);
            }

        })

    } 

}


/********************************************************************* 
         FUNCION PARA CARGAR LAS JORNADAS DE LA LIGA
//*******************************************************************/
function cargaJornadas(){

    fetch("../../trabajo/API/jornadas.php")
    .then(function(response){
        return response.json()
    })

    .then(function(datos){

        console.log(datos);

        let plantilla = document.getElementById('plantillajornadas');
        let seccion = document.querySelector('section');
        seccion.innerHTML = "";

        let titulo = document.createElement("p");
        titulo.innerHTML = "JORNADAS DE LA LIGA";
        titulo.style.color = "red";
        titulo.style.fontWeight = "bold";
        titulo.style.fontSize = "40px";
        seccion.appendChild(titulo);

        $jornada = 0;

        for(let i=0;i<datos.length;i++){

            if (datos[i].numerojornada != $jornada){
                let plantilla1 = document.getElementById('cabecerajornada');
                let importado1 = document.importNode(plantilla1.content,true);

                importado1.querySelector('p').innerHTML = "JORNADA " + datos[i].numerojornada;
                seccion.appendChild(importado1);
            }

            let importado = document.importNode(plantilla.content,true);
            
            let p= document.createElement("p");
            p.innerHTML=datos[i].goleslocal;
            p.style.color="white";
    
            importado.getElementById('glocal').appendChild(p);

            let p1= document.createElement("p");
            p1.innerHTML=datos[i].golesvisitante;
            p1.style.color="white";
    
            importado.getElementById('gvisitante').appendChild(p1);

            let p2 = document.createElement("p");
            p2.innerHTML= datos[i].nombre_equipo_local;
            p2.style.color="white";

            importado.getElementById('elocal').appendChild(p2);

            let p3 = document.createElement("p");
            p3.innerHTML= datos[i].nombre_equipo_visitante;
            p3.style.color="white";

            importado.getElementById('evisitante').appendChild(p3);

            seccion.appendChild(importado);

            $jornada = datos[i].numerojornada;

        }
    })
}


/********************************************************************* 
         FUNCION PARA CARGAR LOS PRODUCTOS DE LA TIENDA
//*******************************************************************/
function cargaTienda(){


    fetch("../../trabajo/API/productos.php")
    .then(function(response){
        console.log(response);
        return response.json()
    })
    .then(function(datos){
        console.log(datos);
        
        let seccion = document.querySelector('section');
        seccion.innerHTML = "";

        let titulo = document.createElement("p");
        titulo.innerHTML = "TIENDA OFICIAL";
        titulo.style.color = "red";
        titulo.style.fontWeight = "bold";
        titulo.style.fontSize = "40px";
        seccion.appendChild(titulo);

        let gridtienda = document.createElement("div");
        gridtienda.classList.add("gridtienda");
        let plantilla = document.getElementById('plantillaproducto');

        for(let i=0;i<datos.length;i++){

            let importado = document.importNode(plantilla.content,true);
            let urlfoto = datos[i].imagen;
            let simeuro = "€";

            console.log(datos[i].nombre);
            console.log(datos[i].descripcion);

            importado.querySelector('img').setAttribute("src",urlfoto);
            importado.querySelector('h3').innerHTML = datos[i].nombre;
            importado.querySelector('p').innerHTML = datos[i].descripcion;
            importado.querySelector('h5').innerHTML = datos[i].precio + simeuro;         

            importado.getElementById("botonanadir").onclick = function(){

                console.log(valorCookieCarrito());

                console.log("Pinchamos Añadir..."); 
                console.log("Cookie Carrito: " + valorCookieCarrito());     

                if (valorCookieCarrito() == 0){
                    console.log("Es el primer elemento del carrito.");
                    crearCarrito(datos[i].nombre, datos[i].descripcion,datos[i].precio);
                    
                }else if (valorCookieCarrito() > 0){
                    anadirProductoCarrito(datos[i].nombre, datos[i].descripcion,datos[i].precio);
                }

                let carritonumerico = parseInt(valorCookieCarrito(), 10) + 1;
                console.log("Numerico Carrito = " + carritonumerico);
                document.cookie = " carrito=" + carritonumerico + ";";

            }

            gridtienda.appendChild(importado);
            
        }

        seccion.appendChild(gridtienda)
    })

}

function crearCarrito(nombre,descripcion,precio){

    console.log(valorCookieUsuario());

    fetch("../../trabajo/API/carrito/crearcarrito.php?usuario=" + valorCookieUsuario() + "&nombre=" + nombre + "&descripcion=" + descripcion + "&precio=" + precio)
    .then(function(datos){
        console.log("Carrito Creado Correctamente...");
    })
}

function anadirProductoCarrito(nombre,descripcion,precio){

    console.log("Entramos a Añadir Producto al Carrito...")

    fetch("../../trabajo/API/carrito/anadirproductocarrito.php?usuario=" + valorCookieUsuario() + "&nombre=" + nombre + "&descripcion=" + descripcion + "&precio=" + precio)
    .then(function(response){
        return response.json()
    })
    .then(function(datos){
        console.log("Producto añadido correctamente al carrito...");
        
    })

}

function mostrarCarritoUsuario(usuario){

    let contenedorcarrito = document.getElementById("contenedorcarrito");
    contenedorcarrito.innerHTML = "";
    let nav = document.querySelector('nav');

    console.log("Obtenemos a Mostrar Carrito del Usuario: " + usuario);

    fetch("../../trabajo/API/carrito/obtenercarrito.php?usuario=" + usuario)
    .then(function(response){
        return response.json()
    })
    .then(function(datos){
        console.log("Se obtienen datos del Carrito...");
        console.log(datos);

        let productos = datos.productos;
        
        let plantilla = document.getElementById('plantillaproductocarrito');

        let contadorproductos = 0;

        for(let j=0;j<productos.length;j++){
            let importado = document.importNode(plantilla.content,true);
    
            importado.querySelector('p').textContent = productos[j].nombre;
            importado.getElementById('precioindprocucto').innerHTML = "Precio: " + productos[j].precio + " €";
    
            contadorproductos++;    
            contenedorcarrito.appendChild(importado);
        }

        document.cookie = " carrito=" + contadorproductos + ";";

        //TOTAL
        let divtotal = document.createElement("div");
        divtotal.setAttribute("class", "divtotal");
        divtotal.setAttribute("id", "divtotal");
        divtotal.innerHTML = "Total: " + datos.total + " €";

        contenedorcarrito.appendChild(divtotal);

        //ACCIONES CARRITO (TRAMITAR Y BORRAR PEDIDO)
        let divacciones = document.createElement("div");
        divacciones.setAttribute("class", "divacciones");
        divacciones.setAttribute("id", "divacciones");

        let tablaacciones = document.createElement("table");
        let fila = document.createElement("tr");
        let columna1 = document.createElement("td");
        let columna2 = document.createElement("td");

        let botonborrarpedido = document.createElement("button");
        botonborrarpedido.setAttribute("class", "botonborrarpedido");
        botonborrarpedido.setAttribute("id", "botonborrarpedido");
        botonborrarpedido.innerHTML = "Borrar Pedido";

        let botontramitarpedido = document.createElement("button");
        botontramitarpedido.setAttribute("class", "botontramitarpedido");
        botontramitarpedido.setAttribute("id", "botontramitarpedido");
        botontramitarpedido.innerHTML = "Tramitar Pedido"

        columna1.appendChild(botonborrarpedido)
        columna2.appendChild(botontramitarpedido)

        fila.appendChild(columna1);
        fila.appendChild(columna2);

        tablaacciones.appendChild(fila);
        divacciones.appendChild(tablaacciones);

        contenedorcarrito.appendChild(divacciones);

        nav.appendChild(contenedorcarrito);

        //BOTON BORRAR PEDIDO

        document.getElementById("botonborrarpedido").onclick = function(){
            console.log("Estamos en borrar Carrito...");
            fetch("../../trabajo/API/carrito/borrarcarrito.php?usuario=" + valorCookieUsuario())
            .then(function(datos){
                console.log("Pedido Borrado Correctamente...");
            })
        }

        //BOTON TRAMITAR PEDIDO
        document.getElementById("botontramitarpedido").onclick = function(){

            console.log("Estamos en Tramitar Pedido...");

            if (valorCookieCarrito() == "0"){
                console.log("No hay productos en el carrito");
                alert("No hay productos en el carrito");
            }else{
                let seccion = document.querySelector("section");
                seccion.innerHTML = "";

                let salto = document.createElement("br");

                let contenedor = document.createElement("div");
                contenedor.classList.add("contenedorinterior1");
                seccion.appendChild(contenedor);

                contenedor.appendChild(salto);
                contenedor.appendChild(salto);

                let cabecerapedido = document.createElement("p");
                cabecerapedido.innerHTML = "DATOS PARA LA COMPRA Y ENVIO DEL PEDIDO";
                cabecerapedido.style.color = "red";
                cabecerapedido.style.fontSize = "30px";
                cabecerapedido.style.fontWeight = "bold";

                contenedor.appendChild(cabecerapedido);

                //INPUT PARA LA DIRECCION DE ENVIO
                let texto = document.createElement("p");
                texto.innerHTML = "Introduce la DIRECCIÓN de envío: ";
                texto.setAttribute("class","textoformjugador");
                contenedor.appendChild(texto);
                let direccionenvio = document.createElement("input");
                direccionenvio.setAttribute("type","text");
                contenedor.appendChild(direccionenvio);

                //INPUT PARA LA LOCALIDAD
                let texto1 = document.createElement("p");
                texto1.innerHTML = "Introduce la LOCALIDAD: ";
                texto1.setAttribute("class","textoformjugador");
                contenedor.appendChild(texto1);
                let localidadenvio = document.createElement("input");
                localidadenvio.setAttribute("type","text");
                contenedor.appendChild(localidadenvio);

                //INPUT PARA EL CODIGO POSTAL
                let texto2 = document.createElement("p");
                texto2.innerHTML = "Introduce el CÓDIGO POSTAL: ";
                texto2.setAttribute("class","textoformjugador");
                contenedor.appendChild(texto2);
                let codigopostal = document.createElement("input");
                codigopostal.setAttribute("type","text");
                contenedor.appendChild(codigopostal);

                contenedor.appendChild(salto);

                let divpagotarjeta = document.createElement("div");
                divpagotarjeta.classList.add("divpagotarjeta");

                //INPUT PARA NUMERO DE TARJETA
                let texto3 = document.createElement("p");
                texto3.innerHTML = "Introduce DATOS DE PAGO ";
                texto3.setAttribute("class","textoformjugador");
                divpagotarjeta.appendChild(texto3);

                let textox = document.createElement("p");
                textox.innerHTML = "Numero de la tarjeta";
                textox.style.color = "orange";
                textox.setAttribute("class","textoformjugador");
                divpagotarjeta.appendChild(textox);

                let tabla = document.createElement("table");
                tabla.classList.add("tablatarjeta");

                let fila = document.createElement("tr");
                fila.classList.add("filatarjeta");
                let columna1 = document.createElement("td");
                columna1.classList.add("columna1tarjeta");
                let columna2 = document.createElement("td");
                columna2.classList.add("columna2tarjeta");
                let columna3 = document.createElement("td");
                columna3.classList.add("columna3tarjeta");
                let columna4 = document.createElement("td");
                columna4.classList.add("columna4tarjeta");

                let num1 = document.createElement("input");
                num1.setAttribute("type","text");
                num1.classList.add("inputnum1");
                columna1.appendChild(num1);

                let num2 = document.createElement("input");
                num2.setAttribute("type","text");
                num2.classList.add("inputnum2");
                columna2.appendChild(num2);

                let num3 = document.createElement("input");
                num3.setAttribute("type","text");
                num3.classList.add("inputnum3");
                columna3.appendChild(num3);

                let num4 = document.createElement("input");
                num4.setAttribute("type","text");
                num4.classList.add("inputnum4");
                columna4.appendChild(num4);

                fila.appendChild(columna1);
                fila.appendChild(columna2);
                fila.appendChild(columna3);
                fila.appendChild(columna4);

                tabla.appendChild(fila);
                divpagotarjeta.appendChild(tabla);

                divpagotarjeta.appendChild(salto);

                let textoy = document.createElement("p");
                textoy.innerHTML = "Fecha de Caducidad (MM/AA)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CVV";
                textoy.style.color = "orange";
                textoy.setAttribute("class","textoformjugador");
                divpagotarjeta.appendChild(textoy);

                let tabla1 = document.createElement("table");
                tabla1.classList.add("tablatarjeta1");
                let fila1 = document.createElement("tr");
                fila1.classList.add("filatarjeta1");
                let columna11 = document.createElement("td");
                columna11.classList.add("columna11tarjeta");
                let columna22 = document.createElement("td");
                columna22.classList.add("columna22tarjeta");
                let columna33 = document.createElement("td");
                columna33.classList.add("columna33tarjeta");

                let num11 = document.createElement("input");
                num11.setAttribute("type","text");
                num11.classList.add("num1fecha");
                columna1.appendChild(num11);

                let num22 = document.createElement("input");
                num22.setAttribute("type","text");
                num22.classList.add("num2fecha");
                columna2.appendChild(num22);

                let num33 = document.createElement("input");
                num33.setAttribute("type","text");
                num33.classList.add("numcvv");
                columna2.appendChild(num33);

                columna11.appendChild(num11);
                columna22.appendChild(num22);
                columna33.appendChild(num33);

                fila1.appendChild(columna11);
                fila1.appendChild(columna22);
                fila1.appendChild(columna33);

                tabla1.appendChild(fila1);

                divpagotarjeta.appendChild(tabla1);

                contenedor.appendChild(divpagotarjeta);

                //BOTON COMPRAR

                let boton = document.createElement("button");
                boton.setAttribute("value","enviar");
                boton.classList.add("botonenviarjugador");
                boton.innerHTML = "COMPRAR";
                contenedor.appendChild(boton);

                boton.onclick = function(){

                    //VALIDAMOS INFOMACION EN TODOS LOS CAMPOS
                    let numtarjetaaux;
                    let feccaducidadaux;
                    let validacionescorrectas = true;

                    let error = "";
                    let numeroerrores = 0;

                    //USUARIO
                    if(valorCookieUsuario() != null && valorCookieUsuario() != ""){

                    }else{
                        console.log("Usuario desconocido en el pedido...");
                        error = "Usuario desconocido en el pedido...";
                        validacionescorrectas = false;
                        numeroerrores++;
                    }

                    //DIRECCION
                    if(direccionenvio.value != null && direccionenvio.value != ""){
                        direccionenvio.classList.add("campocorrecto");
                    }else{
                        console.log("Sin direccion de envio en el pedido...");
                        direccionenvio.classList.add("campoincorrecto");
                        error = "Sin direccion de envio en el pedido...";
                        validacionescorrectas = false;
                        numeroerrores++;
                    }

                    //LOCALIDAD
                    if(localidadenvio.value != null && localidadenvio.value != ""){
                        localidadenvio.classList.add("campocorrecto");
                    }else{
                        console.log("Sin localidad de envio en el pedido...");
                        localidadenvio.classList.add("campoincorrecto");
                        error = "Sin localidad de envio en el pedido...";
                        validacionescorrectas = false;
                        numeroerrores++;
                    }
                                
                    //COD POSTAL
                    if(codigopostal.value != null && codigopostal.value != ""){
                        codigopostal.classList.add("campocorrecto");
                    }else{
                        console.log("Sin codigo postal de envio en el pedido...");
                        codigopostal.classList.add("campoincorrecto");
                        error = "Sin codigo postal de envio en el pedido...";
                        validacionescorrectas = false;
                        numeroerrores++;
                    }
                        
                    //TARJETA
                    if ((num1.value != null && num1.value != "") &&
                        (num2.value != null && num2.value != "") &&
                        (num3.value != null && num3.value != "") &&
                        (num4.value != null && num4.value != "")){

                        numtarjetaaux = num1.value + num2.value + num3.value + num4.value;
                        num1.classList.add("campocorrecto");
                        num2.classList.add("campocorrecto");
                        num3.classList.add("campocorrecto");
                        num4.classList.add("campocorrecto");
                        
                    }else{
                        console.log("Sin datos completos de la tarjeta...");
                        num1.classList.add("campoincorrecto");
                        num2.classList.add("campoincorrecto");
                        num3.classList.add("campoincorrecto");
                        num4.classList.add("campoincorrecto");
                        error = "Sin datos completos de la tarjeta...";
                        validacionescorrectas = false;
                        numeroerrores++;
                    }

                    //FECHA CADUCIDAD
                    if ((num11.value != null && num11.value != "") &&
                        (num22.value != null && num22.value != "")){

                        feccaducidadaux = num11.value + "/" + num22.value;
                        num11.classList.add("campocorrecto");
                        num22.classList.add("campocorrecto");

                    }else{
                        console.log("Sin datos completos de la fecha caducidad...");
                        num11.classList.add("campoincorrecto");
                        num22.classList.add("campoincorrecto");
                        error = "Sin datos completos de la fecha caducidad...";
                        validacionescorrectas = false;
                        numeroerrores++;
                    }                   
                        
                    //CVV
                    if(num33.value != null && num33.value != ""){
                        num33.classList.add("campocorrecto");
                        console.log("VALIDACIONES PASADAS CORRECTAMENTE!!!!");
                    }else{
                        console.log("Sin datos completos del CVV...");
                        num33.classList.add("campoincorrecto");
                        error = "Sin datos completos del CVV...";
                        validacionescorrectas = false;
                        numeroerrores++;
                    }             

                    var cadena = ""; 
           
                    fetch("../../trabajo/API/carrito/obtenercarrito.php?usuario=" + valorCookieUsuario())
                    .then(function(response){
                        return response.json()
                    })
                    .then(function(datos){
                        console.log("Se obtienen datos del Carrito...");
                        console.log(datos);
                    
                        let productos = datos.productos;
                    
                        for(let j=0;j<productos.length;j++){

                            console.log(productos[j].nombre);

                            let nombreproducto = productos[j].nombre;

                            if (j == (productos.length -1)){
                                cadena += nombreproducto + ".";
                            }else{
                                cadena += nombreproducto + ", ";
                            }

                        }

                        if (validacionescorrectas){

                            console.log("ANTES DE HACER FECTH:    ****");
                            console.log("USUARIO: " + valorCookieUsuario());
                            console.log("DIRECCION: " + direccionenvio.value);
                            console.log("LOCALIDAD: " + localidadenvio.value);
                            console.log("CODIGO POSTAL: " + codigopostal.value);
                            console.log("NUMERO TARJETA: " + numtarjetaaux);
                            console.log("FECHA CADUCIDAD: " + feccaducidadaux);
                            console.log("CVV: " + num33.value);
                            console.log("numeroerrores: "+numeroerrores);
                            console.log("cadena: " + cadena);
    
                            fetch("../../trabajo/API/nuevopedido.php?usuario="+ valorCookieUsuario() + "&direccion=" +direccionenvio.value + "&localidad=" + localidadenvio.value + "&codpostal=" + codigopostal.value + "&numtarjeta=" + numtarjetaaux + "&fechacaducidad=" + feccaducidadaux + "&cvv=" + num33.value + "&productos=" + cadena)
    
                            .then(function(datos){
                                alert("PEDIDO REALIZADO CORRECTAMENTE. GRACIAS POR SU COMPRA! ");
                                fetch("../../trabajo/API/carrito/borrarcarrito.php?usuario=" + valorCookieUsuario())
                                .then(function(datos){
                                    console.log("Pedido Borrado Correctamente...");
                                })
                                cargaNoticias();
                            })
    
                        }else{
    
                            if (numeroerrores > 1){
                                alert ("Varios campos sin informar...");
                            }else{
                                alert (error);
                            }
                            
                        }

                    })      
                    
                    
                    

                }

            }
            
        }
    })
}

