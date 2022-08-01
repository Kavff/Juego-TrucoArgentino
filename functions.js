/* -------------Button for select table--------------------------- */
const backgroundImageGT = "Tablero Verde";
function changeBackgroundImagenGT() {
  document.getElementById("body").style.backgroundImage =
    "url('./img/istockphoto-1046326882-612x612.jpg')";
  localStorage.setItem("background", backgroundImageGT);
  localStorage.getItem(`background`);
}
const backgroundImageBT = "Tablero Negro";

function changeBackgroundImagenBT() {
  document.getElementById("body").style.backgroundImage =
    "url('./img/black-.jpg')";
  localStorage.setItem("background2", backgroundImageBT);
  localStorage.getItem(`background2`);
}
const backgroundImageTT = "Tablero de Tronco";

function changeBackgroundImagenTT() {
  document.getElementById("body").style.backgroundImage =
    "url('./img/wood866659_960_720.jpg')";
  localStorage.setItem("background3", backgroundImageTT);
  localStorage.getItem(`background3`);
}

const backgroundImageCT = "Tablero de Colores";
function changeBackgroundImagenCT() {
  document.getElementById("body").style.backgroundImage =
    "url('./img/hardwood-0.jpg')";
  localStorage.setItem("background4", backgroundImageCT);
  localStorage.getItem(`background4`);
}

/* --------------------------------USER--------------------------------- */

// HTML Elements

const botonRepartir = document.querySelector("#btnRepartir");
const botonTruco = document.querySelector("#btnTruco");
const botonEnvido = document.querySelector("#btnEnvido");
const botonIrAlMazo = document.querySelector("#botonIrAlMazo");
/* const botonFlor = document.querySelector("#btnFlor");*/
const puntosTableroPc = document.querySelector("#puntosFinalesPc");
const puntosTableroPlayer = document.querySelector("#puntosFinalesPlayer");
const botonEmpezarJuego = document.querySelector("#botonEmpezar");
const allMain = document.querySelector("#main");
const allCardsCascada = document.querySelector(".allCards");
const usuarioNombre = document.querySelector("#usuarioNombre");

///Constantes
const Tipos = ["basto", "copa", "espada", "oro"];

// DATOS
let cartasEnMesa = [];
let cartasEnManoJugador = [];
let cartasEnManoPc = [];
let mazoBarajado = [];

// ----------- TABLERO INICIAL ----------------

const crearMazo = () => {
  let mazo = [];
  let id = 0;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < Tipos.length; j++) {
      let temporal = i;
      temporal++;
      const carta = {
        numero: temporal,
        tipo: Tipos[j],
        img: `./img/${temporal}_de_${Tipos[j]}.png`,
        id: id++,
        value: GetValuesT(temporal, Tipos[j]),
        valueEnvido: GetValuesE(temporal),
        owner: null,
      };
      mazo.push(carta);
    }
  }
  return mazo;
};

// VALORES DEL TRUCO Y EL ENVIDO--------------------------

const GetValuesT = (numero, tipo) => {
  if ((numero == 1) & (tipo == "espada")) return 100;
  else if ((numero == 1) & (tipo == "basto")) return 99;
  else if ((numero == 7) & (tipo == "espada")) return 98;
  else if ((numero == 7) & (tipo == "oro")) return 96;
  else if (numero == 3) return 95;
  else if (numero == 2) return 94;
  else if ((numero == 1) & (tipo == "oro") & (tipo == "copa")) return 93;
  else if (numero == 10) return 92;
  else if (numero == 9) return 91;
  else if (numero == 8) return 90;
  else if (
    (numero == 7) & (tipo == "basto") ||
    (numero == 7) & (tipo == "copa")
  )
    return 89;
  else if (numero == 6) return 88;
  else if (numero == 5) return 87;
  else if (numero == 4) return 86;
};

const GetValuesE = (numero) => {
  if (numero == 1) return 1;
  else if (numero == 2) return 2;
  else if (numero == 3) return 3;
  else if (numero == 4) return 4;
  else if (numero == 5) return 5;
  else if (numero == 6) return 6;
  else if (numero == 7) return 7;
  else if (numero == 8) return 0;
  else if (numero == 9) return 0;
  else if (numero == 10) return 0;
};

