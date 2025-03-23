// dificultades
// 1 fácil,   tiempo ifinito, 6 pares,    4*3
// 2 medio,   tiempo 60,      10 pares,   5*4 
// 3 difícil, tiempo 30,      15 pares,   6*5
var dificultad = 3;
var cartas = ["🇲🇽","🇧🇷", "🇨🇴", "🇦🇷", "🇦🇽", "🇦🇲", "🇨🇦", "🇨🇳", "🇨🇱", "🇩🇰", "🇬🇹", "🇫🇷", "🇮🇳", "🇯🇵", "🇯🇲"]
              
class Memory {
    constructor(username, dificultad) {
        this.dificultad = dificultad;
        this.user = username;
        this.tiempo = 0;
        this.filas = 0;
        this.columnas = 0;
        
        this.matriz =[];
        this.setAtributtes();
        this.pares = this.filas * this.columnas / 2;
        this.llenarMatriz();
    }
    
    startGame() {
        this.startTimer();
    
    }

    startTimer() {
        setInterval(restTime() , 1000);

    }
    
    restTime() {
        this.tiempo--;
    }

    setAtributtes() {
        switch (this.dificultad) {
            case 1:
                this.filas = 3;
                this.columnas = 4;
                this.tiempo = 99999; // not time 
                break;
            case 2:
                this.filas = 4;
                this.columnas = 5;
                this.tiempo = 60;
                break;
            case 3:
                this.filas = 5;
                this.columnas = 6;
                this.tiempo = 30;
                break;
            default:
                this.filas = 3;
                this.columnas = 4;
                this.tiempo = 0;
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
            cartasAElegir.push(new Carta(counter++, "frente"));
            cartasAElegir.push(new Carta(counter++, "frente"));           
        }
        for (let index = 0; index < this.filas; index++) {
            this.matriz.push([]);
            for (let columnas = 0; columnas < this.columnas; columnas++) {
                let posicion = Math.random() * cartasAElegir.length;
                let carta = cartasAElegir[posicion];
                this.matriz[index].push(carta);
                cartasAElegir.splice(posicion, 1);
            }
        }
    }
}

class Carta {
    constructor(id, frente) {
        this.id = id;
        this.i = 0;
        this.frente = frente;
        this.dorsal = "❔";
    }
    obtenerIcons() {
        id = cartas[i];
        i++
    }
    getId() {
        return this.id;
    }
    toString() {
        return `carta ${this.id}`;
    }

}

function verificarIguales() {

}

function mostrarMatriz(div , memory) {
    
    for (let i = 0; i < memory.getFilas(); i++) {
        let fila = document.createElement("div");
        for (let j = 0; j < memory.getColumnas(); j++) {
            let carta = document.createElement("div");
            carta.className = "carta";
            let frente = document.createElement("p");
            let dorsal = document.createElement("p");
            
            frente.textContent = `${1}`;
            frente.
            frente.id = "1";
            frente.className = "frente";

            dorsal.textContent = "❔";
            dorsal.className = "dorsal";
            
            carta.appendChild(dorsal);
            carta.appendChild(frente);

            fila.appendChild(carta)            

        }
        div.appendChild(fila);
    }
}

var memory = new Memory("username", 2);
const contenedor = document.getElementById("game-container");

mostrarMatriz(contenedor, memory);

document.addEventListener();