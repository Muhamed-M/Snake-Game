export default class SnakePart {
	constructor(x, y, cellSize) {
		this.position = {
			x: x,
			y: y,
		};
		this.width = cellSize;
		this.height = cellSize;
		this.color = '#007665';
	}
}
