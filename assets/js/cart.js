function Cart() {
  this.cam=new Camera();
  this.tips=true;
  this.time=0;
  this.reset=false;
  this.hero = new Entity(16, 16, 0, 0, 0, types.HERO);
  this.attacks=new Attack(this.hero);
  this.spawner = new Spawner(this.hero);
  this.intro = new Intro();
  // Render & Logic
  this.update = function(delta, gameStarted=false) {
    if(gameStarted){
      // Camera follow hero
      this.cam.x = lerp(-this.hero.x+350,this.cam.x,.1);
      this.cam.y = lerp(-this.hero.y+200,this.cam.y,.1);
      TIME += delta;
      mg.clear();
      this.time+=delta;
      this.hero.update(delta);
      this.spawner.update(delta, this.time);
      this.attacks.update(delta, this.time);

      // TODO: Hero HP and Power
      drawBar(ctx, 100, 100, 'red',0);
      drawBar(ctx, 50, 100, 'lime',30);

      drawCountdown(ctx, TIME, 5);

      // Movement for Hero
      let speed = 5;

      if(left()){
        this.hero.x-=speed;
      }

      if(right()){
        this.hero.x+=speed;
      }

      if(up()){
        this.hero.y-=speed;
      }

      if(down()){
        this.hero.y+=speed;
      }
    } else {
      // Intro Screen
      this.intro.update();
    }
  }
}
