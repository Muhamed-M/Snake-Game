export default class Game {
    constructor(canvas) {
        this.width = 620;
        this.height = 620;
        this.grid = 30;
        this.cellSize = 600 / this.grid;
        this.speed = 7;
        this.gameOver = false;
        this.running = false;
        
        canvas.width = this.width;
        canvas.height = this.height;
    }
}
