/===== Gallery =====/
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

    let categoriaClass = 'gallery__item mix accion aventuras';


    for(let i = 0; i < juegos.length; i++) {
        let categoryClass = 'gallery__item mix '.concat(juegos[i].generos);
        galeriaProductosHtml += `<div class="${categoryClass}">
        <a href="detalleDelProducto.html" class="btn">
            <img src=${juegos[i].imgSliderPath} alt="Product">
                <div class="gallery__item-content">
                    <p class="gallery__item-title">${juegos[i].nombre}</p>`;
        if(juegos[i].productoOferta){
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

    /===== Mixitup =====/
    var mixer = mixitup('.gallery__products');
}