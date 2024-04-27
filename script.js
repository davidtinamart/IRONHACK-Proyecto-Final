// Variables para definir palabras

const animalesFaciles = ["perro", "caballo", "tigre", "loro", "gato", "oso", "pez", "pato", "gallina", "raton"];
const animalesMedios = ["rinoceronte", "elefante", "jirafa", "cocodrilo", "ballena", "tortuga", "serpiente", "medusa", "gorila", "leopardo"];
const animalesDificiles = ["picozapato", "ajolote", "halcon", "buitre", "cuervo", "ornitorrinco", "avestruz", "flamenco", "suricato", "casuario"];

// Variables para definir el juego

let palabraElegida;
let letrasElegidas = new Set();
let intentosRestantes = 6;

// Variables para definir elementos del DOM

const letrasGuiones = document.getElementById("letras-guiones");
const pantallaIntentosRestantes = document.getElementById("intentos-restantes");
const pantallaResultado = document.getElementById("resultado-final");
const botonReintentar = document.getElementById("reintentar");

// Onclick dificultad botones, recibe string de dificultad,deja la palabraElegida almacenada, y resetea la partida

function establecerDificultad(dificultad) {
  switch (dificultad) {
    case "facil":
      palabraElegida = animalesFaciles[Math.floor(Math.random() * animalesFaciles.length)];
      break;
    case "medio":
      palabraElegida = animalesMedios[Math.floor(Math.random() * animalesMedios.length)];
      break;
    case "dificil":
      palabraElegida = animalesDificiles[Math.floor(Math.random() * animalesDificiles.length)];
      break;
    default:
      palabraElegida = animalesFaciles[Math.floor(Math.random() * animalesFaciles.length)];
  }
  resetearPartida();
}


function resetearPartida() {  // El boton reintentar llama a esta funcion, limpia el Set de letras adivinadas,
                              // resetea los intentos, actualiza la pantalla y habilita las letras
  letrasElegidas.clear();
  intentosRestantes = 6;
  actualizarTecladoLetras();                           // LLama a la funcion que actualiza las letras en pantalla
  actualizarPantallaIntentosRestantes();               // Llama a la funcion que actualiza los intentos restantes
  actualizarPantallaResultado("");                     // Llama a la funcion que actualiza el resultado
  const letters = document.querySelectorAll(".letra"); // Habilita las letras
  for (let i = 0; i < letters.length; i++) {
    letters[i].removeAttribute("disabled");            // Remueve el atributo disabled de las letras para habilitarlas
  }
  botonReintentar.style.display = "none";                // Oculta el boton reintentar
}


function actualizarTecladoLetras() {                   // Actualiza las letras en pantalla con guiones o letras
  let palabra = "";                                    // Si la letra esta en el Set, la muestra, sino muestra un guion               
  for (let i = 0; i < palabraElegida.length; i++) { 
    if (letrasElegidas.has(palabraElegida[i])) {        
      palabra += palabraElegida[i];                    // Coge la letra de la palabra elegida y la lleva a la pantalla                     
    } else {
      palabra += "_";
    }
    palabra += " ";
  }
  letrasGuiones.textContent = palabra;                 // Se lleva la palabra a la pantalla de guiones
}


function adivinaLetra(letter) {
  if (letrasElegidas.has(letter)) {                    // Si del Set la letra ya fue adivinada, no hace nada
    return;
  }
  letrasElegidas.add(letter);                        // Si la letra no fue adivinada, la agrega al Set
  if (palabraElegida.includes(letter)) { 
    playSonidoAcierto();
    actualizarTecladoLetras();                      // Llama a la funcion que actualiza las letras en pantalla
                                                    
    if (revisarVictoria()) {
      playSonidoVictoria();
      alert("¡Has ganado!");
      actualizarPantallaResultado("¡Has ganado!");  // Llama a la funcion que rellena la funcion con el resultado
      terminarPartida();                            // Llama a la funcion que termina la partida                    
    }
  } else {
    playSonidoFallo();
    intentosRestantes--;
    actualizarPantallaIntentosRestantes();           // Tiene que ver el nuevo numero de intentos -1
    if (revisarDerrota()) {
      playSonidoDerrota();
      alert("¡Has perdido, La palabra era: " + palabraElegida);
      actualizarPantallaResultado("¡Has perdido!");   //Rellena la funcion con el resultado
      terminarPartida();                            // Llama a la funcion que termina la partida            
    }
  }
}


function actualizarPantallaIntentosRestantes() { // Actualiza la pantalla con los intentos restantes
  pantallaIntentosRestantes.textContent = intentosRestantes;
}


function actualizarPantallaResultado(result) { // Actualiza la pantalla con el resultado
  pantallaResultado.textContent = result;
}


function revisarVictoria() { // Revisa si todas las letras de la palabra estan en el Set (true)
  for (let i = 0; i < palabraElegida.length; i++) {
    if (!letrasElegidas.has(palabraElegida[i])) {
      return false;
    }
  }
  return true;
}

// Revisa si los intentos restantes son 0 (true)

function revisarDerrota() { 
  return intentosRestantes === 0;
}

// FIN - Deshabilita las letras y muestra el boton reintentar

function terminarPartida() {
  const letters = document.querySelectorAll(".letra");
  for (let i = 0; i < letters.length; i++) {
    letters[i].setAttribute("disabled", "");
  }
  botonReintentar.style.display = "block";
}


// FUNCIONES PARA LOS SONIDOS - EXTRA

function playSonidoVictoria() {
  const sonidoVictoria = new Audio("sonidos/victoria.mp3");
  sonidoVictoria.play();
}

function playSonidoDerrota() {
  const sonidoDerrota = new Audio("sonidos/derrota.mp3");
  sonidoDerrota.play();
}

function playSonidoAcierto() {
  const sonidoAcierto = new Audio("sonidos/acierto.mp3");
  sonidoAcierto.play();
}

function playSonidoFallo() {
  const sonidoFallo = new Audio("sonidos/fallo.mp3");
  sonidoFallo.play();
}
