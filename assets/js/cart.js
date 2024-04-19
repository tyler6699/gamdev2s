function Cart() {
  this.cam=new Camera();
  this.tips=true;
  this.time=0;
  this.reset=false;
  this.hero = new Hero(16, 16, 0, 0, 0, types.HERO);
  this.attacks=new Attack(this.hero);
  this.spawner = new Spawner(this.hero.e);
  this.intro = new Intro();
  let waveStart=3;
  let waveEnd=20;
  let wave = 1;
  let currentNumber = 3;
  let scale = 20; // Initial scale of the squares
  let prevNumber = 0;

  // Render & Logic
  this.update = function(delta, gameStarted=false) {
    if(gameStarted){
      // Camera follow hero
      // Example usage: draw the number "190"
      this.cam.x = lerp(-this.hero.e.x+350,this.cam.x,.1);
      this.cam.y = lerp(-this.hero.e.y+200,this.cam.y,.1);
      TIME += delta;
      mg.clear();
      this.time+=delta;
      this.hero.update(delta);

      // Test numbers
      // drawNumber(10, 60, 1, 2);
      // drawNumber(20, 60, 0, 2);
      // drawNumber(30, 60, 0, 2);

      // Wave Start Count Down
      if(waveStart<=0){
        this.spawner.update(delta, this.time);
        this.attacks.update(delta, this.time);
        drawCountdown(ctx, TIME, waveEnd);
        if(TIME >= waveEnd){
          TIME=0;
          waveStart=3;
          this.spawner.enemies = [];
        }
      } else {
        waveStart-=delta;
        if(Math.ceil(waveStart)!=prevNumber) scale=20;
        scale += .3;
        prevNumber = Math.ceil(waveStart)
        drawNumber(330, 80, Math.ceil(waveStart), scale);
      }

      // TODO: Hero HP and Power
      drawBar(ctx, 100, 100, 'red',0);
      drawBar(ctx, 50, 100, 'lime',30);
      displayEnemyCount(this.spawner.enemies.length)
      displayFPS(fps);
    } else {
      // Intro Screen
      this.intro.update();
    }
  }
}