// ------------- BARAJAR MAZO
const barajar = () => {
  mazoBarajado = crearMazo()
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return mazoBarajado;
};

let mazoEstado = true;

//--------------------REPARTIR CARTAS
const repartirCartas = () => {

  if(!mazoEstado)return;
  
  mazoEstado = false;
  mazo = barajar(); // BARAJA LAS CARTAS Y CREA EL MAZO
  limpiarMesa(); // LIMPIA LA MESA. (RESETEA)

  resetearTodo(); // Resetea todo a 0
  
  for (let i = 0; i < 3; i++) {
    numero1 = randomCard = Math.floor(Math.random() * mazo.length);
    numero2 = randomCard = Math.floor(Math.random() * mazo.length);

    while (mazo[numero1] == null || mazo[numero1] == "undefined") {
      // SI LA CARTA NO EXISTE BUSCA OTRA HASTA ENCONTRAR.
      numero1 = randomCard = Math.floor(Math.random() * mazo.length);
    }
    let _carta = mazo[numero1];
    _carta.owner = "jugador";
    cartasEnManoJugador.push(_carta);
    crearCarta(_carta, i, "#player");
    mazo.splice(numero1, 1);

    while (mazo[numero2] == null || mazo[numero2] == "undefined") {
      numero2 = randomCard = Math.floor(Math.random() * mazo.length);
    }
    _carta = mazo[numero2];
    _carta.owner = "pc";
    cartasEnManoPc.push(_carta);
    crearCarta(_carta, i, "#pc");
    mazo.splice(numero2, 1);
  }
  empezarJuego();
};


const crearCarta = (carta, numero, target) => {
  const _carta = document.querySelector(target);
  const div = document.createElement("div");
  div.classList.add("card");
  div.id = target + "card" + numero;
  target == "#pc"
    ? (div.innerHTML = ` 
  <img src = ${"./img/Back.jpg"} alt="">
  `)
    : (div.innerHTML = `
  <img src = ${carta.img} alt="">
  `);
  _carta.appendChild(div);
};


function limpiarMesa() {
  const cardEnMesa = document.querySelectorAll(".card");
  cardEnMesa.forEach((el) => {
    el.remove();
  });

  for (let i = 1; i < 4; i++) {
    const cartaHtml = document.getElementById("cardTable" + i);
    cartaHtml.innerHTML = `
  <img src = "" alt="">
  `;
  }
}

let turnoActual = "player";
let turnoCarta = 1;

// -= EMPEZAR JUEGO =- //

function dropCard(divCarta, idCarta) {
  const cartaHtmlPlayer = document.querySelector(divCarta);
  cartaHtmlPlayer.removeChild(idCarta);
}

function pushMesa(cartaDiv, idCarta, carta, manoActual) {
  const divHtml = document.getElementById("cardTable" + turnoCarta);
  const imgCarta = document.createElement("img");
  imgCarta.src = carta.img;
  divHtml.appendChild(imgCarta);
  carta.owner == "pc" ? imgCarta.classList.add("noOcuparEspacio") : imgCarta.classList.add("noOcuparEspacio1");
  let tempOwner = carta.owner;
  tempOwner = "player" ? (turnoActual = "pc") : (turnoActual = "player");
  cartasEnMesa.push(carta);
  dropCard(cartaDiv, idCarta);
  const found = manoActual.find(
    (element) => (element.numero == carta.numero) & (element.tipo == carta.tipo)
  );
  let _index = manoActual.indexOf(found);
  manoActual[_index] = 0;
}


let puntosPlayer = 0;
let puntosPc = 0;
let puntosEnvidoPc = 0;
let puntosEnvidoPlayer = 0;
let puntosFinalesPlayer = 0;
let puntosFinalesPc = 0;

