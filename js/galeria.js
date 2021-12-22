/*===== Gallery =====*/
var galeriaProductosDiv = document.getElementById('galeria_productos');
const requestURL = 'js/juegos.json';
const request = new XMLHttpRequest();
request.open('GET',requestURL );
// setean el método, la url de api
request.responseType = 'json'; //definen el tipo de dato que les devuelve
request.send();

request.onload = function () {
    var juegos = request.response;
    console.log(juegos);
    let galeriaProductosHtml = '';

    for(let i = 0; i < juegos.length; i++) {
        let categoryClass = 'gallery__item mix '.concat(juegos[i].generos);
        let precioFinal = juegos[i].productoOferta ? juegos[i].precioDescuento : juegos[i].precioBase;
        galeriaProductosHtml += `<div class="${categoryClass}"  data-nombrejuego="${juegos[i].nombre}" data-precio=${precioFinal}>
        <a href="detalleDelProducto.html?idJuego=${juegos[i].id}" class="btn">
            <img src=${juegos[i].imgSliderPath} alt="Product">
                <div class="gallery__item-content">
                    <p class="gallery__item-title">${juegos[i].nombre}</p>`;
        if(juegos[i].productoOferta) {
            galeriaProductosHtml += `<p class="gallery__item-title">${juegos[i].descuento}% DESCUENTO - ARS$ ${juegos[i].precioDescuento}</p>`;
        } else {
            galeriaProductosHtml += `<p class="gallery__item-title">ARS$ ${juegos[i].precioBase}</p>`;
        }

        galeriaProductosHtml +=  `</div>
                                    </a>
                                  </div>`;
    }

    galeriaProductosDiv.innerHTML = galeriaProductosHtml;

    const galleryCategory = document.querySelectorAll('.gallery__category');
    console.log(galleryCategory);

    galleryCategory.forEach(category => category.addEventListener('click', linkActive));

    function linkActive() {
        galleryCategory.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    }

    /*===== Mixitup =====*/
    var mixer = mixitup('.gallery__products');

    ordenarMayorAMenorPrecio();
}

function ordenarAZ() {
    ordenarLista("A-Z", galeriaProductosDiv);
}

function ordenarZA() {
    ordenarLista("Z-A", galeriaProductosDiv);
}

function ordenarMenorAMayorPrecio() {
    ordenarLista("menorAMayorPrecio", galeriaProductosDiv);
}

function ordenarMayorAMenorPrecio() {
    ordenarLista("mayorAMenorPrecio", galeriaProductosDiv);
}

function ordenarLista(tipoOrdenamiento, listaAOrdenar) {
    var listaJuegos = listaAOrdenar.getElementsByTagName("DIV");
    var juegosDefinitivos = new Array();
    for(let i = 0; i < listaJuegos.length; i++) {
        if(i%2 == 0){
            juegosDefinitivos.push(listaJuegos[i]);
        }
    }
    ordenarQuickSort(juegosDefinitivos, 0, juegosDefinitivos.length - 1, tipoOrdenamiento);
}

function ordenarQuickSort(lista, inicio, fin, tipoOrdenamiento) {
    if (inicio < fin) {
        var i = particionar(lista, inicio, fin, tipoOrdenamiento);
        ordenarQuickSort(lista, inicio, i - 1, tipoOrdenamiento);
        ordenarQuickSort(lista, i + 1, fin, tipoOrdenamiento);
    }
}

function particionar(vector, inicio, fin, tipoOrdenamiento) {
    var pivote = vector[fin];
    i = (inicio - 1);
    for (var j = inicio; j < fin; j++) {
        if (comparacionSegunTipoOrdenamiento(tipoOrdenamiento, vector[j], pivote)) {
            i++;
            vector[i].parentNode.insertBefore(vector[j], vector[i]);
        }
    }
    vector[i + 1].parentNode.insertBefore(vector[fin], vector[i + 1]);
    return i + 1;
}

function comparacionSegunTipoOrdenamiento(tipoOrdenamiento, primerElemento, siguienteElemento) {
    if (tipoOrdenamiento === "A-Z") {
        return primerElemento.getAttribute('data-nombrejuego').toLowerCase() < siguienteElemento.getAttribute('data-nombrejuego').toLowerCase();
    } else if (tipoOrdenamiento === "Z-A") {
        return primerElemento.getAttribute('data-nombrejuego').toLowerCase() > siguienteElemento.getAttribute('data-nombrejuego').toLowerCase();
    } else if (tipoOrdenamiento === "menorAMayorPrecio") {
        return primerElemento.getAttribute('data-precio') < siguienteElemento.getAttribute('data-precio');
    } else if (tipoOrdenamiento === "mayorAMenorPrecio") {
        return primerElemento.getAttribute('data-precio') > siguienteElemento.getAttribute('data-precio');
    }

    return false;
}