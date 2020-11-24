let video;
// For displaying the label
let label = "waiting...";
// The classifier
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/ykawHOnvf/';

//SNAKE
let snake;
let rez = 20;
let food;
let w;
let h;


// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}


function setup() {
  createCanvas(640, 520);
  video = createCapture(VIDEO);
  video.size(640, 520)
  video.hide();
  flipVideo = ml5.flipImage(video);

  classifyVideo();

  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(5);
  snake = new Snake();
  foodLocation();
}

function classifyVideo() {
  flipVideo = ml5.flipImage(video);
  classifier.classify(flipVideo, gotResults);
}

function foodLocation() {

  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function controlSnake() {

  if (label === "Left") {

    snake.setDir(-1, 0);

  } else if (label === "Right") {

    snake.setDir(1, 0);

  } else if (label === "Down") {

    snake.setDir(0, 1);

  } else if (label === "Up") {

    snake.setDir(0, -1);

  }

}

function draw() {
  background(0);

  // Draw the video
  image(flipVideo, 0, 0);

  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);

  scale(rez);

  if (snake.eat(food)) {

      foodLocation();
  }

  snake.update();
  snake.show();


  if (snake.endGame()) {

      print("END GAME");
      background(255, 0, 0);
      noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}


function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  controlSnake();
  classifyVideo();
}
