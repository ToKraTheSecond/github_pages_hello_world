let ball;
let radius = 20;
let boxSize = 400;

function setup() {
    createCanvas(600, 600, WEBGL);
    ball = new Ball();
}


function draw() {
    background(250);
    orbitControl(); // enable orbiting with the mouse
    rotateX(PI / 6);
    rotateY(PI / 6);
    noFill();
    stroke(0);
    box(boxSize);
    
    ball.update();
    ball.display();
}

class Ball {
    constructor() {
        this.position = createVector(0, 0, 0);
        this.velocity = createVector(2, 3, 4);
        this.radius = radius;
    }

    update() {
        this.position.add(this.velocity);

        if (abs(this.position.x) > boxSize / 2 - this.radius) {
            this.velocity.x = this.velocity.x * -1;
        }
        if (abs(this.position.y) > boxSize / 2 - this.radius) {
            this.velocity.y = this.velocity.y * -1;
        }
        if (abs(this.position.y) > boxSize / 2 - this.radius) {
            this.velocity.z = this.velocity.z * -1;
        }
    }

    display() {
        push();
        translate(this.position.x, this.position.y, this.position.z);
        noStroke();
        fill(255, 0, 0);
        sphere(this.radius);
        pop();
    }
}
