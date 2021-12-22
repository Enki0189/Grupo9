var carruselHtml = document.getElementById('carrusel');
var rowCarHtml = document.getElementById('rowCar');
var juegosRecomendadosHtml = document.getElementById('juegos-recomendados');
const requestURL = 'js/juegos.json';
const request = new XMLHttpRequest();
request.open('GET',requestURL );
 // setean el método, la url de api
request.responseType = 'json'; //definen el tipo de dato que les devuelve
request.send();
var slideIndex = 1;

request.onload = function () {
    var juegos = request.response;
    console.log(juegos);

    let resultadoCarrusel = cargarJuegosOferta(juegos);
    carruselHtml.innerHTML = resultadoCarrusel.htmlCarrusel;
    rowCarHtml.innerHTML = resultadoCarrusel.htmlRowCar;
    juegosRecomendadosHtml.innerHTML = cargarJuegosRecomendados(juegos);
    showSlides(slideIndex);
}

function cargarJuegosOferta(juegos) {
    let htmlCarrusel = "";
    let htmlRowCar = "";
    var juegosOferta = juegos.filter(function (juego) {
        return juego.productoOferta;
    });

    for (i = 0; i < juegosOferta.length; i++) {
        htmlCarrusel +=
            `<a href="detalleDelProducto.html?idJuego=${juegosOferta[i].id}"><div class="mySlides ">
         <div class="numbertext "> ${i + 1} / ${juegosOferta.length}</div>
         <img src= ${juegosOferta[i].imgSliderPath}  style="width:100%; margin-bottom: -6px ">
     </div></a>`;

        htmlRowCar +=
            ` <div class="column ">
                <img class="demo cursor " src= ${juegosOferta[i].imgSliderPath} " style="width:100%; text-align: right; " onclick="currentSlide(${i + 1}) " alt=" ${juegosOferta[i].descuento}% DESCUENTO - ARS$ ${juegosOferta[i].precioDescuento} ">
       </div>`;
    }
    return {htmlCarrusel, htmlRowCar};
}

function cargarJuegosRecomendados(juegos) {
    let htmlJuegosRecomendados = "";

    var juegosRecomendados = juegos.filter(function (juego) {
        return juego.productoRecomendado;
    });

    for (i = 0; i < juegosRecomendados.length; i++) {
        htmlJuegosRecomendados +=
            `<div class="col ">
                <div class="card h-100 ">
                <a href="detalleDelProducto.html?idJuego=${juegosRecomendados[i].id}" class="btn">
                    <img src= ${juegosRecomendados[i].imgPath} class="card-img-top " alt="... " style="width: 100%; ">
                    </a>
                    <div class="card-body ">
                        <h5 style="color: rgb(255, 255, 255); font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; ">
                            ${juegosRecomendados[i].nombre}</h5>
                        <p class="card-text ">
                        <div style="background-color: rgb(22, 22, 22);opacity: 1;list-style: none; padding: 5px; ">`;
        if(juegosRecomendados[i].productoOferta) {
            htmlJuegosRecomendados +=
                           `<li>
                                <p class="descuento "> ${juegosRecomendados[i].descuento}% </p>
                            </li>
                            <li>
                                <p class="preciorebajado "> ARS$ ${juegosRecomendados[i].precioBase} </p>
                            </li>
                            </ul>
                            <p class="preciooriginal "> ARS$ ${juegosRecomendados[i].precioDescuento}</p>`;
        } else {
            htmlJuegosRecomendados += `</ul>
                            <p class="preciooriginal "> ARS$ ${juegosRecomendados[i].precioBase}</p>`;
        }

        htmlJuegosRecomendados +=
                        `
                        </div>
                        </p>
                    </div>
                </div>
            </div>`
    }
    console.log(htmlJuegosRecomendados);
    return htmlJuegosRecomendados;
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides ");
    var dots = document.getElementsByClassName("demo ");
    var captionText = document.getElementById("caption ");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none ";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active ", " ");
    }
    slides[slideIndex - 1].style.display = "block ";
    dots[slideIndex - 1].className += " active ";
    captionText.innerHTML = dots[slideIndex - 1].alt;
}