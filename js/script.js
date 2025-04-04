// dificultades
// 1 fácil,   tiempo ifinito, 6 pares,    4*3
// 2 medio,   tiempo 60,      10 pares,   5*4 
// 3 difícil, tiempo 30,      15 pares,   6*5
var dificultad = 3;
var banderas = ["🦋","🦀", "🦍", "🐋", "🦆", "🦓", "🐞", "🐌", "🐢", "🐘", "🐖", "🦥", "🐓", "🐈", "🦜"];

class Carta {
    constructor(id, frente) {
        this.id = id;
        this.oculto = true;
        this.valor = frente;
        this.frente = frente;
        this.dorsal = "❔";
        this.document;
        this.encontrada = false;
    }
    getEncontrada() {
        return this.encontrada;
    }
    setEncontrada(valor) {
        this.encontrada = valor;
    }
    setDocument(document) {
        this.document = document;
    }
    getId() {
        return this.id;
    }
    toString() {
        return `carta ${this.id}`;
    }
    getValor() {
        return this.valor;
    }
    voltear() {
        this.oculto = !this.oculto;
        
        this.document.classList.toggle("volteada");
        let frenteElement = this.document.querySelector(".frente");
    
        if (this.oculto) {
            frenteElement.innerHTML = "❔";
        } else {
            frenteElement.innerHTML = this.valor;
        }
    }
}


class Memory {
    constructor(username, dificultad) {
        this.dificultad = dificultad;
        this.documento = document.getElementById("game-container");;
        this.user = username;
        this.tiempoTotal = 0
        this.tiempo = 0;
        this.filas = 0;
        this.columnas = 0;
        this.cartaSeleccionada;
        this.hayVolteada = false;
        this.cartaVolteada;
        this.matriz = [];
        this.setAtributtes();
        this.paresEncontrados = 0;
        this.pares = this.filas * this.columnas / 2;
        this.intentos = 0;
        this.llenarMatriz();
        this.mostrarMatriz();
        this.startGame();
    }
    
    startGame() {
        setInterval(() => this.restTime(), 1000);
    }
    
    restTime() {
        let valor = Math.floor(this.tiempo * 100 / this.tiempoTotal);
        document.getElementById("br-tiempo").value = valor;
        this.tiempo--;
        if (this.tiempo === 0) {
            clearInterval(this.timer);
            this.mostrarMensaje("¡Perdiste!", "Inténtalo de nuevo.", "#E63946");
        
        }
    }

    setAtributtes() {
        switch (this.dificultad) {
            case 1:
                this.filas = 3;
                this.columnas = 4;
                this.tiempo = 99999; // not time
                this.tiempoTotal = 99999;
                break;
            case 2:
                this.filas = 4;
                this.columnas = 5;
                this.tiempo = 60;
                this.tiempoTotal = 60;

                break;
            case 3:
                this.filas = 4;
                this.columnas = 5;
                this.tiempo = 30;
                this.tiempoTotal = 30;

                break;
            default:
                this.filas = 3;
                this.columnas = 4;
                this.tiempo = 99999;
                this.tiempoTotal = 99999;

                break;
        }
    }
    getFilas() {
        return this.filas;
    }
    getColumnas() {
        return this.columnas;
    }
    getMatriz() {
        return this.matriz;
    }
    llenarMatriz() {
        let cartasAElegir = [];

        let counter = 1;
        for (let i = 0; i < this.pares; i++) {
            cartasAElegir.push(new Carta(counter++, banderas[i]));
            cartasAElegir.push(new Carta(counter++, banderas[i]));           
        }
        for (let index = 0; index < this.filas; index++) {
            this.matriz.push([]);
            for (let columnas = 0; columnas < this.columnas; columnas++) {
                let posicion = Math.floor(Math.random() * cartasAElegir.length);
                let carta = cartasAElegir[posicion];
                this.matriz[index].push(carta);
                cartasAElegir.splice(posicion, 1);
            }
        }
    }

    createCarta(i, j) {
        let carta = document.createElement("div");
        carta.className = "carta";
        carta.addEventListener("click", () => {
            this.verficarIguales(this.matriz[i][j]);
        });
        let contenido = document.createElement("div");
        contenido.className = "contenido";

        let frente = document.createElement("div");
        frente.className = "frente";
        frente.innerHTML = "❔";

        let dorsal = document.createElement("div");
        dorsal.className = "dorsal";
        dorsal.innerHTML = this.matriz[i][j].getValor();

        contenido.appendChild(frente);
        contenido.appendChild(dorsal);
        carta.appendChild(contenido);
        
        this.matriz[i][j].setDocument(carta);
        return carta;

    }
    mostrarMatriz() {
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                
                let carta = this.createCarta(i, j);
                this.documento.appendChild(carta); 
    
            }
        }
    }
    verficarIguales(cartaNueva) {
        
        if (this.hayVolteada && this.cartaVolteada.getId() == cartaNueva.getId()) return;
        if (cartaNueva.getEncontrada()) return;

        cartaNueva.voltear();

        if (this.hayVolteada) {
            this.intentos++;
            document.getElementById("contador-intentos").innerText = `Intentos: ${this.intentos}`;
            if (cartaNueva.getValor() === this.cartaVolteada.getValor()) {
                cartaNueva.setEncontrada(true);
                this.cartaVolteada.setEncontrada(true);
                this.hayVolteada = false;
                this.paresEncontrados++;
                if (this.paresEncontrados === this.pares) {
                    clearInterval(this.timer);
                    this.mostrarMensaje("¡Ganaste!", "Has encontrado todos los pares en " + this.intentos + " intentos.", "#2ECC71");
                }
                return;
            } else {
                let carta1 = this.cartaVolteada;
                let carta2 = cartaNueva;
                this.hayVolteada = false;

                setTimeout(() => {
                    carta1.voltear();
                    carta2.voltear();
                }, 500);
            }
        } else {
            this.hayVolteada = true;
            this.cartaVolteada = cartaNueva;
        }
    }
    mostrarMensaje(titulo, mensaje, color) {
        let modal = document.createElement("div");
        modal.className = "modal-overlay";
        modal.innerHTML = `
            <div class="modal-content" style="border-color: ${color}">
                <h2 style="color: ${color}">${titulo}</h2>
                <p>${mensaje}</p>
                <button onclick="location.reload()">Reiniciar</button>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

const audio = document.getElementById("backgroundAudio");
const soundIcon = document.getElementById("sonido-audio");

document.addEventListener("DOMContentLoaded", () => {
    audio.play();
    soundIcon.classList.add("bi-volume-up");
});
soundIcon.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        soundIcon.classList.replace("bi-volume-mute", "bi-volume-up");
    } else {
        audio.pause();
        soundIcon.classList.replace("bi-volume-up", "bi-volume-mute");
    }
});

var dificultades = {"facil": 1, "medio": 2, "dificil": 3};
var dificultadElegida = dificultades[localStorage.getItem("dificultad")];
const contenedor = document.getElementById("game-container");
switch (dificultadElegida) {
    case 1:
        contenedor.style["gridTemplateColumns"] = "repeat(4, 1fr)";
        contenedor.style["gridTemplateRows"] = "repeat(3, auto)";
        break;
    
    case 2:
        contenedor.style["gridTemplateColumns"] = "repeat(5, 1fr)";
        contenedor.style["gridTemplateRows"] = "repeat(4, auto)";
        break;
    case 3:
        contenedor.style["gridTemplateColumns"] = "repeat(5, 1fr)";
        contenedor.style["gridTemplateRows"] = "repeat(4, auto)";
        break;
    default:
        break;
}

var memory = new Memory("username", dificultadElegida);
