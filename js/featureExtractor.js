let mobilenet;
let classifier;
let video;
let label = 'test';
let ukeButton;
let whistleButton;
let whistletButton;
let trainButton;
let config = {
    numLabels: 3
  };

function modelReady() {
  console.log('Model is ready!!!');
  console.log(mobilenet);
}

function videoReady() {
  console.log('Video is ready!!!');
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    // updated to work with newer version of ml5
    // label = result;
    label = result[0].label;
    classifier.classify(gotResults);
  }
}

function setup() {
  createCanvas(720, 670);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', config, modelReady);
  classifier = mobilenet.classification(video, videoReady);

  ukeButton = createButton('perro');
  ukeButton.mousePressed(function() {
    classifier.addImage('perro');
  });

  whistleButton = createButton('state 2');
  whistleButton.mousePressed(function() {
    classifier.addImage('State 2');
  });

  whistletButton = createButton('state 3');
  whistletButton.mousePressed(function() {
    classifier.addImage('State 3');
  });

  trainButton = createButton('train');
  trainButton.mousePressed(function() {
    classifier.train(whileTraining);
  });
}

function draw() {
  background(0);
  push();
  translate(width,0);
  scale(-1, 1);
  image(video, 0, 0, 720, 640);
  pop();
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
}