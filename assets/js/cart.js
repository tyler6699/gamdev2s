function Cart() {
  this.cam=new Camera();
  this.time=0;
  this.hero = new Hero(16, 16, 0, 0, 0, types.HERO);
  this.heroShadow = new Entity(11, 4, 0, 0, 0, types.SHADOW,1);
  this.shadow = new Entity(7, 3, 0, 0, 0, types.SHADOW,1);
  this.decor = new Decor();
  this.intro = new Intro();
  let waveStart=3;
  this.waveEnd=10;
  this.wave = 1;
  let scale = 20; // Initial scale of the squares
  let prevNumber = 0;
  let runOnce=true;
  let imageData;
  this.shake=0;
  this.shakeTime=0;
  this.shop=false;

  // Render & Logic
  this.update = function(delta, gameStarted=false) {
    if(runOnce){
      var gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
      gradient.addColorStop(1, '#17202a'); // Dark
      gradient.addColorStop(0, '#2c3e50'); // Lighter green at the bottom
    }

    if(gameStarted){
      // Screen shake
      this.shake = shaky ? rndNo(-2,2) : 0;
      if(this.shakeTime>0) this.shakeTime-=delta;

      // Camera follow hero
      // Example usage: draw the number "190"
      this.cam.x = lerp(-this.hero.e.x+350,this.cam.x,.7);
      var xadd = check? 120 : 180;
      this.cam.y = lerp(-this.hero.e.y+xadd,this.cam.y,.7);

      TIME += delta;
      mg.clear();

      // GRASS
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      this.time+=delta;

      drawIsometricRoom();
      this.hero.update(delta);
      this.hero.checkGun();
      // if(this.hero.e.flip){
      //   this.heroShadow.x=this.hero.e.x+4;
      // } else {
      //   this.heroShadow.x=this.hero.e.x+18;
      // }
      // this.heroShadow.y=this.hero.e.y+74;
      // this.heroShadow.update(delta);

      // Hero HP and Power
      //drawBar(ctx, this.hero.hp, this.hero.maxHP, '#f8f9f9', '#283747','#aeb6bf',0); // HP
      //drawBar(ctx, this.hero.power, 100, '#84e3b3','#589572','#f0faf7',30); // Power

      displayFPS(fps);

      // HP Bar
      // USE this.hero.maxHP
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = "#17202a";
      ctx.roundRect(10, 10, 50, 300, 30);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#5b2c6f";
      ctx.roundRect(15, 200, 40, 100, 30);
      ctx.fill();

      ctx.beginPath();
      ctx.globalAlpha = .3;
      ctx.fillStyle = "white";
      ctx.roundRect(12, 35, 8, 250, 30);
      ctx.fill();

      ctx.beginPath();
      ctx.globalAlpha = .1;
      ctx.fillStyle = "white";
      ctx.roundRect(24, 35, 4, 250, 30);
      ctx.fill();
      ctx.restore();
    } else {
      // Intro Screen
      this.intro.update(delta);
    }
  }

  this.reset = function(){
    this.time=0;
    this.hero = new Hero(16, 16, 0, 0, 0, types.HERO);
    this.hero.e.x=canvasW/2;
    this.hero.e.y=canvasH/2;
    gameStarted=false;
    this.cam=new Camera();
  }
}

function drawIsometricRoom() {
    const tileWidth = 100;
    const tileHeight = 50;
    const roomWidth = 1; // Number of tiles
    const roomDepth = 1; // Number of tiles
    const roomHeight = 4; // Number of tiles

    ctx.save();
    ctx.translate(cart.cam.x,cart.cam.y);
    // Draw floor with checkered pattern
    for (let y = 0; y < roomDepth; y++) {
        for (let x = 0; x < roomWidth; x++) {
            const color = (x + y) % 2 === 0 ? '#273746' : '#566573';
            drawTile(
                startX + (x - y) * (tileWidth / 2),
                startY + (x + y) * (tileHeight / 2),
                tileWidth, tileHeight,
                color // Alternating black and white
            );
            //console.log(cart.hero.e.x + " y:" + cart.hero.e.y);
            //console.log("x: " + x);
            //console.log(startY + (x + y) * (tileHeight / 2));
            //400 y:492

        }
    }

    // Draw left wall as a single shape with gradient
    drawWall(
        startX,
        startY,
        roomDepth, roomHeight, tileWidth, tileHeight,
        'left'
    );

    // Draw right wall as a single shape with gradient
    drawWall(
           startX,
           startY,
           roomWidth, roomHeight, tileWidth, tileHeight,
           'right'
       );
    ctx.restore();
}

function drawTile(x, y, width, height, color) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width / 2, y + height / 2);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x - width / 2, y + height / 2);
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.stroke();
}

function drawWall(x, y, widthTiles, heightTiles, tileWidth, tileHeight, side) {
    ctx.beginPath();

    if (side === 'left') {
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - heightTiles * tileHeight);
        ctx.lineTo(x - widthTiles * (tileWidth / 2), y - heightTiles * tileHeight + widthTiles * (tileHeight / 2));
        ctx.lineTo(x - widthTiles * (tileWidth / 2), y + widthTiles * (tileHeight / 2));
    } else if (side === 'right') {
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - heightTiles * tileHeight);
        ctx.lineTo(x + widthTiles * (tileWidth / 2), y - heightTiles * tileHeight + widthTiles * (tileHeight / 2));
        ctx.lineTo(x + widthTiles * (tileWidth / 2), y + widthTiles * (tileHeight / 2));
    }
    ctx.closePath();

    // Create gradient for the wall
    const gradient = ctx.createLinearGradient(x, y - heightTiles * tileHeight, x, y);
    gradient.addColorStop(0, '#78281f');
    gradient.addColorStop(1, '#641e16');

    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.stroke();
}
