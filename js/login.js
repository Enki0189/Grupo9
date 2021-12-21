function checkUserLogin(){
    let username = $('#username').val();
    let password = $('#password').val();
    if (username == '' || password == ''){
        alert('Debe ingresar el usuario y la contraseña para continuar');
    }else{
        let url = "js/contraseña.json";
        $.getJSON( url , function( data ) {
            console.log(data);
            sha256(password).then( function(respuestaHash) {
                if(checkUser(data, username, respuestaHash)){
                    window.location.href = "index.html";
                }
               
            });
        }) 
        .fail(function() {
            alert( "error página en mantenimiento " );
        })
        alert('Uusario y/o contraseña incorrectos');
    }
}

function checkUser(data, username, password){
        var user = false;
        $.each( data.users, function( key, val ) {
      
            val = JSON.stringify(val);
            val = JSON.parse(val);

            console.log('Username:' + username);
            console.log('Username Json:' + val.user);
            if (username === val.user){
                user = true;
                console.log('Password:' + password);
                console.log('Password Json:' + val.password);
                if (password == val.password){
                    console.log( "contraseña Correcta");
                    $('#userId').val(val.idUser);
                    $('#login_form').submit();
                    return true;
                }else{

                    return false;
                }
            }else {
                 console.log( "usuario no coincide");
            }
        })
        
        return false;
       
   
}

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder('utf-8').encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    //console.log(hashHex);
    return hashHex;

}