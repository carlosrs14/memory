// dificultades
// 1 fácil,   tiempo ifinito, 6 pares,    4*3
// 2 medio,   tiempo 60,      10 pares,   5*4 
// 3 difícil, tiempo 30,      15 pares,   6*5
var dificultad = 3;


class Memory {
    constructor(username, dificultad) {
        this.dificultad = dificultad;
        this.user = username;
        this.tiempo = 0;
        this.filas = 0;
        this.columnas = 0;
        setTiempo();
        this.matriz =[];

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

    setTiempo() {
        switch (this.dificultad) {
            case 1:
                this.tiempo = 99999; // not time 
            case 2:
                this.tiempo = 60;
            case 3:
                this.tiempo = 30;
            default:
                this.tiempo = 0;
        }
    }

    llenarMatriz() {

    }
    
}


