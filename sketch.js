var W = 8000;
var H = 8000;
var G = 800;
var R = W / 2;

var lines = [];
var mem_index = 0;
var MAX_MEM = 10000;

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(0);
  noFill();
  strokeWeight(1);
  stroke(255);
  frameRate(-1);
}

var colour = 0;
var t = 0;
var speed = 0.75;

function draw() {

  background(0);
  fill(255);
  strokeWeight(0.1);
  text(mem_index, 0, 10);
  noFill();
  translate(width/2 , height/ 2);

  scale(500/t);


  var last_t = t - speed;
  var next_line = {
    x1 : last_t*sin(last_t),
    y1 : last_t*cos(last_t),
    x2 : t * sin(t),
    y2 : t * cos(t),
  };

  lines[mem_index] = next_line;
  mem_index = (mem_index + 1) % MAX_MEM;

  for(var i = 0; i < MAX_MEM; i++) {
    var m = (mem_index + i) % MAX_MEM;
    strokeWeight(i/MAX_MEM);
    var l = lines[m];
    if(l != undefined){
      line(l.x1, l.y1, l.x2, l.y2);
    }
  }

  // lines.forEach((l,index) => {
  //   if(l != null){
  //     strokeWeight(index/MAX_MEM)
  //     line(l.x1, l.y1, l.x2, l.y2);
  //   }
  // })
  
  t += speed;
  speed = max(0, speed + (random() - 0.5)/100);

}