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

  // setup tiles
  let rows = 10;
  let cols = 10
  this.tiles=[];

  let id =0;
  for (r = 0; r < rows; r++) {
    for (c = 0; c < cols; c++) {
      id++;
      xx = (c - r) * 64;
      yy = (c + r) * 32;
      var tile = new Entity(32, 16, xx, yy, 0, types.TILE);

      if(id==45){
        // tile x: 0 y: 256
        // x: 0 y: 256 row: 4 col: 4
        console.log("x: " + tile.x + " y: " + tile.y + " row: " + r + " col: " + c);
        tile.sx=49;
      }
      this.tiles.push(tile);
    }
  }

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
      this.cam.x = Math.ceil(lerp(-this.hero.e.x+350,this.cam.x,.7));
      var xadd = check? 120 : 180;
      this.cam.y = Math.ceil(lerp(-this.hero.e.y+xadd,this.cam.y,.7));

      TIME += delta;
      mg.clear();

      // Background
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      drawIsometricRoom();

      this.time+=delta;
      this.tiles.forEach(e => e.sx=16);

      if(this.hero.currentTile != null){
        this.hero.currentTile.sx=49;
      }

      this.tiles.forEach(e => e.update(delta));
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

  this.reset = function(){a
    this.time=0;
    this.hero = new Hero(16, 16, 0, 0, 0, types.HERO);
    this.cart.hero.e.x=60;
    this.cart.hero.e.y=200;
    gameStarted=false;
    this.cam=new Camera();
  }
}

function getTile(xHero, yHero) {
    let c = Math.round((yHero / 64) + (xHero / 128));
    let r = Math.round((yHero / 64) - (xHero / 128));
    // console.log(c + " " + r);
    // console.log(cart.tiles[c + (10 * r)])
    if(cart.tiles[c + (10 * r)]!=null){
      cart.tiles[c + (10 * r)].sx=49;
    }

    return cart.tiles[c + (10 * r)];
}

function drawIsometricRoom() {
    const tileWidth = 128;
    const tileHeight = 64;
    const roomWidth = 10; // Number of tiles
    const roomDepth = 10; // Number of tiles
    const roomHeight = 4; // Number of tiles

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
        }
    }

  // Show Hero hit box
  // ctx.save();
  // ctx.translate(32,32); // 64 is width
  // ctx.translate(cart.cam.x,cart.cam.y);
  // ctx.rect(xxx,yyy,sss,sss);
  // ctx.fill(); // Render the path
  // yyy = cart.hero.e.y;
  // xxx = cart.hero.e.x;
  // ctx.restore();
}

function drawTile(x, y, width, height, color) {
  ctx.save();
  ctx.translate(cart.cam.x,cart.cam.y);
  ctx.translate(width,height/2)
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + width / 2, y + height / 2);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x - width / 2, y + height / 2);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}
