var idJuego = getParameterByName('idJuego');
const requestURL = 'js/juegos.json';
const request = new XMLHttpRequest();
request.open('GET',requestURL );
// setean el método, la url de api
request.responseType = 'json'; //definen el tipo de dato que les devuelve
request.send();

request.onload = function () {
    var juegos = request.response;
    juegos = juegos.filter(function (juego) {
        return juego.id ==  idJuego;
    });
    let juego = juegos[0];
    console.log(juego);

    agregarImagen(juego);
    agregarInformacion(juego);
    agregarDescripcion(juego);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function agregarImagen(juego) {
    var imagenJuegoDiv = document.getElementById('imagenjuego');
    imagenJuegoDiv.innerHTML = `<img src="${juego.imgPath}" style="width: 30%; max-width: 30; margin-left: 3%; margin-top: -60%; position: FLEX; ">`
}

function agregarInformacion(juego) {
    var tituloJuego = document.getElementById('tituloJuego');
    tituloJuego.innerHTML = `<b> TÍTULO: </b> ${juego.nombre}<br>`;
    var generoJuego = document.getElementById('generoJuego');
    generoJuego.innerHTML = `<b> GÉNERO:</b> ${juego.generos.split(' ').join(', ')}<br>`;
    var desarrolladorJuego = document.getElementById('desarrolladorJuego');
    desarrolladorJuego.innerHTML = `<b> DESARROLLADOR:</b> ${juego.desarrollador} </div>`;
    var editorJuego = document.getElementById('editorJuego');
    editorJuego.innerHTML = `<b> EDITOR:</b> ${juego.editor}`;
    var fechaLanzamientoJuego = document.getElementById('fechaLanzamientoJuego');
    fechaLanzamientoJuego.innerHTML = `<b> FECHA DE LANZAMIENTO:</b> ${juego.fechaDeLanzamiento} <br>`;
}

function agregarDescripcion(juego) {
    var descripcionJuego = document.getElementById('descripcionJuego');
    descripcionJuego.innerHTML = juego.descripción;
}