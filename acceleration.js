let mover;

function setup() {
    createCanvas(640, 240);
    mover = new Mover();
}

function draw() {
    background(255);
    mover.update();
    mover.checkEdges();
    mover.show();
}

class Mover {
    constructor() {
        this.position = createVector(width / 2, height / 2);
        this.velocity = p5.Vector.random2D();
        this.perlinOffset = createVector(0, 1000);
        //this.acceleration = createVector(0, 0);
        this.acceleration = p5.Vector.random2D();
    }

    update() {        
        this.acceleration.add(createVector(
            map(noise(this.perlinOffset.x), 0, 1, -3, 3),
            map(noise(this.perlinOffset.y), 0, 1, -3, 3)
        ));
        //this.acceleration.mult(random(2));
        this.velocity.add(this.acceleration);
        this.velocity.limit(10);
        print(`velocity ${this.velocity}`);
        this.position.add(this.velocity);
        this.perlinOffset.add(1, 1);
    }

    show() {
        stroke(0);
        strokeWeight(2);
        fill(127);
        circle(this.position.x, this.position.y, 48);
    }

    checkEdges() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    step() {
        this.position = createVector(
            map(noise(this.velocity.x), 0, 1, 0, width),
            map(noise(this.velocity.y), 0, 1, 0, height)
        );
  
        this.velocity = this.velocity.add(0.01, 0.01);
    }
}

class PerlinStep {
    constructor() {
      this.velocity = createVector(0, 10000);
    }
  
    step() {
      this.position = createVector(
          map(noise(this.velocity.x), 0, 1, 0, width),
          map(noise(this.velocity.y), 0, 1, 0, height)
      );

      this.velocity = this.velocity.add(0.01, 0.01);
    }

    show() {
      stroke('orange');
      strokeWeight(1);
      ellipse(this.position.x, this.position.y, 16, 16);
    }
}