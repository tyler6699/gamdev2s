function Entity(w, h, x, y, angle, type) {
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

  // ATLAS Positions
  this.sx=0;
  this.sy=0;

  this.move = function(){
    let speed = 5;

    if(left()){
      this.x-=speed;
    }

    if(right()){
      this.x+=speed;
    }

    if(up()){
      this.y-=speed;
    }

    if(down()){
      this.y+=speed;
    }
  }

  // Render
  this.update = function(delta) {
    this.x = Math.floor(this.x);
    this.Y = Math.floor(this.Y);

    ctx.save();
    ctx.translate(this.x, this.y);
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
    ctx.scale(zoom,zoom);
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
      case types.ENEMY:
        this.sx=16;
        break;
      case types.GRASS:
        this.sx=16;
        break;
      case types.SHIELD:
        this.sx=33;
        break;
      case types.HAIR1:
        this.sx=63;
        this.width=13
        this.height=13
        break;
      case types.HAIR2:
        this.sx=77;
        this.width=15;
        this.height=12
        break;
      case types.HAIR3:
        this.sx=94;
        this.width=13;
        this.height=11;
        break;
      case types.HAIR4:
        this.sx=50;
        this.sy=12;
        this.width=11;
        this.height=8;
        break;
      case types.HEAD1:
        this.sx=2;
        this.sy=1;
        break;
      case types.HEAD2:
        this.sx=48;
        this.sy=1;
        break;
      case types.HEAD3:
        this.sx=11;
        this.sy=17;
        break;
      case types.HAND:
        this.sx=30;
        this.sy=9;
        break;
      case types.ARROW:
        this.sx=36;
        this.sy=3;
        break;
    }

    this.hWidth = this.width / 2;
    this.hHeight = this.height / 2;
  }

  this.setType();
}
