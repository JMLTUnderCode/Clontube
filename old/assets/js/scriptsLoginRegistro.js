// Activacion de funciones registro e iniciar seccion para cambiar paneles.
document.getElementById("btn-registrarse").addEventListener("click", Registro);
document.getElementById("btn-iniciar-seccion").addEventListener("click", Iniciar_Sesion);

// Mantener las secciones acorde al Responsive.
window.addEventListener("resize", Ancho_Pagina);

// Declaracion de variables globales
var contenedor_login_registro = document.querySelector(".contenedor-login-registro");
var formulario_login = document.querySelector(".formulario-login");
var formulario_registro = document.querySelector(".formulario-registro");
var caja_fondo_login = document.querySelector(".caja-fondo-login");
var caja_fondo_registro = document.querySelector(".caja-fondo-registro");

// Funcion que permite mantener los paneles de inicio y registro segun el resize de la pagina.
function Ancho_Pagina(){
    if(window.innerWidth > 850){
        caja_fondo_login.style.display = "block";
        caja_fondo_registro.style.display = "block";
    
    } else {
        contenedor_login_registro.style.left = "0px";
        
        formulario_login.style.display = "block";
        formulario_registro.style.display = "none";
        
        caja_fondo_login.style.display = "none";

        caja_fondo_registro.style.display = "block";
        caja_fondo_registro.style.opacity = "1";
    }
}

Ancho_Pagina(); // Evitar problema de solapamiento en recargar pagina.

// Funcion de Iniciar Seccion, intercambia los panales de registro por login.
function Iniciar_Sesion(){
    if(window.innerWidth > 850){
        formulario_login.style.display = "block";
        formulario_registro.style.display = "none";
        
        contenedor_login_registro.style.left = "10px";

        caja_fondo_login.style.opacity = "0";
        caja_fondo_registro.style.opacity = "1";

    } else {
        formulario_login.style.display = "block";
        formulario_registro.style.display = "none";
        
        contenedor_login_registro.style.left = "0px";

        caja_fondo_login.style.display = "none";
        caja_fondo_registro.style.display = "block";
    }
}

// Funcion de registro, intercambia los panales de login por registro.
function Registro(){
    if(window.innerWidth > 850){
        formulario_login.style.display = "none";
        formulario_registro.style.display = "block";

        contenedor_login_registro.style.left = "410px";

        caja_fondo_login.style.opacity = "1";
        caja_fondo_registro.style.opacity = "0";

    } else {
        formulario_login.style.display = "none";
        formulario_registro.style.display = "block";

        contenedor_login_registro.style.left = "0px";

        caja_fondo_login.style.display = "block";
        caja_fondo_registro.style.display = "none";
        caja_fondo_login.style.opacity = "1";
    }
}