function resetearTodo() {
  puntosPlayer = 0;
  puntosPc = 0;
  puntosEnvidoPc = 0;
  puntosEnvidoPlayer = 0;
  cartasEnManoJugador = [];
  cartasEnManoPc = [];
  turnoCarta = 1;
  turnoActual = "player";
  cartasEnMesa = [];
}

// ---------------------------- CONTADOR ----------------------------

function tablero_SumarPuntosPC(ganador) {
  puntosFinalesPc += ganador;

  puntosTableroPc.innerText = puntosFinalesPc;
}

function tablero_SumarPuntosPlayer(ganador) {
  puntosFinalesPlayer += ganador;
  puntosTableroPlayer.innerText = puntosFinalesPlayer;
}

//---------------------------- ENVIDO -----------------------------
function envido(cartas) {
  let valor = 0;

  const bastos = cartas.filter((element) => element.tipo == "basto");
  const espadas = cartas.filter((element) => element.tipo == "espada");
  const oros = cartas.filter((element) => element.tipo == "oro");
  const copas = cartas.filter((element) => element.tipo == "copa");

  if (espadas.length == 2) {
    valor = 20;
    for (let index = 0; index < espadas.length; index++) {
      const element = espadas[index];
      valor += element.valueEnvido;
    }
  } else if (bastos.length == 2) {
    valor = 20;
    for (let index = 0; index < bastos.length; index++) {
      const element = bastos[index];
      valor += element.valueEnvido;
    }
  } else if (oros.length == 2) {
    valor = 20;
    for (let index = 0; index < oros.length; index++) {
      const element = oros[index];
      valor += element.valueEnvido;
    }
  } else if (copas.length == 2) {
    valor = 20;
    for (let index = 0; index < copas.length; index++) {
      const element = copas[index];
      valor += element.valueEnvido;
    }
  } else {
    valor = getHigh(cartas);
  }

  return valor;
}

// BUSCA EL VALOR DE LA CARTA MAS ALTA PARA EL ENVIDO
function getHigh(cartas) {
  let value = 0;
  for (let index = 0; index < cartas.length; index++) {
    const element = cartas[index];

    if (element.valueEnvido > value) {
      value = element.valueEnvido;
    }
  }
  return value;
}



function sendToastify(texto, gravity, position, tiempo, style) {
  Toastify({
    text: texto,
    gravity: gravity,
    position: position,
    duration: tiempo,
    style: { background: style },
  }).showToast();
}

function jugarEnvido() {
  sendToastify("ENVIDO!!", "bottom", "right", 3000);
  if (envido(cartasEnManoPc) > 20) {
    sendToastify(
      `QUIERO!! TENGO ${envido(cartasEnManoPc)}`,
      "top",
      "right",
      5000,
      "linear-gradient(to right, #ff4229, #ff4229)"
    );

    if (envido(cartasEnManoJugador) > envido(cartasEnManoPc)) {
      tablero_SumarPuntosPlayer(2);
      sendToastify(
        `LAS MIAS SON MEJORES ${envido(cartasEnManoJugador)}`,
        "bottom",
        "right",
        5000
      );
    } else if (envido(cartasEnManoJugador) < envido(cartasEnManoPc)) {
      tablero_SumarPuntosPC(2);
      sendToastify(
        `SON BUENAS, SOLO TENGO ${envido(cartasEnManoJugador)}`,
        "bottom",
        "right",
        5000
      );
    } else if (envido(cartasEnManoJugador) == envido(cartasEnManoPc)) {
      tablero_SumarPuntosPlayer(1);
      sendToastify(
        `IGUALES!! ${envido(cartasEnManoJugador)}`,
        "bottom",
        "right",
        6000
      );
    }
  } else if (envido(cartasEnManoPc) < 20) {
    tablero_SumarPuntosPlayer(1);
    sendToastify(
      "NO QUIERO NI LOCO!!",
      "center",
      "right",
      5000,
      'background: "linear-gradient(to right, #ff4229, #ff4229)'
    );
  }
}
// -------------------------- TRUCO -----------------------------
function jugarTruco() {
  Toastify({
    text: "TRUCO!!",
    gravity: "bottom",
    position: "right",
    duration: 4000,
  }).showToast();

  if(truco(cartasEnManoPc)){
    sendToastify("QUIERO", "top", "right", 4000);
    trucoActivo = true;
  }else{
    sendToastify("NO QUIERO", "top", "right", 4000);
    tablero_SumarPuntosPlayer(1);
    mazoEstado = true;
    repartirCartas();
  }

}

