// reportes.js

document.addEventListener("DOMContentLoaded", iniciarReportes);

function iniciarReportes(){

const boton=document.querySelector("#reportes button");

boton.addEventListener("click", generarReporte);

}

function generarReporte(){

let contenido="REPORTE DE TRANSPORTES - TRANSERAL\n\n";

contenido+="Vehiculo,Chofer,Destino\n";

contenido+="Camión 12,Juan Pérez,Santo Domingo\n";
contenido+="Camión 5,Pedro López,Santiago\n";

let archivo=new Blob([contenido],{type:"text/plain"});

let enlace=document.createElement("a");

enlace.href=URL.createObjectURL(archivo);

enlace.download="reporte_transeral.txt";

enlace.click();

}
