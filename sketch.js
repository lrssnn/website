var W = 8000;
var H = 8000;
var G = 800;
var R = W / 2;

function setup(){
  createCanvas(800, 800);
  background(0);
  fill(255);
}

var points = 0;
var hits   = 0;

var MEM = 1000;
var pix_per_point = G / (MEM - 1);
var full_scale = 0;
var diffs = new Array(MEM);


function draw() {
  stroke(0);
  ellipse(width/2, height/2, 100, 100);
  //translate(R, R);
  // Drop 100 point on the thing
  for(var i = 0; i < 1000000; i++){
    points += 1;
    var x = random(-R, R);
    var y = random(-R, R);
    if((y*y + x*x) < R*R) {
      // Outside
      hits += 1;
      //stroke(100, 200, 100, 20);
      //point((float)x, (float)y);
    } else {
      //stroke(200, 100, 100, 20);
      //point((float)x, (float)y);
    }
  }

  var pi = 4 * (hits/points);
  var diff = Math.PI - pi;
  console.log(frameRate() + " | " + Math.floor(Math.abs(Math.log10(Math.abs(diff)))) + " (" + pi + ")");
  full_scale = 0;
  for(var i = 0; i < MEM - 1; i++){
    diffs[i] = diffs[i+1];
    if(diffs[i] == 0) continue;
    var cand = pow(10, 1 + floor(log(abs(diffs[i]))/log(10)));
    //float cand = abs((float)diffs[i]);
    if (cand > full_scale) {
      //println(full_scale + " -> " + cand);
      full_scale = cand;
    }
  }
  diffs[MEM-1] = diff;

  //for(int i = 0; i < MEM; i++){
  //  print(diffs[i] + ", ");
  //}
  //println();

  // Draw the differences
  fill(255);
  // Make (0, 0) the 0 point of the graph on the left side
  translate(0, G/2);
  rect(0, -G/2, G, G);
  stroke(0);
  noFill();
  line(0, 0, G, 0);
  stroke(200, 50, 50, 100);
  line(0, y_from_d(full_scale/10), G, y_from_d(full_scale/10));
  line(0, -y_from_d(full_scale/10), G, -y_from_d(full_scale/10));
  stroke(100, 100, 200);
  point(0, y_from_d(diffs[0]));
  for(var i = 1; i < MEM; i++) {
    var x1 = x_from_i(i - 1);
    var y1 = y_from_d(diffs[i-1]);
    var x2 = x_from_i(i);
    var y2 = y_from_d(diffs[i]);
    //println("(" + x1 + "," + y1 +") -> (" + x2 + "," + y2 + ")");
    line(x1, y1, x2, y2);
  }
}

function x_from_i(i) {
  return pix_per_point * i;
}

function y_from_d(d){
  //return min(G/2, max(-G/2,(float)d / full_scale));
  return (d / (full_scale)) * G/2;
}
