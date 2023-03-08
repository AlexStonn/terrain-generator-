let cols, rows;
let scl;
let terrain= [];
let shape, colors;

function setup() {

  ww=windowWidth; hh= windowHeight;
  if(ww>=hh){ww=hh;} else{hh=ww;}
  createCanvas(ww,hh, WEBGL);
  angleMode(DEGREES);
  let w = ww;
  let h = hh
  scl = width/150;
  cols = w/scl;
  rows = h/scl;
  shape = int(random(3));
}

function draw() {
  background(30);
  stroke(60);
  strokeWeight(2);
  noFill();

  push();
  translate(width, -height/2);
  rotateY(180);
  let n = random(25, 45);
  for(var i = 0; i< cols; i++){
    var rd = random(1, 20);
    beginShape();
    for(var j = 0; j < width/n; j++){
      if(shape == 0) {vertex(i*n , j*30);}
      if(shape == 1 || shape == 2) {vertex(i*n , j*rd);}
  } endShape();

  if(shape ==1){
    push();
    noFill();
    stroke(random(60, 200));
    ellipse(i*n, j*rd, random(width/100, width/80));
    pop();
  }

  if(shape ==2){
    push();
    fill(random(60, 200));
    noStroke();
    ellipse(i*n, j*rd, random(width/100, width/80));
    pop();
   }
  }
  pop();

  push();
  stroke(255);
  strokeWeight(0.4)
  fill(80);

  let yoff = 0;
  for(var y = 0; y< rows; y++){
   let xoff = 0;
    terrain[y] = [];
    for(var x = 0; x< cols; x++){

      terrain[y][x] = map(noise(xoff, yoff), 0, height/1500, height/100, height/5);

      xoff += 0.03;
    }
    yoff += 0.03;
  }

  translate(-width/2, height/5);
  rotateX(60);
  for(let y = 0; y < rows-1; y++){
    beginShape(TESS);
    for(let x = 0; x < cols; x++){
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+2)*scl, terrain[x][y+2]);
    }
    endShape();
  }
  pop();
  noLoop();
}

function windowResized(){
  ww=windowWidth; hh= windowHeight;
  if(ww>=hh){ww=hh;} else{hh=ww;}
  createCanvas(ww,hh, WEBGL);
}
