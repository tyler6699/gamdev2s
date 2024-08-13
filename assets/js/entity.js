function Entity(w, h, x, y, angle, type, id=0) {
  this.type = type;
  this.width = w;
  this.height = h;
  this.mhWidth = w / -2;
  this.mhHeight = h / -2;
  this.mhWScld = (w / -2);
  this.mhHScld = (h / -2);
  this.hWidth = w / 2;
  this.hHeight = h / 2;
  this.cenX=x-this.mhWScld;
  this.cenY=y-this.mhHScld;
  this.angle = angle;
  this.x = x;
  this.y = y;
  this.image = atlas;
  this.alpha = 1;
  this.isSolid = false;
  this.flip=false;
  this.dir=0;//0=R 1=L
  this.id=id;
  this.open=false;
  this.chasePhase = 'search'; // 'search', 'attack', 'return'
  this.content="";
  this.attack=false;
  // ATLAS Positions
  this.sx=0;
  this.sy=0;
  this.speed=5;

  this.move = function(){
    let spd = this.speed;
    if(left()){
      this.x-=spd;
      this.dir=1;
    }

    if(right()){
      this.x+=spd;
      this.dir=0;
    }

    if(up()){
      this.y-=spd;
    }

    if(down()){
      this.y+=spd;
    }

    let area = 1000;
    if(this.x < -area) this.x=-area;
    if(this.x > area) this.x=area;
    if(this.y < -area) this.y=-area;
    if(this.y > area) this.y=area;
  }

  // Render
  this.update = function(delta) {
    this.x = Math.floor(this.x);
    this.Y = Math.floor(this.Y);
    ctx.save();
    ctx.translate(this.x, this.y);
    if(cart.shakeTime>0){ctx.translate(cart.shake,cart.shake);}
    ctx.globalAlpha = this.alpha;

    img = this.image;
    s   = this.scale;
    mhw = this.mhWidth;
    mhh = this.mhHeight;
    hw  = this.hWidth;
    hh  = this.hHeight;
    w   = this.width;
    h   = this.height;

    // Camera Tracking
    ctx.translate(cart.cam.x,cart.cam.y);
    if (this.flip){
      if(this.type==types.HAIR2){
        ctx.translate(8.3*w,0);
      } else {
        ctx.translate(-w*-7,0);
      }
      ctx.scale(-zoom,zoom);
    } else {
      ctx.scale(zoom,zoom);
    }

    ctx.drawImage(img, this.sx, this.sy, w, h, hw, hh, w, h);
    ctx.restore();

    this.cenX=this.x-this.mhWScld;
    this.cenY=this.y-this.mhHScld;
  }

  this.isCollidingWith = function(other) {
  return !(this.x + this.width < other.x - other.width ||
           this.x - this.width > other.x + other.width ||
           this.y + this.height < other.y - other.height ||
           this.y - this.height > other.y + other.height);
};

  this.setType = function(){
    this.alpha = 1;
    this.sy=0;
    this.sx=0;

    switch(this.type){
      case types.HERO:
        break;
      case types.GRASS:
        this.sx=16;
        break;
    }

    this.hWidth = this.width / 2;
    this.hHeight = this.height / 2;
  }

  this.setType();
}
