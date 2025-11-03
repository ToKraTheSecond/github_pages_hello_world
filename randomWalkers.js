class RandomWalker {
    constructor() {
    
    this.position.x = width / 2;
    this.position.y = height / 2;
    }
    
    show() {
      stroke('orange');
      strokeWeight(1);
      point(this.position.x, this.position.y);
    }

    step() {
        let velocity = createVector(
            random(-1, 1),
            random(-1, 1)
        );
        this.position = this.position.add(velocity);
      }

    stepRightTrend() {
        let r = random(1);
        if(r < 0.4) {
            this.position.x++;
        } else if (r < 0.6) {
            this.position.x--;
        } else if (r < 0.8) {
            this.position.y++;
        } else {
            this.position.y--;
        }
    }

    stepGaussian() {
        // exercise 0.5
        let velocity = createVector(
            randomGaussian(0, 1),
            randomGaussian(0, 1)
        );
        this.position = this.position.add(velocity)
    }
    
    stepAcceptReject() {
        function acceptreject() {
            while (true) {
                let r1 = random(-1, 1);
                let probability = r1;
                let r2 = random(-1, 1);
                if (r2 < probability) {
                    return r1;
                }
            }
        }
        let velocity = createVector(
            acceptreject(),
            acceptreject()
        )
        this.position = this.position.add(velocity);
    }
}

class PerlinWalker {
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

let walker;

function setup() {
    createCanvas(640, 240);
    walker = new PerlinWalker();
    background(255);
}

function draw() {
    walker.step();
    walker.show();
}