var carruselHtml = document.getElementById('carrusel');
var rowCarHtml = document.getElementById('rowCar');
const requestURL = 'js/juegos.json';
const request = new XMLHttpRequest();
request.open('GET',requestURL );
 // setean el método, la url de api
request.responseType = 'json'; //definen el tipo de dato que les devuelve
request.send();
request.onload = function () {
var juegos = request.response;
console.log(juegos);

let htmlCarrusel = "";
let htmlRowCar = "";

var juegosOferta = juegos.filter(function (juego) {
    return juego.productoOferta;
  });


for(i = 0; i < juegosOferta.length; i++) {
    htmlCarrusel += 
    `<a href="detalleDelProducto.html"><div class="mySlides ">
         <div class="numbertext "> ${i+1} / ${juegosOferta.length}</div>
         <img src= ${juegosOferta[i].imgSliderPath}  style="width:100%; margin-bottom: -6px ">
     </div></a>`;
     
     htmlRowCar += 
     ` <div class="column ">
                <img class="demo cursor " src= ${juegosOferta[i].imgSliderPath} " style="width:100%; text-align: right; " onclick="currentSlide(${i+1}) " alt=" ${juegosOferta[i].descuento}% DESCUENTO - ARS$ ${juegosOferta[i].precioDescuento} ">
       </div>`;
}

carruselHtml.innerHTML = htmlCarrusel;
rowCarHtml.innerHTML = htmlRowCar;


}

