function Hero(w, h, x, y, angle, type) {
  this.e = new Entity(16, 16, 0, 0, 0, types.HERO);
  this.lHand = new Entity(4, 4, 0, 0, 0, types.HAND);
  this.rHand = new Entity(4, 4, 0, 0, 0, types.HAND);
  this.shadow = new Entity(9, 4, 0, 0, 0, types.SHADOW);
  this.shadow.alpha=.4;
  this.change=false;
  this.handMovementPhase = 0;
  this.hp=100;
  this.power=0;
  this.particles=[];
  this.maxHP=100;
  this.die=0;
  this.e.gun = new Gun();
  this.currentTile=null;

  this.update = function(delta) {
    this.e.move(delta);
    this.e.flip=mg.keys && (mg.keys[LEFT] || mg.keys[A]);
    this.e.update(delta);
    this.lHand.update(delta);
    this.rHand.update(delta);
    this.shadow.update(delta);

    this.particles.forEach(p => {
      p.update(ctx, delta);
    });

    this.particles = this.particles.filter(function (p) {
      return p.remove == false;
    });

    this.e.gun.drawBullets(delta);

    if(this.hp>0){
      // Update the phase, increase by delta time
      this.handMovementPhase += delta;

      // Bouncing Hands
      let bounce = 3 * Math.sin(this.handMovementPhase * 2 * Math.PI * 0.4); // Oscillates with an amplitude of 5 pixels, frequency of 0.5 Hz

      // Hands
      this.lHand.setV(this.e.x+70, this.e.y+64+bounce);
      this.rHand.setV(this.e.x+15, this.e.y+64+bounce);
      this.shadow.setV(this.e.x+22, this.e.y+80);

    } else if(this.hp==0){
      if(this.die<1.5){
        this.e.sx=16;
        this.e.width=12;
        this.die+=delta;
        this.e.alpha-=.01;
      } else {
        playSound(5,4);
        cart.reset();
      }
    }

    this.currentTile=getTile(this.e.x-80, this.e.y+30)
    //console.log(this.currentTile);
  }

  holdClickT = 0;
  this.checkGun = function(){
    if(leftMB) holdClickT += delta;
    if(processClick || leftMB > .25){
      this.e.idle=0;
      ox=ctx.canvas.width/2;
      oy=ctx.canvas.height/2;
      dx = mousePos.x;
      dy = mousePos.y;
      //console.log("Shoot: ox:" + ox + " oy:" + oy + " dx:" + dx + " dy:" + dy);
      this.e.gun.addBullets(ox,oy,dx,dy);
    }
  }

}
