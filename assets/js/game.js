// ╔══════════════════════════════════╗
// ║ JS13K template by @CarelessLabs  ║
// ╚══════════════════════════════════╝

// Reference for new atlas
let canvasW = window.innerWidth;
let canvasH = window.innerHeight;
let gameStarted = false;
let delta = 0.0;
let prevDelta = Date.now();
let currentDelta = Date.now();
let TIME = 0;
let mousePos = new vec2(0,0);
let clickedAt = new vec2(0,0);
let clickedRec = new rectanlge(0,0,0,0);
let processClick = false;
let GAMEOVER=false;
let RELOAD=false;
let WIN = false;
let STAGE=0;
let atlas = new Image();
atlas.src = "atlas.png";
let cart = new Cart();
let start=false;
let music=true;
let pause=false;
let leftMB=false;
let rightMB=false;
let startDelay=0.1;
let zoom=4;

var nativeWidth = 800;  // The resolution the game is designed to look best in
var nativeHeight = 600;
var deviceWidth = window.innerWidth;  // Check for browser compatibility
var deviceHeight = window.innerHeight;

var scaleFillNative = Math.max(deviceWidth / nativeWidth, deviceHeight / nativeHeight);

// Load the music player
// genAudio();

// Called by body onload on index page
function startGame() {
  mg.start();
  resizeCanvas(this.ctx);
}

let mg = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = nativeWidth * scaleFillNative;
    this.canvas.height = nativeHeight * scaleFillNative;
    this.context = this.canvas.getContext("2d");
    this.context.scale(1, 1);
    this.context.setTransform(scaleFillNative, 0, 0, scaleFillNative, 0, 0);

    // PixelArt Sharp
    ctx=this.context;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    this.canvas.classList.add("screen");
    document.body.insertBefore(this.canvas, document.body.childNodes[6]);
    // Run the game loop
    this.frameId = requestAnimationFrame(updateGameLoop);

    // Keyboard
    window.addEventListener('keydown', function(e) {
      if(startDelay<=0)start=true;
      e.preventDefault();
      mg.keys = (mg.keys || []);
      mg.keys[e.keyCode] = (e.type == "keydown");
    })
    window.addEventListener('keyup', function(e) {
      mg.keys[e.keyCode] = (e.type == "keydown");
      if(e.keyCode==R) RELOAD=true;
      if(e.keyCode==M) pause=!pause;
      if(e.keyCode==T) cart.tips=!cart.tips;
    })
    window.addEventListener('mouseup', function(e) {
      e.preventDefault();
      setclicks();
      processClick=true;

      if (e.button === 0) {
        leftMB=false;
      } else if (e.button === 2) {
        rightMB=false;
      }
    })
    window.addEventListener('mousedown', function(e) {
      e.preventDefault();
      if (e.button === 0) {
        leftMB=true;
      } else if (e.button === 2) {
        rightMB=true;
      }
    })
    // Add an event listener for window resize.
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', function(e) {
      e.preventDefault();
      var r = mg.canvas.getBoundingClientRect();
      mousePos.set((e.clientX - r.left) / (r.right - r.left) * canvasW,
                   (e.clientY - r.top) / (r.bottom - r.top) * canvasH);
    })
    // Disable right click context menu
    this.canvas.oncontextmenu = function(e) {
      e.preventDefault();
    };
  },
  stop: function() {
    if (mg.frameId) {
      cancelAnimationFrame(mg.frameId);
      // Reset the frameId
      mg.frameId = null;
    }
  },
  clear: function() {
    this.context.clearRect(0, 0, 4*this.canvas.width, 4*this.canvas.height);
  }
}

let lastTimestamp = null;
function updateGameLoop(timestamp) {
  if (!lastTimestamp) lastTimestamp = timestamp;

  // Calculate the delta time (in seconds)
  let deltaTime = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  // Update the game state and render
  updateGameArea(deltaTime);

  // Request the next frame
  mg.frameId = requestAnimationFrame(updateGameLoop);
}

function updateGameArea(delta) {
  if(GAMEOVER){
    TIME=0;
    GAMEOVER=false;
    WIN=false;
    STAGE=0;
    start=false;
    gameStarted=false;
    startDelay=3;
  }

  if(start) gameStarted=true;
  if(startDelay>0)startDelay-=delta;
  cart.update(delta, gameStarted);

  // Reset Click to false
  // If it is still true on the next loop could cause an unexpected action
  processClick=false;
}

function left() {
  return mg.keys && (mg.keys[LEFT] || mg.keys[A]);
}

function right() {
  return mg.keys && (mg.keys[RIGHT] || mg.keys[D]);
}

function up() {
  return mg.keys && (mg.keys[UP] || mg.keys[W]);
}

function down() {
  return mg.keys && (mg.keys[DOWN] || mg.keys[S]);
}

function space() {
  return (mg.keys && mg.keys[SPACE]) || leftMB;
}

function shift() {
  return (mg.keys && mg.keys[SHIFT]) || rightMB;
}

function map() {
  return mg.keys && mg.keys[M];
}

function one() {
  return mg.keys && (mg.keys[ONE]);
}

function two() {
  return mg.keys && (mg.keys[TWO]);
}

function three() {
  return mg.keys && (mg.keys[THREE]);
}

function four() {
  return mg.keys && (mg.keys[FOUR]);
}

function t() {
  return mg.keys && (mg.keys[T]);
}

function setclicks(){
  clickedAt.set(mousePos.x, mousePos.y);
  clickedRec.x=mousePos.x-5;
  clickedRec.y=mousePos.y+5;
  clickedRec.h=10;
  clickedRec.w=10;
}

function resizeCanvas() {
  deviceWidth = window.innerWidth;
  deviceHeight = window.innerHeight;
  let scaleFillNative = Math.min(deviceWidth / nativeWidth, deviceHeight / nativeHeight);

  this.ctx.mozImageSmoothingEnabled = false;
  this.ctx.webkitImageSmoothingEnabled = false;
  this.ctx.imageSmoothingEnabled = false;
  this.ctx.setTransform(scaleFillNative, 0, 0, scaleFillNative, 0, 0);
}
