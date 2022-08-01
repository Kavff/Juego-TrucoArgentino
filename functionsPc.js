let trucoActivo = false;

function Control() {
  setTimeout(() => {
    let x = QuienGana();
    if (x != null) {
      if (x == "jugador") {
        puntosPlayer++;
        turnoActual = "player";
        ConteoDePuntos();
        return;
      }
      if (turnoActual == "pc") {
        TirarMaquina();
        turnoActual = x;
        Control();
      }
      if (x == "pc") {
        TirarMaquina();
        turnoActual = "player";
        ganoUsuario = false;

        
        puntosPc++;
        ConteoDePuntos();
        return;
      }
    }
  }, 1500);
}

function ConteoDePuntos() {
  if (cartasEnMesa.length == 6) {
    if (puntosPc > puntosPlayer) {
      mazoEstado = true;
      tablero_SumarPuntosPC(1);
      if(trucoActivo){
        tablero_SumarPuntosPC(1);
        trucoActivo = false;
      }
      repartirCartas();
      return;
    }

    if (puntosPlayer > puntosPc) {
      mazoEstado = true;
      tablero_SumarPuntosPlayer(1);
      if(trucoActivo){
        tablero_SumarPuntosPlayer(1);
        trucoActivo = false;
      }
      repartirCartas();
      return;
    }

    if (puntosPlayer == puntosPc) {
      mazoEstado = true;
      tablero_SumarPuntosPC(1);
      tablero_SumarPuntosPlayer(1);
      repartirCartas();
      return;
    }
  }else{
    if(puntosPc == 2 & puntosPlayer <= 1){
      sendToastify(
        "GANO LA MAQUINA",
        "center",
        "right",
        5000,
        'background: "linear-gradient(to right, #ff4229, #ff4229)'
      );
      tablero_SumarPuntosPC(1);
      if(trucoActivo){
        tablero_SumarPuntosPC(1);
        trucoActivo = false;
      }
      mazoEstado = true;
      repartirCartas();
      return;
    }

    if(puntosPlayer == 2 & puntosPc <= 1){
      sendToastify(
        "GANO EL PLAYER",
        "center",
        "right",
        5000,
        'background: "linear-gradient(to right, #ff4229, #ff4229)'
      );
      tablero_SumarPuntosPlayer(1);
      mazoEstado = true;
      if(trucoActivo){
        tablero_SumarPuntosPlayer(1);
        trucoActivo = false;
      }
      repartirCartas();
      return;
    }

    
  }
}



function QuienGana() {
  if (cartasEnMesa.length == 2) {
    turnoCarta++;
   
    return Competir(cartasEnMesa[0], cartasEnMesa[1]);
  }

  if (cartasEnMesa.length == 4) {
    turnoCarta++;
   
    return Competir(cartasEnMesa[2], cartasEnMesa[3]);
  }

  if (cartasEnMesa.length == 6) {
    turnoCarta++;
    
    return Competir(cartasEnMesa[4], cartasEnMesa[5]);
  }
  return "ERROR";
}

function Competir(carta1, carta2) {
  if (carta1.value > carta2.value) {
    return carta1.owner;
  } else {
    return carta2.owner;
  }
}

function TirarMaquina() {
  for (let i = 0; i < cartasEnManoPc.length; i++) {
    let _carta = null;

    if (cartasEnManoPc[i] != 0) {
      _carta = document.getElementById("#pccard" + i);
      
      pushMesa("#pc", _carta, cartasEnManoPc[i], cartasEnManoPc);
      return true;
    }
  }
  return false;
}
