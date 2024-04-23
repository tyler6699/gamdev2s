function Cart() {
  this.cam=new Camera();
  this.tips=true;
  this.time=0;
  this.reset=false;
  this.hero = new Hero(16, 16, 0, 0, 0, types.HERO);
  this.attacks=new Attack(this.hero);
  this.spawner = new Spawner(this.hero.e);
  this.decor = new Decor();
  this.intro = new Intro();
  let waveStart=3;
  let waveEnd=5;
  let wave = 1;
  let currentNumber = 3;
  let scale = 20; // Initial scale of the squares
  let prevNumber = 0;
  let runOnce=true;
  let imageData;
  this.shake=0;
  this.shakeTime=0;
  this.shop=false;
  this.chests=[]
  this.chests.push(new Entity(16, 13, -70, 30, 0, types.CHEST,1));
  this.chests.push(new Entity(16, 13, 65, 30, 0, types.CHEST,2));
  this.chests.push(new Entity(16, 13, 200, 30, 0, types.CHEST,3));
  let one = new Entity(9, 5, -45, 10, 0, types.ONE);
  let two = new Entity(11, 5, 83, 10, 0, types.TWO);
  let three = new Entity(11, 5, 215, 10, 0, types.THREE);

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
      this.cam.y = lerp(-this.hero.e.y+200,this.cam.y,.1);

      TIME += delta;
      mg.clear();

      // GRASS
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      this.time+=delta;

      if(this.shop){
        TIME=0;
        this.chests.forEach(c => {
          c.update(delta);
           if (c.isCollidingWith(this.hero.e) ) {
             console.log("Hit chest: " + c.id);
           }
        });
        one.update(delta);
        two.update(delta);
        three.update(delta);
        if(space()){
          this.spawner.addEnemy(30,300)
          wave++;
          waveStart=3;
          this.shop=false;
        }
      }

      this.decor.update(delta);
      this.hero.update(delta);

      // Wave Start Count Down
      if(waveStart<=0 && TIME <= waveEnd && !this.shop){
        this.spawner.update(delta, this.time);
        this.attacks.update(delta, this.time);
        drawCountdown(ctx, TIME, waveEnd);
      } else if(TIME >= waveEnd){
          this.shop=true;
          TIME=0;
          this.spawner.enemies = [];
          this.hero.e.x=65;
          this.hero.e.y=140;
      } else if(waveStart>0) {
        waveStart-=delta;
        if(Math.ceil(waveStart)!=prevNumber) scale=20;
        drawNumber(330, 80, Math.ceil(waveStart), scale);
        scale += .3;
        prevNumber = Math.ceil(waveStart)
      }

      // TODO: Hero HP and Power
      drawBar(ctx, this.hero.hp, 100, '#f68687', '#a15156','#faf1f0',0); // HP RED
      drawBar(ctx, this.hero.power, 100, '#84e3b3','#589572','#f0faf7',30); // Power Green
      displayEnemyCount(this.spawner.enemies.length)
      displayFPS(fps);
    } else {
      // Intro Screen
      this.intro.update(delta);
    }
  }
}
