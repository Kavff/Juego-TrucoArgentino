


window.onload = function () {

   
  allMain.setAttribute("style","visibility:hidden")

 
  botonEnvido.removeEventListener("click", clicked);
  botonTruco.removeEventListener("click", clickedT);
  botonIrAlMazo.removeEventListener("click", clickedIrAlMazo);

};

// ------------------------- CASCADA DE IMAGENES -----------------------------

let setIntervalCascada = setInterval(cascadaImagen, 100);


//---------------------- EMPEZAR JUEGO ----------------------------

botonEmpezarJuego.addEventListener("click",() => {

  clearInterval(setIntervalCascada);
  botonEmpezarJuego.setAttribute("style","display:none");
  allCardsCascada.setAttribute("style","display:none");
  allMain.setAttribute("style","visibility:visible");
});
//------------------------- BOTONES TABLERO -------------------------
const clickedIrAlMazo = (e) => {
  irseAlMazo();
};
  botonIrAlMazo.addEventListener("click", clickedIrAlMazo);

// ------------------------- TRUCO -------------------------
const clickedT = (e) => {
  jugarTruco();
  //botonTruco.removeEventListener("click", clickedT);
};
  botonTruco.addEventListener("click", clickedT);

// ------------------------- ENVIDO -------------------------
const clicked = (e) => {
  jugarEnvido();
  botonEnvido.removeEventListener("click", clicked);
};
  botonEnvido.addEventListener("click", clicked);



// ------------------------- REPARTIR CARTAS -------------------------
botonRepartir.addEventListener("click", () => {
  repartirCartas();
  empezarJuego();
  botonEnvido.addEventListener("click", clicked);
  botonTruco.addEventListener("click", clickedT);
  botonIrAlMazo.addEventListener("click", clickedIrAlMazo); 
});

// ------------------------- SELECCIONAR CARTAS -------------------------
let count = 0;

function empezarJuego(){
  
botonEnvido.addEventListener("click", clicked);
botonTruco.addEventListener("click", clickedT);
let seleccionarCarta0 = document.getElementById("#playercard0");
let seleccionarCarta1 = document.getElementById("#playercard1");
let seleccionarCarta2 = document.getElementById("#playercard2");

seleccionarCarta0.addEventListener('dblclick', (event) => {
    event.stopPropagation();
    if(turnoActual == "player"){
      pushMesa(
        "#player",
        seleccionarCarta0,
        cartasEnManoJugador[0],
        cartasEnManoJugador
      );
      Control();
      turnoActual = "pc";
    }
});

seleccionarCarta1.addEventListener('dblclick', (event) => {
  event.stopPropagation();
  if(turnoActual == "player"){
    pushMesa(
      "#player",
      seleccionarCarta1,
      cartasEnManoJugador[1],
      cartasEnManoJugador
    );
    Control();
    turnoActual = "pc";
  }
});

seleccionarCarta2.addEventListener('dblclick', (event) => {
  event.stopPropagation();
  if(turnoActual == "player"){
    pushMesa(
      "#player",
      seleccionarCarta2,
      cartasEnManoJugador[2],
      cartasEnManoJugador
    );
    Control();
    turnoActual = "pc";
  }
});

}



// ------------------------- FLOR ------------------------------

/* if (tieneFlor(cartasEnManoJugador) === 1){
  const clickedF = (e) => {
    jugarFlor();
    botonFlor.removeEventListener("click",clickedF)
    }
    botonFlor.addEventListener("click",clickedF);  
} */