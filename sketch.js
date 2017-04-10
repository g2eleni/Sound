function setup() {
  
}

function draw() {
  
}// The midi notes of a scale
//var notes = [ 60, 61, 63, 64, 65, 66];
var notes = [ 55, 57, 59, 60, 55, 57, 55, 57, 60, 64, 62, 60];

// For automatically playing the song
var index = 0;
var song = [
  { note: 0, duration: 200, display: "G" },
  { note: 1, duration: 200, display: "A" },
  { note: 2, duration: 200, display: "B" },
  { note: 3, duration: 200, display: "C" },
  { note: 4, duration: 200, display: "G" },
  { note: 5, duration: 200, display: "A" },
  { note: 6, duration: 200, display: "G" },
  { note: 7, duration: 200, display: "A" },
  { note: 8, duration: 200, display: "C" },
  { note: 9, duration: 200, display: "E" },
  { note: 10, duration: 200, display: "D" },
  { note: 11, duration: 200, display: "C" }
];
var trigger = 0;
var autoplay = false;
var osc;

function setup() {
  createCanvas(windowWidth, windowHeight);
  var div = createDiv("Click to play notes or ")
  div.id("instructions");
  var button = createA("#","play song automatically.");
  button.parent("instructions");
  // Trigger automatically playing
  button.mousePressed(function() {
    if (!autoplay) {
      index = 0;
      autoplay = true;
    }
  });

  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
}

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);

  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}

function draw() {
  background(240);
  
  noStroke();

/*
  // If we are autoplaying and it's time for the next note
  if (autoplay && millis() > trigger){
    playNote(notes[song[index].note], song[index].duration);
    trigger = millis() + song[index].duration;
    // Move to the next note
    index ++;
  // We're at the end, stop autoplaying.
  } else if (index >= song.length) {
    autoplay = false;
  }
  
  */
  


  // Draw a keyboard

  // The width for each key
  var w = width / notes.length;
  for (var i = 0; i < notes.length; i++) {
    var x = i * w;
    // If the mouse is over the key
    if (mouseX > x && mouseX < x + w && mouseY < height) {
      // If we're clicking
      if (mouseIsPressed) {
        fill(124, 91, 42);
      // Or just rolling over
      } else {
        fill(175, 142, 91);
      }
    } else {
      fill(247, 228, 200);
    }

    // Or if we're playing the song, let's highlight it too
    if (autoplay && i === song[index-1].note) {
      fill(100,255,200);
    }

    // Draw the key
    
    ellipse(x+50, 100, 100, 100);
    fill(255);
    rect(x+25, 90, 40, 40);
    fill(124, 91, 42);
    ellipse(x+45, 90, 40, 10);
    stroke(255);
    noFill();
    strokeWeight(4);
    ellipse(x+60, 110, 40, 20);
    
  
  
    
    //ellipse(x, 0, w-1, height-1);
    
  
  }

}

// When we click
function mousePressed() {
  // Map mouse to the key index
  var key = floor(map(mouseX, 0, width, 0, notes.length));
  playNote(notes[key]);
}

// Fade it out when we release
function mouseReleased() {
  osc.fade(0,0.5);
}
