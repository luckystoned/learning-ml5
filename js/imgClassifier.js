// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let img;

function preload() {
  classifier = ml5.imageClassifier('MobileNet', modelReady);
  img = loadImage('../images/welle.jpeg');
}

function setup() {
  createCanvas(1000, 600);
  classifier.classify(img, gotResult);
  image(img, 0, 0);
  let div = createDiv('Loading Model...');
  div.addClass('loading');
}

function modelReady() {
  let div = createDiv('Model Ready!');
  div.addClass('loaded');
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