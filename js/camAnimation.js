// Global Vars
var x , y, alpha, lineWidth, lineLength;

let video, col, widthRatio, heightRatio, mobilenet, predictor, slider, addButton, trainButton;
let value = 0;

function modelReady() {
  console.log('Model is ready!!!');
}

function videoReady() {
  console.log('Video is ready!!!');
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    predictor.predict(gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    // value = result;
    value = result.value;
    predictor.predict(gotResults);
    console.log(result);
    slider.value(result);
  }
}

function animationStyle(value) {
  x = random(width*2);//Position X
  y = random(height*2);//Position Y

  //ML5 change value and modify attr
   
  lineWidth = value * random(0, 50);
  lineLength = value * random(0, 500);
  alpha = value * random(0, 100);//lineOpacity
  
  //Getting Animation
  for (var i = 0; i < lineLength; i++) {
    col = video.get(x * widthRatio, y *heightRatio); 
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

function setup() {

  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  background(255);

  //ML5
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  predictor = mobilenet.regression(video, videoReady);

  slider = createSlider(0, 1, 0.5, 0.01);

  addButton = createButton('add state');
  addButton.mousePressed(function() {
    predictor.addImage(slider.value());
  });

  

  trainButton = createButton('train');
  trainButton.mousePressed(function() {
    predictor.train(whileTraining);
  });
}


function draw() {

  //value = slider.value();
  
  image(video, 0, 0, 320, 240);

  video.loadPixels();
  widthRatio = video.width / width;
  heightRatio = video.height / height;

  animationStyle(value);
}






