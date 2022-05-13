var jsonUrl = 'https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/523c324c7fcc36efab8224f9ebb7556c09b69a14/Film.JSON';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
}


function getMovies() {
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => formatMovies(data));
}
 
document.addEventListener("DOMContentLoaded", function(event) { 
    
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems); 
    
    getMovies();  
    //código a ejecutar cuando el DOM está listo para recibir acciones
});


movieCardTemplate = ` 
<div class="card">
    <div class="card-image waves-effect waves-block waves-light">
    <img class="activator" src="{img}">
    
    </div>

    <div class="card-content">
    
        <span class="card-title">{title}</span>  
        <div class="card-stacked">
            <div class="card-content">
            <p>Actors {Actors}</p>
            </div> 
        </div>
        <div class="card-stacked">
            <div class="card-content">
            <p>{Plot}</p>
            </div> 
        </div>
    </div> 
</div> `;
function formatMovies(data) {
    for (var m in data) {
        var Title = data[m].Title;
        var Actors = data[m].Actors;
        var Plot = data[m].Plot;
        var Imagenes = data[m].Images;
        var movieCard = movieCardTemplate;
        //"<div class='movieCard'><h3>{Titulo}</h3><p>Director</p><p>{Director}</p><p>Actores</p><p>{Actors}</p> </div>";
        movieCard = movieCard.replace("{title}", Title);
        movieCard = movieCard.replace("{Plot}", Plot);
        movieCard = movieCard.replace("{img}", Imagenes[0]);
        movieCard = movieCard.replace("{Actors}", Actors);
        document.getElementById('movies').innerHTML += movieCard;
        
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, 
        {
            fullWidth : true
        }); 
    }
}

