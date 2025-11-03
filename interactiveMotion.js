let mover;

function setup() {
    createCanvas(1640, 1200);
    mover = new InteractiveMover();
    background(255);
}

function draw() {
    mover.show();
    mover.update();
}

class InteractiveMover {
    constructor() {
        this.position = createVector(width / 2, height / 2);
        this.velocity = createVector(0, 0);
        this.topSpeed = 2;
    }

    show() {
        stroke(0);
        fill(127);
        circle(this.position.x, this.position.y, 48);
    }

    update() {
        let mouse = createVector(mouseX, mouseY);
        let dir = p5.Vector.sub(mouse, this.position);
        dir.normalize();
        dir.mult(0.2);
        this.acceleration = dir;
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topSpeed);
        this.position.add(this.velocity);
    }
}