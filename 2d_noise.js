function setup() {
    createCanvas(640, 240);
}

let zoff = 0;

function draw() {
    loadPixels();
    let xoff = 0.0;
    for (let x = 0; x < width; x++) {
        let yoff = 0.0;
        for (let y = 0; y < height; y++) {
            let index = (x + y * width) * 4;

            noiseDetail(18);
            let bright = map(noise(xoff, yoff, zoff), 0, 1, 0, 255);

            pixels[index + 0] = bright; // red
            pixels[index + 1] = bright; // blue
            pixels[index + 2] = bright; // green
            pixels[index + 3] = 200; // alpha

            yoff += 0.01;
        }

        xoff += 0.01;
    }
    updatePixels();
    zoff += 0.01;
}