function truco(cartas) {

  const blancas = cartas.filter((element) => element.value > 94);
  return (blancas.length >= 1 ? true : false);
}

// ------------------------- IR AL MAZO ------------------------------------

function irseAlMazo() {
  Toastify({
    text: "Me voy al mazo!",
    gravity: "bottom",
    position: "right",
    duration: 4000,
  }).showToast();
  tablero_SumarPuntosPC(1);
  mazoEstado = true;
  botonEnvido.addEventListener("click", clicked);
  botonTruco.addEventListener("click", clickedT);
/*   botonIrAlMazo.addEventListener("click", clicked);
 */  repartirCartas();
}

// // ------------------------- CASCADA DE IMAGENES ------------------------------------

function cascadaImagen() {
  let cascada = document.createElement("span");
  let size = Math.random() * 220;
  let seccion = document.querySelector(".allCards");

  let imagenes = [
    'url("img/1_de_basto.png")',
    'url("img/1_de_espada.png")',
    'url("img/1_de_oro.png")',
    'url("img/1_de_copa.png")',
    'url("img/7_de_basto.png")',
    'url("img/7_de_espada.png")',
    'url("img/7_de_oro.png")',
    'url("img/7_de_copa.png")',
    'url("img/10_de_basto.png")',
    'url("img/10_de_espada.png")',
    'url("img/10_de_oro.png")',
    'url("img/5_de_copa.png")',
    'url("img/3_de_basto.png")',
    'url("img/3_de_espada.png")',
    'url("img/4_de_oro.png")',
    'url("img/4_de_copa.png")',
    'url("img/9_de_basto.png")',
    'url("img/9_de_espada.png")',
    'url("img/8_de_oro.png")',
    'url("img/8_de_copa.png")',
    'url("img/2_de_basto.png")',
    'url("img/2_de_espada.png")',
    'url("img/10_de_oro.png")',
    'url("img/10_de_copa.png")',
  ];

  cascada.style.left = Math.random() * innerWidth + "px";
  let background = imagenes[Math.floor(Math.random() * imagenes.length)];
  cascada.style.width = 50 + size + "px";
  cascada.style.height = 130 + size + "px";
  cascada.style.backgroundImage = background;
  seccion.appendChild(cascada);
  setTimeout(() => {
    cascada.remove();
  }, 1750);
}

// ------------------------- PRESENTACION INICIAL ------------------------------------

// FUNCION AGREGAR NOMBRE AL USUARIO Y GUARDAR EN EL STORAGE
guardarNombreUsuario();

function guardarNombreUsuario() {
  Swal.fire({
    title: `¡Bienvenido al FAMOSO TRUCO ARGENTINO!
  Escribe tu nombre de usuario`,
    html: `<input type="text" id="login" class="swal2-input" placeholder="Nombre de usuario">`,
    confirmButtonText: "Enviar",
    focusConfirm: false,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    preConfirm: () => {
      const login = Swal.getPopup().querySelector("#login").value;
      if (login === "") {
        Swal.showValidationMessage(`Por favor escribir un nombre de usuario`);
      }
      usuarioNombre.innerText = login;
      localStorage.setItem("nombreUsuario", JSON.stringify(login));
      return { login: login };
    },
    allowOutsideClick: () => Swal.isLoading(),
  }).then((result) => {
    Swal.fire(
      `Nombre de usuario: ${result.value.login}
  `.trim()
    );
  });
}

// --------------------------- CHEQUIAR SI HAY USUARIO EN EL STORAGE --------------------------

let usuario;
const usuarioLS = localStorage.getItem("nombreUsuario");

