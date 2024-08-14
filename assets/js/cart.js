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
      gradient.addColorStop(0, '#3CB371'); // Dark green at the top
      gradient.addColorStop(1, '#A6F1C8'); // Lighter green at the bottom
    }

    if(gameStarted){
      // Screen shake
      this.shake = shaky ? rndNo(-2,2) : 0;
      if(this.shakeTime>0) this.shakeTime-=delta;

      // Camera follow hero
      // Example usage: draw the number "190"
      this.cam.x = lerp(-this.hero.e.x+350,this.cam.x,.1);
      var xadd = check? 120 : 180;
      this.cam.y = lerp(-this.hero.e.y+xadd,this.cam.y,.1);

      TIME += delta;
      mg.clear();

      // GRASS
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      this.time+=delta;

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
      drawBar(ctx, this.hero.hp, this.hero.maxHP, '#f8f9f9', '#283747','#aeb6bf',0); // HP
      //drawBar(ctx, this.hero.power, 100, '#84e3b3','#589572','#f0faf7',30); // Power
      displayFPS(fps);
    } else {
      // Intro Screen
      this.intro.update(delta);
    }
  }


  this.reset = function(){
    this.time=0;
    this.hero = new Hero(16, 16, 0, 0, 0, types.HERO);
    gameStarted=false;
    this.cam=new Camera();
  }
}
