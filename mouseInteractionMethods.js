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