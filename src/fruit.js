export default class Fruit {
    constructor(game) {
        this.position = {
            x: Math.floor(Math.random() * game.cellSize),
            y: Math.floor(Math.random() * game.cellSize)
        }
        this.width = game.cellSize;
        this.height = game.cellSize;
        this.color = '#45ff67';

        this.game = game;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x * this.game.grid, this.position.y * this.game.grid, this.width, this.height);
    }
}