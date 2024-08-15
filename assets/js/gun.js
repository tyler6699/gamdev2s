function Gun(){
  this.ammo=AMMOSTART;
  this.bullets=[];
  this.rate=.1;
  this.wait=0;
  this.type=guntype.ONESHOT;
  this.angles = [0];
  this.r=0.0174533;

  this.addBullets = function(ox,oy,dx,dy){
    // Remove old drawBullets
    if(this.ammo>0 && this.wait<=0){
      this.wait=this.rate;

      // Angle of mouse and hero centre
      var angle = Math.atan2(dy - oy, dx - ox);
      this.angle = Math.atan2(dy - oy, dx - ox);
      this.bullets.push(new Bullet(ox,oy,dx,dy));
    }
  }

  this.drawBullets = function(delta, friendly=false){
    if(this.wait>0){
      this.wait-=delta;
    }

    this.bullets.forEach(e => e.draw(delta, friendly));

    // Remove bullets
    this.bullets = this.bullets.filter(function (b) {
      return b.active == true;
    });
  }
}

function Bullet(ox,oy,dx,dy1){
  this.speed = 2;
  this.w = 60;
  this.h = 30;
  this.dst=0;
  this.active=true;
  this.hb = new rectanlge(ox, oy, this.w, this.h);
  this.dist=0;
  this.mhWidth = this.w / -2;
  this.mhHeight = this.h / -2;
  // 0 is perfect
  // .5 is awful
  this.accuracy=20;

  // Vector
  this.v = new vec2(cart.hero.e.x+60, cart.hero.e.y+50);

  this.angle = Math.atan2(oy - dy, ox - dx);
  dx += (Math.random() - 0.5) * 2 * this.accuracy
  dy +=  (Math.random() - 0.5) * 2 * this.accuracy
  this.dx = (dx-ox)*this.speed;
  this.dy = (dy-oy)*this.speed;

  this.draw = function(delta, friendly = false){
    // Update Position
    if(this.active){
      // Previous position
      xx = this.v.x;
      yy = this.v.y;

      // New Position
      this.v.x +=(this.dx*delta);
      this.v.y +=(this.dy*delta);

      // Draw
      ctx.save();
      ctx.translate(this.v.x, this.v.y);
      ctx.translate(cart.cam.x,cart.cam.y);
      ctx.rotate(this.angle);
      ctx.globalAlpha = .5;
      ctx.fillStyle = "white";
      ctx.fillRect((this.mhWidth *.5), (this.mhHeight * .5), (this.w * .5), (this.h * .5));
      ctx.restore();
    }
  }
}
