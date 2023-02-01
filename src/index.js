import Game from './game.js';
import Fruit from './fruit.js';
import Snake from './snake.js';
const canvas = document.getElementsByTagName('CANVAS')[0];
const ctx = canvas.getContext('2d');
const game = new Game(canvas);
const snake = new Snake(game);
const fruit = new Fruit(game);
game.displayHomeScreen(ctx);

// SOUNDS
const eatingSound = document.getElementById('eating-sound');
const endSound = document.getElementById('end-sound');
const soundtrack1 = document.getElementById('soundtrack1');
soundtrack1.volume = 0.5;

// COLLISION DETECTION
function collisionCheck() {
	// COLLISION DETECTION BETWEEN FRUIT AND SNAKE
	if (
		snake.position.x == fruit.position.x &&
		snake.position.y == fruit.position.y
	) {
		fruit.position.x = Math.floor(Math.random() * game.cellSize);
		fruit.position.y = Math.floor(Math.random() * game.cellSize);
		snake.tailSize++;
		game.score++;
		eatingSound.play();

		// Increase speed and difficulty of the game
		if (game.score % 5 === 0) game.speed *= 1.25;
	}

	// COLLISION DETECTION BETWEEN SNAKE TAIL AND SNAKE HEAD
	snake.tail.forEach((t) => {
		if (
			snake.position.x == t.position.x &&
			snake.position.y == t.position.y
		) {
			game.gameOver = true;
		}
	});
}

function end() {
	if (game.gameOver) {
		cancelAnimationFrame(loopId);
		game.clearScreen(ctx);
		game.score = 0;
		game.running = false;
		game.speed = 7;
		snake.direction = snake.directions.STOP;
		snake.tail = [];
		snake.tailSize = 0;
		endSound.load();
		endSound.play();
		soundtrack1.pause();
		game.displayGameOverScreen(ctx);
	}
}

// GAME LOOP
let loopId,
	previousTime = 0;
function gameLoop(timestamp) {
	loopId = requestAnimationFrame(gameLoop);
	let dt = (timestamp - previousTime) / 1000;
	if (dt < 1 / game.speed) return;
	previousTime = timestamp;

	game.clearScreen(ctx);
	game.displayScore(ctx);
	fruit.draw(ctx);
	snake.moving(game);
	snake.draw(ctx, game);
	// check for collisions
	collisionCheck();
	snake.drawTail(ctx, game);
	// check for game over
	end();
}

// WHEN ENTER IS PRESSED START THE GAME
window.addEventListener('keydown', (e) => {
	if (e.keyCode === 13 && !game.running) {
		endSound.pause();
		soundtrack1.load();
		soundtrack1.play();
		snake.position.x = 10;
		snake.position.y = 10;
		snake.velocity.x = 1;
		snake.velocity.y = 1;
		game.gameOver = false;
		game.running = true;
		gameLoop();
	}
});
