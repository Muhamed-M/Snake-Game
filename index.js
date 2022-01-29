import Game from './game.js';
import Fruit from './fruit.js';
const canvas = document.getElementsByTagName('CANVAS')[0];
const ctx = canvas.getContext('2d');
const game = new Game(canvas);

// SOUNDS
const eatingSound = document.getElementById('eating-sound');
const endSound = document.getElementById('end-sound');
const soundtrack1 = document.getElementById('soundtrack1');
soundtrack1.volume = 0.5;

// SCORE
let score = 0;
function drawScore() {
    ctx.fillStyle = '#0f0';
    ctx.font = '18px consolas';
    ctx.textAlign = 'right';
    ctx.fillText(`REZULTAT: ${score}`, game.width - 10, 20);
}

function clearScreen() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, game.width, game.height);
}

// INPUT HANDLING
const dir = {
    RIGHT: 'right',
    LEFT: 'left',
    UP: 'up',
    DOWN: 'down',
    STOP: 'stop'
};
let moving;
window.addEventListener('keydown', e => {
    switch (e.keyCode) {
        case 68:
            if (moving != dir.LEFT) moving = dir.RIGHT;
            break;
        case 65:
            if (moving != dir.RIGHT) moving = dir.LEFT;
            break;
        case 87:
            if (moving != dir.DOWN) moving = dir.UP;
            break;
        case 83:
            if (moving != dir.UP) moving = dir.DOWN;
            break;
    }
});

class Snake {
    constructor() {
        this.position = {
            x: 10,
            y: 10
        };
        this.velocity = {
            x: 1,
            y: 1
        };
        this.width = game.cellSize;
        this.height = game.cellSize;
        this.color = '#f54265';

        // TAIL
        this.tail = [];
        this.tailSize = 0;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x * game.grid, this.position.y * game.grid, this.width, this.height);
    }

    drawTail() {
        ctx.fillStyle = '#ffee00';
        for (let i = 0; i < this.tail.length; i++) {
            let part = this.tail[i];
            ctx.fillRect(part.position.x * game.grid, part.position.y * game.grid, 20, 20);
        }
        
        this.tail.push(new SnakeTail(this.position.x, this.position.y));
        if (this.tail.length > this.tailSize) this.tail.shift();
    }

    moving(moving) {
        switch (moving) {
            case dir.RIGHT:
                this.moveRight();
                break;
            case dir.LEFT:
                this.moveLeft();
                break;
            case dir.UP:
                this.moveUp();
                break;
            case dir.DOWN:
                this.moveDown();
                break;
        }

        if (this.position.x * game.grid > game.cellSize * game.grid) game.gameOver = true;// this.position.x = 0;
        if (this.position.x * game.grid < 0) game.gameOver = true; // this.position.x = game.cellSize;
        if (this.position.y * game.grid > game.cellSize * game.grid) game.gameOver = true; // this.position.y = 0;
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

class SnakeTail {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y
        };
        this.width = game.cellSize;
        this.height = game.cellSize;
        this.color = '#007665';
    }
}

const snake = new Snake();
const fruit = new Fruit(game);

// COLLISION DETECTION
function collision() {
    // COLLISION DETECTION BETWEEN FRUIT AND SNAKE
    if (snake.position.x == fruit.position.x && snake.position.y == fruit.position.y) {
        fruit.position.x = Math.floor(Math.random() * game.cellSize);
        fruit.position.y = Math.floor(Math.random() * game.cellSize);
        snake.tailSize++;
        score++;
        eatingSound.play();
    }
    
    // COLLISION DETECTION BETWEEN SNAKE TAIL AND SNAKE HEAD
    snake.tail.forEach((t) => {
        if (snake.position.x == t.position.x && snake.position.y == t.position.y) {
            game.gameOver = true;
        }
    });
}

function start() {
    ctx.fillStyle = '#fff';
    ctx.font = '20px Consolas';
    ctx.textAlign = 'center';
    ctx.fillText('press enter to start game...', game.width / 2, game.height / 2);
}
start();

function end() {
    if (game.gameOver) {
        cancelAnimationFrame(loopId);
        clearScreen();
        score = 0;
        game.running = false;
        moving = dir.STOP;

        ctx.fillStyle = '#fff';
        ctx.font = '38px Consolas';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', game.width / 2, game.height / 2);
        ctx.font = '15px Consolas';
        ctx.fillText('press enter to restart...', game.width / 2, game.height / 2 + 20);
        endSound.load();
        endSound.play();
        soundtrack1.pause();

        snake.tail = [];
        snake.tailSize = 0;
    }
}

// GAME LOOP
let loopId, previousTime = 0;
function gameLoop(timestamp) {
    loopId = requestAnimationFrame(gameLoop);
    let dt = (timestamp - previousTime) / 1000;
    if (dt < 1 / game.speed) return;
    previousTime = timestamp;

    clearScreen();
    drawScore();

    fruit.draw(ctx);

    snake.moving(moving);
    snake.draw();

    collision();
    snake.drawTail();

    end();
}

// START
window.addEventListener('keydown', (e) => {
    if (e.keyCode === 13 && !game.running) {
        endSound.pause();
        soundtrack1.load();
        //soundtrack1.play();
        snake.position.x = 10;
        snake.position.y = 10;
        snake.velocity.x = 1;
        snake.velocity.y = 1;
        game.gameOver = false;
        gameLoop();
        game.running = true;
    }
});