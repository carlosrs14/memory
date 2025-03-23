// dificultades
// 1 fácil,   tiempo ifinito, 6 pares,    4*3
// 2 medio,   tiempo 60,      10 pares,   5*4 
// 3 difícil, tiempo 30,      15 pares,   6*5
var dificultad = 3;
var banderas = ["🇲🇽","🇧🇷", "🇨🇴", "🇦🇷", "🇦🇽", "🇦🇲", "🇨🇦", "🇨🇳", "🇨🇱", "🇩🇰", "🇬🇹", "🇫🇷", "🇮🇳", "🇯🇵", "🇯🇲"]

class Carta {
    constructor(id, frente) {
        this.id = id;
        this.i = 0;
        this.oculto = false;
        this.valor = frente;
        this.frente = frente;
        this.dorsal = "❔";
        this.document;
    }
    setDocument(document) {
        this.document = document;
    }
    obtenerIcons() {
        id = banderas[i];
        i++
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
        if (this.oculto) {
            this.frente = "❔";
        } else {
            this.frente = this.valor;
        }
        this.document.innerHTML = `<p class="frente"> ${this.frente} </p>`;
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
        this.pares = this.filas * this.columnas / 2;
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
        if (this.tiempo == 0) {
            // auqí perdió y hay que hacer varias cosas
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
                this.filas = 5;
                this.columnas = 6;
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
        carta.addEventListener("click", ()=> {
            this.matriz[i][j].voltear();
            this.verficarIguales(this.matriz[i][j]);
        });
        let frente = document.createElement("p");

        frente.innerHTML  = "❔";
        frente.id = `fila${i}-columna${j}`;

        frente.className = "frente";
        
        this.matriz[i][j].setDocument(carta);
        carta.appendChild(frente);
        return carta;

    }
    mostrarMatriz() {
        for (let i = 0; i < this.filas; i++) {
            let fila = document.createElement("div");
            fila.className = "fila";
            for (let j = 0; j < this.columnas; j++) {
                
                let carta = this.createCarta(i, j);
                fila.appendChild(carta);  
    
            }
            this.documento.appendChild(fila);
        }
    }
    verficarIguales(cartaNueva) {
        if (this.hayVolteada) {
            if (cartaNueva.getValor() == this.cartaVolteada.getValor()) {
                // iguales 
                return;
            } else {
                // dif
                
                cartaNueva.voltear();
                this.cartaVolteada.voltear();
                this.hayVolteada = false;
            }
        } else {
            this.hayVolteada = true;
            this.cartaVolteada = cartaNueva;
        }
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


var memory = new Memory("username", 3);
