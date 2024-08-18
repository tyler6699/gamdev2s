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
  this.isJumping = false;
  this.jumpSpeed = 0;
  this.gravity = -9; // Gravity to apply during the fall
  this.initialJumpSpeed = 3; // Initial speed of the jump
  this.jumpHeight = 0; // Current height of the jump
  this.dustParticles = []; // Array to hold dust particles
  this.dustTimer = 0; // Timer to control dust particle creation

  this.update = function(delta) {

    if (space() && !this.isJumping) {
      // Initiate the jump
      this.isJumping = true;
      this.jumpSpeed = this.initialJumpSpeed;
    }

    if (this.isJumping) {
      this.jumpHeight += this.jumpSpeed * delta * 90; // Update jump height
      this.jumpSpeed += this.gravity * delta; // Apply gravity

      // If the character has landed
      if (this.jumpHeight <= 0) {
        this.jumpHeight = 0;
        this.isJumping = false;
        cart.shakeTime=.08;
      }
    }

    // Create dust particles if the hero is moving
    if (mg.keys && (mg.keys[LEFT] || mg.keys[RIGHT] || mg.keys[A] || mg.keys[D])) {
      this.dustTimer += delta;

      if (this.dustTimer > 0.2 && !this.isJumping) {
        this.dustTimer = 0;
        this.dustParticles.push(new DustParticle(this.e.x+55, this.e.y+95));
      }
    }

    // Update the character's vertical position based on jumpHeight
    this.e.z = -this.jumpHeight;
    this.lHand.z = -this.jumpHeight;
    this.rHand.z = -this.jumpHeight;
    this.e.move(delta);
    this.e.flip=mg.keys && (mg.keys[LEFT] || mg.keys[A]);
    this.e.update(delta);
    this.lHand.update(delta);
    this.rHand.update(delta);
    this.shadow.update(delta);

    this.particles.forEach(p => {
      p.update(ctx, delta);
    });

    // this.particles = this.particles.filter(function (p) {
    //   return p.remove == false;
    // });

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
    // Update and draw dust particles
    this.dustParticles = this.dustParticles.filter(p => p.isAlive());
    this.dustParticles.forEach(p => {
      p.update(delta);
   });
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
      this.e.gun.addBullets(ox,oy,dx,dy, this.e);
      cart.shakeTime=.05;
    }
  }

}
