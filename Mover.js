class Mover {
    constructor(x, y, m, grav) {
        this.position = createVector(x, y);
        this.velocity = createVector();
        this.acceleration = createVector();
        this.topSpeed = 5;
        this.mass = m;
        this.radius = sqrt(this.mass) * 10;
        this.gravity = p5.Vector.mult(grav, this.mass);
    }
    
    applyForce(force) {
        this.acceleration.add(p5.Vector.div(force, this.mass));
    }
    
    show() {
        stroke(0);
        strokeWeight(2);
        fill(127, 127);
        circle(this.position.x, this.position.y, this.radius*2);
    }
    
    update() {
        if (this.contactEdge()) {
            //print(`Contact with edge!`);
            this.friction = this.velocity.copy();
            this.friction.mult(-1);
            this.friction.setMag(coefOfFriction);
            this.applyForce(this.friction);
        }
        
        this.weight = p5.Vector.mult(this.gravity, this.mass);

        this.applyForce(this.weight);

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    collision() {
        if (this.position.x >= (width - this.radius)) {
            this.velocity.x *= -1;
            this.position.x = width - this.radius;
        }
        if (this.position.x <= (0 + this.radius)) {
            this.velocity.x *= -1;
            this.position.x = 0 + this.radius;
        }
        if (this.position.y >= (height - this.radius)) {
            this.velocity.y *= -1;
            this.position.y = height - this.radius;
        }
        if (this.position.y <= (0 + this.radius)) {
            this.velocity.y *= -1;
            this.position.y = 0 + this.radius;
        }
    }

    contactEdge() {
        return (this.position.y > height - this.radius - 1);
    }

    bounceEdges() {
        let bounce = -0.5;

        if (this.position.y > height - this.radius - 1) {
            //this.position.y = height - this.radius;
            this.velocity.y *= bounce;
            //print(`Bounced!`);
        }
    }
}