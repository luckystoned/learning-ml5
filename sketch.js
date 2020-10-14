/* ===
ml5 Example
Image classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let img;

function preload() {
  classifier = ml5.imageClassifier('MobileNet', modelReady);
  img = loadImage('images/welle.jpeg');
}

function setup() {
  createCanvas(400, 400);
  classifier.classify(img, gotResult);
  image(img, 0, 0);
}

function modelReady() {
    console.log('model is ready!')
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  console.log(results);

  results.forEach(result => {
      createDiv('Label: ' + result.label);
      createDiv('Confidence: ' + nf(result.confidence, 0, 2));
  });
}