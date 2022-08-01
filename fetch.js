programarAcciones();

//-----------------------------------------------------------------
function programarAcciones() {
  programarBotonVer();
  programarBotonAdmin();
}
//-----------------------------------------------------------------
// BOTONES
function programarBotonVer() {
  const btn = document.getElementById("ver");
  btn.addEventListener("click", () => {
    cargarListadoDeFrases();
  });
}

function programarBotonAdmin() {
  const btn = document.getElementById("admin");
  btn.addEventListener("click", () => {
    crearPublicacionFraseCelebre();
  });
}

function programarBotonSubmit() {
  const btnS = document.getElementById("inputButtonSubmit");
  btnS.addEventListener("click", (event) => {
    inputFrase = document.getElementById("frase").value;
    inputAutor = document.getElementById("autor").value;
    cargarNuevaFrase(inputFrase, inputAutor);
    document.getElementById("autor").value = "";
    document.getElementById("frase").value = "";
  });
}

function programarBotonReset() {
  const btnR = document.getElementById("inputButtonReset");
  btnR.addEventListener("click", (event) => {
    document.getElementById("autor").value = "";
    document.getElementById("frase").value = "";
  });
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
//---------------------------------------------------------------
//FUNCIONES DE CARGAR

function cargarListadoDeFrases() {
  fetch("https://jsonplaceholder.typicode.com/posts/")
    .then((res) => res.json())
    .then((json) => mostrarListadoDeFrases(json))
    .catch((error) =>
    sendToastify("NO PUDO CREARLO INTENTE MAS TARDE", "top", "right", 5000,"linear-gradient(to right, #030d2b, #097965)") + error
    );
}

function cargarNuevaFrase(inputFrase, inputAutor) {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: inputAutor,
      body: inputFrase,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => sendToastify("FRASE ENVIADA CORRECTAMENTE", "top", "right", 5000,"linear-gradient(to right, #030d2b, #097965)"))
    .catch((error) => sendToastify("NO PUDO CREARLO", "top", "right", 5000,"linear-gradient(to right, #030d2b, #097965)"));
}
//-----------------------------------------------------------------
//FUNCIONES DE MOSTRAR y CREAR
//FUNCIONES BOTON VER
function mostrarListadoDeFrases(frase) {
  const container = document.getElementById("frasesApp");
  const inputFrase = document.querySelector("#frasesApp1");
  const inputAutor = document.querySelector("#frasesApp2");
  inputFrase.innerHTML = "";
  inputAutor.innerHTML = "";
  container.innerHTML = "";
  frase.forEach((fraseC) => {
    crearFrase(fraseC, container);
  });
}

function crearFrase(frase, div) {
  const divFrase = document.createElement("div");
  divFrase.innerHTML = `<h2 class"h2Frase">"${frase.title.substr(0, 35)}"</h2>
                        <p class"pFrase">${frase.body.substr(0, 12)}</p>
                        `;
  divFrase.setAttribute(
    "style",
    "color:black;width:25%;height:20%;padding:2%;border-radius:20px;border:2px solid black;margin:2%;background-color:antiquewhite;box-shadow: 10px 5px 10px grey;"
  );
  div.appendChild(divFrase);
}
//---------------------------------------------------------------
//FUNCIONES BOTON ADMIN
function crearPublicacionFraseCelebre() {
  const inputFrase = document.querySelector("#frasesApp1");
  const container = document.getElementById("frasesApp");
  container.innerHTML = "";
  inputFrase.innerHTML = `
  <hr>
  <label>Ingresar autor</label>
  <input id="autor" class="inputText" type="text" value="" name="option"/>
  `;
  frasesApp1.setAttribute("style", "margin-right:40px;margin-top:10px");
  const inputAutor = document.querySelector("#frasesApp2");
  inputAutor.innerHTML = `
  <label>Ingresar frase celebre</label>
  <input id="frase" class="inputText2" type="text" value="" name="option" button/>
  <input id="inputButtonSubmit" class="inputButtonSubmit" type="button" value="Enviar">
  <input id="inputButtonReset" class="inputButtonReset" type="button" value="Borrar">
  <hr>`;
  frasesApp2.setAttribute("style", "margin-right:40px;margin-top:10px");

  programarBotonSubmit();
  programarBotonReset();
}
