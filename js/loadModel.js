let mobilenet;
let classifier;
let video;
let label = 'Loading Model';


function modelReady() {
  console.log('Model is ready!!!');
  classifier.load('../models/model.json', customModelReady);
}

function customModelReady() {
  console.log('Custom Model is ready!!!');
  label='Model Ready';
  classifier.classify(gotResults);
}


function videoReady() {
  console.log('Video is ready!!!');
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
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);
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