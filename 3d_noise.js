let gap = 10;

function setup() {
    createCanvas(800, 800, WEBGL);
}

let zoff = 0;

function draw() {
    orbitControl();
    background("white");
    rotate(PI / 3);
    translate(-width * 0.5, -height * 0.5);

 
    for (let i = 0; i < 300; i += gap) {
        beginShape(TRIANGLE_STRIP);
        for (let j = 0; j < 300; j += gap) {


            let val1 = map(noise(i / 100, j / 100, frameCount / 100), 0, 1, 0, 200);
            let val2 = map(noise((i + gap) / 100, j / 100, frameCount / 100), 0, 1, 0, 200);
          

            vertex(i, j, val1);
            vertex(i + gap, j, val2);
        }
        endShape();
    }
}