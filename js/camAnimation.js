// Global Vars
var alpha, lineWidth, lineLength;
let video;

function setup() {

  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  video = creatCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  //background(0);

}

function draw() {

  video.loadPixels();
  let widthRatio = video.width / width;
  let heightRatio = video.height / height;

  var x = random(width*2);//Position X
  var y = random(height*2);//Position Y
  lineWidth = random(0, 5);
  lineLength = random(0, 2000);
  alpha = random(0, 30);
  
  //Getting Animation
  for (var i = 0; i < lineLength; i++) {
    let col = video.get(x * widthRatio, y *heightRatio); 
    stroke(col);
    strokeWeight(0.1);
    strokeCap(ROUND);
    fill(red(col), green(col), blue(col), alpha); 
    ellipse(x, y, lineWidth);//Draw
    
    //Change Position of draw
    x += 5 * (noise(x/100, y/100, i/100) - 0.5);
    y += 5 * (noise(y/100, i/100, x/100) - 0.5);
  }

}


