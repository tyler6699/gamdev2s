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
    }
  }

  this.setType();
}
