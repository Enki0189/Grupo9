const requestURL = 'juegos.json';
const request = new XMLHttpRequest();
request.open('GET',requestURL );
 // setean el método, la url de api
request.responseType = 'json'; //definen el tipo de dato que les devuelve
request.send();//envían la solicitud
request.onload = function () {
  const juegos = request.response;
  console.log(juegos);
}

function mostrarJuegos() {
  
}


