
/********************************************************************* 
         FUNCION PARA DEVOLVER EL VALOR ALMACENADO EN COOKIE
//*******************************************************************/
function valorCookie(identificador){
    let todaslascookies = document.cookie;
    let partido = todaslascookies.split(";");

    for (let i=0;i<partido.length;i++){
        let partido2 = partido[i].split("=");

        if(partido2[0] == identificador){
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

        if (valorCookie("usuario") != "" && valorCookie("usuario") != undefined){
            document.getElementById('registro').style.display = "none";
        }

        let plantilla = document.getElementById('plantillaequipo');
        let seccion = document.querySelector('section');
        seccion.innerHTML = "";

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

        if (valorCookie("usuario") != "" && valorCookie("usuario") != undefined){
            document.getElementById('registro').style.display = "none";
        }

        let plantilla = document.getElementById('plantillacompeticiones');
        let seccion = document.querySelector('section');
        seccion.innerHTML = "";

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