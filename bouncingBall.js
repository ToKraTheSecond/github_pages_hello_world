let position;
let velocity;

function setup() {
    createCanvas(640, 240);
    position = createVector(100, 100);
    velocity = createVector(2.5, 2);
}

function draw() {
    background(255);

    position = position.add(velocity);

    if (position.x > width || position.x < 0) {
        velocity.x = velocity.x * -1;
    }
    if (position.y > height || position.y < 0) {
        velocity.y = velocity.y * -1;
    }

    stroke(0);
    fill(127);
    circle(position.x, position.y, 48);
}