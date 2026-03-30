function irLogin(){
    document.getElementById("portada").classList.remove("activa");
    document.getElementById("login").classList.add("activa");
}

function volver(){
    document.getElementById("login").classList.remove("activa");
    document.getElementById("portada").classList.add("activa");
    // Limpia los errores si el usuario vuelve atrás
    limpiarErrores();
}

function login(){
    let user = document.getElementById("usuario").value.trim();
    let pass = document.getElementById("password").value.trim();

    // Referencias a los elementos de error
    const errUser = document.getElementById("err-usuario");
    const errPass = document.getElementById("err-password");
    const boxUser = document.getElementById("box-usuario");
    const boxPass = document.getElementById("box-password");

    if(user === "admin" && pass === "1234"){
        sessionStorage.setItem('sesionActiva', 'true');
        sessionStorage.setItem('loginTime', Date.now());
        window.location = "index.html";
    } else {
        // 1. Mostrar los mensajes de error (estilo flex)
        errUser.style.display = "flex";
        errPass.style.display = "flex";

        // 2. Agregar clase de borde rojo y animación de sacudida
        boxUser.classList.add("error-border", "shake");
        boxPass.classList.add("error-border", "shake");

        // 3. Quitar la clase de animación después de 400ms para poder repetirla
        setTimeout(() => {
            boxUser.classList.remove("shake");
            boxPass.classList.remove("shake");
        }, 400);
    }
}

// Función extra para limpiar los errores cuando el usuario vuelva a intentar
function limpiarErrores() {
    document.getElementById("err-usuario").style.display = "none";
    document.getElementById("err-password").style.display = "none";
    document.getElementById("box-usuario").classList.remove("error-border");
    document.getElementById("box-password").classList.remove("error-border");
}
