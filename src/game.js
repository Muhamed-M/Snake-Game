export default class Game {
	constructor(canvas) {
		this.width = 620;
		this.height = 620;
		this.grid = 30;
		this.cellSize = 600 / this.grid;
		this.speed = 7;
		this.score = 0;
		this.gameOver = false;
		this.running = false;

		canvas.width = this.width;
		canvas.height = this.height;
	}

	clearScreen(ctx) {
		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, this.width, this.height);
	}

	displayHomeScreen(ctx) {
		ctx.fillStyle = '#fff';
		ctx.font = '20px Consolas';
		ctx.textAlign = 'center';
		ctx.fillText(
			'press enter to start game...',
			this.width / 2,
			this.height / 2
		);
	}

	displayScore(ctx) {
		ctx.fillStyle = '#0f0';
		ctx.font = '18px consolas';
		ctx.textAlign = 'right';
		ctx.fillText(`SCORE: ${this.score}`, this.width - 10, 20);
	}

	displayGameOverScreen(ctx) {
		ctx.fillStyle = '#fff';
		ctx.font = '38px Consolas';
		ctx.textAlign = 'center';
		ctx.fillText('GAME OVER', this.width / 2, this.height / 2);
		ctx.font = '15px Consolas';
		ctx.fillText(
			'press enter to restart...',
			this.width / 2,
			this.height / 2 + 20
		);
	}
}
