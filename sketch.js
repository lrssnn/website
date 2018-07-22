var W = 8000;
var H = 8000;
var G = 800;
var R = W / 2;

function setup(){
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  background(0, 0, 0);
  noFill();
  strokeWeight(1);
  stroke(0, 0, 255);
}

var colour = 0;
var t = 0;
var speed = 0.75;

function draw() {

  translate(width/2 , height/ 2);  scale(0.9);
  
  var last_t = t - speed;
  line(last_t*sin(last_t), last_t*cos(last_t), t * sin(t), t * cos(t))
  t += speed;
  speed = max(0, speed + (random() - 0.5)/100);

  if(t > 500){
    colour = (colour + 50) % 255;
    stroke(colour, 255, 255);
    t = 0;
  }
}