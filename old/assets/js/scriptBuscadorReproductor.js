$(document).ready(function (){

    function buscarVideo(palabra_clave){
        var busqueda_general = {
            key : "GOOGLE_API_KEY",
            maxResults : 12,
            part : "snippet",
            q : palabra_clave
        }
    
        $.getJSON("https://www.googleapis.com/youtube/v3/search", busqueda_general, function (res_general) {
            
            $('#video_contenedor .Cobertura').remove();

            $(res_general.items).each(function () {
                console.log(this);
                var miniatura_video = this.snippet.thumbnails.high.url;
                var titulo_video = this.snippet.title;
                var nombre_canal = this.snippet.channelTitle;
                var descripcion_video = this.snippet.description;
    
                var publicacion = this.snippet.publishedAt;
                var fecha = new Date(publicacion);
                var fecha_corta = new Date(fecha);
                var dia = fecha_corta.getDate();
                var mes = fecha_corta.getMonth();
                var anio = fecha_corta.getFullYear();
    
                publicacion = dia+" - "+mes+" - "+anio;
                
                var id_video = this.id.videoId;

                var video = $('<div class=Cobertura><div class=Contenido-videos><a class=Caja-video href=#><iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"allowfullscreen frameborder=0 referrerpolicy=strict-origin-when-cross-origin src="https://www.youtube.com/embed/' + id_video + '"></iframe></a><div class=Detalle-video><div class=logo-canal></div><div class=Detalles><h3 class=titulo-video>' + titulo_video + '</h3><div class=nombre-canal>Canal: ' + nombre_canal + '</div><div class=visualizacion-subida><div class=subida>Fecha de estreno: ' + publicacion + '</div><div class=vistas></div></div></div></div><div class=Contenido-oculto><div class=botones-video><i class=ri-time-line></i>Ver mas tarde</div><div class=botones-video><i class=ri-play-list-2-line></i>Agregar a la lista de reproducción</div></div></div></div>');
                
                $('#video_contenedor').append(video);
            });
        });
    }

    buscarVideo("Los mejores lenguajes de programacion");

    $("#Buscador").on("submit", function (Buscar) {
        Buscar.preventDefault();
        var query = $("#contenido_buscar").val();
        if (query == ""){
            alert("¡Debes escribir algo!");
        } else {
            buscarVideo(query, 0);
            $("#contenido_buscar").val("");
        }
    });
});