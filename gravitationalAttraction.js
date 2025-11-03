let movers = [];
let attractors = [];

let coefOfFriction = 0.01;

const NUM_OF_MOVERS = 10;
const NUM_OF_ATTRACTORS = 2;

function setup() {
    createCanvas(640,480);
    for (let i = 0; i < NUM_OF_MOVERS; i++) {
      movers[i] = new Mover(random(width), random(height), random(0.5, 3), createVector(0,0));
    }

    for (let i = 0; i < NUM_OF_ATTRACTORS; i++) {
      attractors[i] = new Attractor();
    }
    //attractor = new Attractor();
    //saveGif('mySKetchGif', 1000, { units: "frames" })
}

function draw() {
  background(255);
  attractor.show();
  movers.forEach(mover => {
    let force = attractor.attract(mover);
    mover.applyForce(force);
    mover.bounceEdges();
    mover.collision();
    mover.update();
    mover.show();
  })
}

function mouseMoved() {
  attractor.handleHover(mouseX, mouseY);
}

function mousePressed() {
  attractor.handlePress(mouseX, mouseY);
}

function mouseDragged() {
  attractor.handleHover(mouseX, mouseY);
  attractor.handleDrag(mouseX, mouseY);
}

function mouseReleased() {
  attractor.stopDragging();
}

class Attractor {
  constructor() {
    this.position = createVector(random(0, width), random(0, height));
    this.mass = 20;
    this.G = 1;
    this.dragOffset = createVector(0, 0);
    this.dragging = false;
    this.dragging = false;
  }
  
  attract(mover) {
    let force = p5.Vector.sub(this.position, mover.position);
    let distance = force.mag();
    distance = constrain(distance, 5, 25);
    let strength = (this.G * this.mass * mover.mass) / (distance * distance);
    force.setMag(strength);
    
    return force;
  }
  
  show() {
    strokeWeight(4);
    stroke(0);
    if (this.dragging) {
      fill(50);
    } else if (this.rollover) {
      fill(100);
    } else {
      fill(175, 200);
    }
    circle(this.position.x, this.position.y, this.mass * 2);
  }

  handlePress(mx, my) {
    let d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.mass) {
      this.dragging = true;
      this.dragOffset.x = this.position.x - mx;
      this.dragOffset.y = this.position.y - my;
    }
  }

  handleHover(mx, my) {
    let d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.mass) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  stopDragging() {
    this.dragging = false;
  }

  handleDrag(mx, my) {
    if (this.dragging) {
      this.position.x = mx + this.dragOffset.x;
      this.position.y = my + this.dragOffset.y;
    }
  }
}