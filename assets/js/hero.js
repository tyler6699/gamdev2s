function Hero(w, h, x, y, angle, type) {
  this.e = new Entity(16, 16, 0, 0, 0, types.HERO);
  this.change=false;
  this.handMovementPhase = 0;
  this.hp=100;
  this.power=0;
  this.particles=[];
  this.showhat=false;
  this.maxHP=100;
  this.die=0;

  this.update = function(delta) {
    this.e.move(delta);
    this.e.update(delta);

    this.particles.forEach(p => {
      p.update(ctx, delta);
    });

    this.particles = this.particles.filter(function (p) {
      return p.remove == false;
    });

    if(this.hp>0){
      // Update the phase, increase by delta time
      this.handMovementPhase += delta;

      // Bouncing Hands
      let bounce = 3 * Math.sin(this.handMovementPhase * 2 * Math.PI * 0.4); // Oscillates with an amplitude of 5 pixels, frequency of 0.5 Hz
      
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


  }

}
