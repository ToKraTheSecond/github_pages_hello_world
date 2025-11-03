let wind;
let gravity;
let coefOfFriction;
let normalForce;
let frictionMag;

let movers = [];
let liquid;

function setup() {
    createCanvas(640, 480);
    background(255);

    wind = createVector(0.5, 0);
    gravity = createVector(0, 0.01);
    
    coefOfFriction = 0.01;
    normalForce = 1;
    frictionMag = coefOfFriction * normalForce;
    
    for (let i = 0; i < 9; i++) {
        let mass = random(0.1, 2);
        let gravity = createVector(0,1);
        movers[i] = new Mover(40 + i * 70, random(5, 30), mass, gravity);
    }
    liquid = new Liquid(0, height / 2, width, height / 2, 0.1);
}

function draw() {
    //print(`gravity: ${gravity}`);
    background(255);
    liquid.show();
    movers.forEach(mover => {
        if (liquid.contains(mover)) {
            let dragForce = liquid.calculateDrag(mover);
            print(`${dragForce}`);
            mover.applyForce(dragForce.limit(-2.0));
            //print(`In contact!`);
        }
        mover.applyForce(mover.gravity);
        mover.collision();
        mover.bounceEdges();
        mover.update();
        mover.show();
    })
}

class Liquid {
    constructor(x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c; // coefficient of drag
    }

    show() {
        noStroke();
        fill(175);
        rect(this.x, this.y, this.w, this.h);
    }

    contains(mover) {
        let pos = mover.position;

        return (pos.x > this.x && pos.x < this.x + this.w &&
                pos.y > this.y && pos.y < this.y + this.h);
    }

    calculateDrag(mover) {
        let speed = mover.velocity.mag();
        let dragMagnitude = this.c * speed * speed;
        let dragForce = mover.velocity.copy();
        dragForce.mult(-0.5);
        dragForce.setMag(dragMagnitude);

        return dragForce;
    }
}