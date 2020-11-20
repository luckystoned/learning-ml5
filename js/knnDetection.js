// KNN Classification
let video;
let features;
let knn;
let labelP;
let ready = false;
let x;
let y;
let label = 'nothing';

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);
  features = ml5.featureExtractor('MobileNet', modelReady);
  knn = ml5.KNNClassifier();
  labelP = createP('need training data');
  labelP.style('font-size', '32pt');
  x = width / 2;
  y = height / 2;
}

function goClassify() {
  const logits = features.infer(video);
  knn.classify(logits, function(error, result) {
    if (error) {
      console.error(error);
    } else {
      //console.log(result)
      label = result.label;
      labelP.html(result.label);
      goClassify();
    }
  });
}

function keyPressed() {
  const logits = features.infer(video);
  if (key == 'l') {
    knn.addExample(logits, 'left');
    console.log('left');
  } else if (key == 'r') {
    knn.addExample(logits, 'right');
    console.log('right');
  } else if (key == 'u') {
    knn.addExample(logits, 'up');
    console.log('up');
  } else if (key == 'd') {
    knn.addExample(logits, 'down');
    console.log('down');
  } else if (key == 's') {
    //save(knn, 'model.json');
    knn.save('knnModel.json');
  }
}

function modelReady() {
  console.log('model ready!');
  // Comment back in to load your own model!
  knn.load('../models/knnModel.json', function() {
    console.log('knn loaded');
  });
}

function draw() {
  background(0);
  fill(255);
  ellipse(x, y, 24);

  if (label == '0') {
    x--;
  } else if (label == '1') {
    x++;
  } else if (label == '2') {
    y--;
  } else if (label == '3') {
    y++;
  }

  //image(video, 0, 0);
  if (!ready && knn.getNumLabels() > 0) {
    goClassify();
    ready = true;
  }
}

