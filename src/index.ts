type Vector = [x: number, y: number];

interface Point {
    position: Vector;
    size: number;
}
interface Movable {
    direction: Vector;
    move: (dt: number, boundary: Vector) => void;
}

class Particle implements Movable, Point {
    direction: Vector;
    position: Vector;
    size: number;
    constructor(position: Vector, direction: Vector, size: number) {
        this.position = position;
        this.direction = direction;
        this.size = size;
    }

    move(dt: number, [maxX, maxY]: Vector) {
        const [x, y] = this.position;
        let [dx, dy] = this.direction;

        const nextX = x + dx * dt;
        const nextY = y + dy * dt;

        this.position = [nextX, nextY];

        if (maxX - nextX <= this.size || nextX <= this.size ) {
            dx = -dx;
        }

        if (maxY - nextY <= this.size || nextY <= this.size ) {
            dy = -dy;
        }

        this.direction = [dx, dy];
    };
}

const renderPoint = (ctx: CanvasRenderingContext2D, [x, y] : Vector, size: number, color: string) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
}

const iterate = (particle: Particle, ctx: CanvasRenderingContext2D, boundary: Vector ) => {
    renderPoint(ctx, particle.position, particle.size + 1, '#1a1b33')
    particle.move(1, boundary)
    renderPoint(ctx, particle.position, particle.size, 'rgba(255, 255, 255, 0.5)')
}

(() => {
    const canvas = document.getElementById('canvas-field') as HTMLCanvasElement;

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    if (!canvas) {
        return;
    }

    const context = canvas.getContext('2d');

    const particle = new Particle([100, 100], [2, 1], 10);
    const particle2 = new Particle([400, 300], [1, 4], 10);

    window.setInterval(iterate,5, particle, context, [innerWidth, innerHeight])
    window.setInterval(iterate,5, particle2, context, [innerWidth, innerHeight])

})()