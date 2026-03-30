window.onload = function(){

if(localStorage.getItem("login")!="ok"){
window.location="login.html";
return;
}

mostrar("dashboard");

}

function mostrar(id){

let paginas=document.querySelectorAll(".pagina");

paginas.forEach(p=>{
p.style.display="none";
});

document.getElementById(id).style.display="block";

}

function logout(){
localStorage.removeItem("login");
window.location="login.html";
}

function toggleDarkMode(){
document.body.classList.toggle("dark");
}