usuarioLogin();
function usuarioLogin() {
  if (usuarioLS) {
    usuario = usuarioLS;
  } else {
    guardarNombreUsuario();
  }
}

//------------------------------------------------------- PARA LA PROXIMA VERSION --------------------------------------------------------------
// ------------------------- FLOR -------------------------------
/*
function flor(cartas) {
  let valor = 0;
  const bastos = cartas.filter((element) => element.tipo == "basto");
  const espadas = cartas.filter((element) => element.tipo == "espada");
  const oros = cartas.filter((element) => element.tipo == "oro");
  const copas = cartas.filter((element) => element.tipo == "copa");

  if (espadas.length == 3) {
    valor = 20;
    for (let index = 0; index < espadas.length; index++) {
      const element = espadas[index];
      valor += element.valueEnvido;
    }
  } else if (bastos.length == 3) {
    valor = 20;
    for (let index = 0; index < bastos.length; index++) {
      const element = bastos[index];
      valor += element.valueEnvido;
    }
  } else if (oros.length == 3) {
    valor = 20;
    for (let index = 0; index < oros.length; index++) {
      const element = oros[index];
      valor += element.valueEnvido;
    }
  } else if (copas.length == 3) {
    valor = 20;
    for (let index = 0; index < copas.length; index++) {
      const element = copas[index];
      valor += element.valueEnvido;
    }
  }
  return valor;
}

function tieneFlor(cartas) {
  let tieneParaFlor = 0;
  const bastos = cartas.filter((element) => element.tipo == "basto");
  const espadas = cartas.filter((element) => element.tipo == "espada");
  const oros = cartas.filter((element) => element.tipo == "oro");
  const copas = cartas.filter((element) => element.tipo == "copa");

  if (espadas.length == 3) {
    tieneParaFlor = 1;
    for (let index = 0; index < espadas.length; index++) {
      const element = espadas[index];
      valor += element.valueEnvido;
    }
  } else if (bastos.length == 3) {
    tieneParaFlor = 1;
    for (let index = 0; index < bastos.length; index++) {
      const element = bastos[index];
      valor += element.valueEnvido;
    }
  } else if (oros.length == 3) {
    tieneParaFlor = 1;
    for (let index = 0; index < oros.length; index++) {
      const element = oros[index];
      valor += element.valueEnvido;
    }
  } else if (copas.length == 3) {
    tieneParaFlor = 1;
   for (let index = 0; index < copas.length; index++) {
      const element = copas[index];
      valor += element.valueEnvido;
    }
  }
  return tieneParaFlor;
}


function jugarFlor() {
  Toastify({
    text: "FLOR!!",
    gravity: "bottom",
    position: "right",
    duration: 3000,
  }).showToast();
  if (tieneFlor(cartasEnManoPc) == true) {
    Toastify({
      text: `QUIERO!! TENGO ${flor(cartasEnManoPc)}`,
      gravity: "top",
      position: "right",
      duration: 5000,
      style: {
        background: "linear-gradient(to right, #ff4229, #ff4229)",
      },
    }).showToast();
    if (flor(cartasEnManoJugador) > flor(cartasEnManoPc)) {
      puntosFinalesPlayer = 2;
      Toastify({
        text: `LAS MIAS SON MEJORES ${flor(cartasEnManoJugador)}`,
        gravity: "bottom",
        position: "right",
        duration: 5000,
      }).showToast();
    } else puntosFinalesPC = 2;
    Toastify({
      text: `GANASTE TU. SOLO TENGO ${flor(cartasEnManoJugador)}`,
      gravity: "bottom",
      position: "right",
      duration: 5000,
    }).showToast();
  } else if (tieneFlor(cartasEnManoPc) == false) {
    puntosFinalesPlayer++;
    Toastify({
      text: "ESTA VEZ NO TENGO!!",
      gravity: "center",
      position: "right",
      duration: 5000,
      style: {
        background: "linear-gradient(to right, #ff4229, #ff4229)",
      },
    }).showToast();
  }
}
 */
// ----------------------- IR AL MAZO ----------------------------------
