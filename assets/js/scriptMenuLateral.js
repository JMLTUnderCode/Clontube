document.getElementById("btn-menu-lateral").addEventListener("click", Despliegue_Menu);

var menu_lateral = document.getElementById("Menu_lateral");
var contenido = document.getElementById("contenido_v");
var btn_menu = document.getElementById("btn-menu-lateral");
var titulo_1 = document.getElementById("t_1");
var titulo_2 = document.getElementById("t_2");
var titulo_3 = document.getElementById("t_3");

function Despliegue_Menu(){
    menu_lateral.classList.toggle("movimiento-menu-lateral");
    contenido.classList.toggle("movimiento-contenido");
    titulo_1.classList.toggle("ocultar-titulo");
    titulo_2.classList.toggle("ocultar-titulo");
    titulo_3.classList.toggle("ocultar-titulo");
}