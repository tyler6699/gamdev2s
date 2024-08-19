function Cart() {
  this.cam=new Camera();
  this.time=0;
  this.hero = new Hero(16, 16, 0, 0, 0, types.HERO);
  this.heroShadow = new Entity(11, 4, 0, 0, 0, types.SHADOW,1);
  this.shadow = new Entity(7, 3, 0, 0, 0, types.SHADOW,1);
  this.decor = new Decor();
  this.intro = new Intro();
  let prevNumber = 0;
  let runOnce=true;
  this.shake=0;
  this.shakeTime=0;
  this.shop=false;

  // setup tiles
  let rows = 10;
  let cols = 10
  this.tiles=[];
  this.blocks=[];

  let id =0;
  for (r = 0; r < rows; r++) {
    for (c = 0; c < cols; c++) {
      id++;
      xx = (c - r) * 64;
      yy = (c + r) * 32;
      var tile = new Entity(32, 16, xx, yy, 0, types.TILE);
      this.tiles.push(tile);
    }
  }

  //block Test
  var block = new Entity(32, 16, 0, 192, 0, types.BLOCK);
  //this.blocks.push(block);

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
      this.blocks.forEach(e => e.update(delta));
      this.hero.update(delta);

      this.hero.checkGun();
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
