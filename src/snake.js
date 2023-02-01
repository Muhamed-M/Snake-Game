import SnakePart from './snakePart.js';

export default class Snake {
	constructor(game) {
		this.position = {
			x: 10,
			y: 10,
		};
		this.velocity = {
			x: 1,
			y: 1,
		};
		this.width = game.cellSize;
		this.height = game.cellSize;
		this.color = '#f54265';
		// Possible directions
		this.directions = {
			RIGHT: 'right',
			LEFT: 'left',
			UP: 'up',
			DOWN: 'down',
			STOP: 'stop',
		};
		this.direction = this.directions.STOP;
		// TAIL
		this.tail = [];
		this.tailSize = 0;

		// INPUT HANDLING
		window.addEventListener('keydown', (e) => {
			switch (e.keyCode) {
				case 68:
					if (this.direction != this.directions.LEFT)
						this.direction = this.directions.RIGHT;
					break;
				case 65:
					if (this.direction != this.directions.RIGHT)
						this.direction = this.directions.LEFT;
					break;
				case 87:
					if (this.direction != this.directions.DOWN)
						this.direction = this.directions.UP;
					break;
				case 83:
					if (this.direction != this.directions.UP)
						this.direction = this.directions.DOWN;
					break;
			}
		});
	}

	draw(ctx, game) {
		ctx.fillStyle = this.color;
		ctx.fillRect(
			this.position.x * game.grid,
			this.position.y * game.grid,
			this.width,
			this.height
		);
	}

	drawTail(ctx, game) {
		ctx.fillStyle = '#ffee00';
		for (let i = 0; i < this.tail.length; i++) {
			let part = this.tail[i];
			ctx.fillRect(
				part.position.x * game.grid,
				part.position.y * game.grid,
				20,
				20
			);
		}

		this.tail.push(
			new SnakePart(this.position.x, this.position.y, game.cellSize)
		);
		if (this.tail.length > this.tailSize) this.tail.shift();
	}

	moving(game) {
		switch (this.direction) {
			case this.directions.RIGHT:
				this.moveRight();
				break;
			case this.directions.LEFT:
				this.moveLeft();
				break;
			case this.directions.UP:
				this.moveUp();
				break;
			case this.directions.DOWN:
				this.moveDown();
		}

		if (this.position.x * game.grid > game.cellSize * game.grid)
			game.gameOver = true; // this.position.x = 0;
		if (this.position.x * game.grid < 0) game.gameOver = true; // this.position.x = game.cellSize;
		if (this.position.y * game.grid > game.cellSize * game.grid)
			game.gameOver = true; // this.position.y = 0;
		if (this.position.y * game.grid < 0) game.gameOver = true; // this.position.y = game.cellSize;
	}

	moveRight() {
		this.position.x += this.velocity.x;
	}

	moveLeft() {
		this.position.x += -this.velocity.x;
	}

	moveUp() {
		this.position.y += -this.velocity.y;
	}

	moveDown() {
		this.position.y += this.velocity.y;
	}
}
