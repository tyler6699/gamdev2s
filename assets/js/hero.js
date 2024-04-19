function Hero(w, h, x, y, angle, type) {

  this.e = new Entity(16, 16, 0, 0, 0, types.HERO);
  this.hair = new Entity(16, 16, 0, 0, 0, types.HAIR3);
  this.rHand = new Entity(4, 4, 0, 0, 0, types.HAND);
  this.lHand = new Entity(4, 4, 0, 0, 0, types.HAND);
  this.hairChange=false;

  this.update = function(delta) {
    this.e.move(delta);
    this.e.update(delta);

    switch(this.hair.type){
      case types.HAIR1:
        this.hair.x=this.e.x;
        this.hair.y=this.e.y-14;
        break;
      case types.HAIR2:
        this.hair.x=this.e.x-10;
        this.hair.y=this.e.y-20;
        break;
      case types.HAIR3:
        this.hair.x=this.e.x+1;
        this.hair.y=this.e.y-12;
        break;
    }

    if(this.hairChange){
      this.hairChange=false;
      this.hair.setType();
    }

    this.hair.update(delta);
    this.rHand.x=this.e.x+65;
    this.rHand.y=this.e.y+65;
    this.lHand.x=this.e.x+25;
    this.lHand.y=this.e.y+65;
    this.rHand.update(delta);
    this.lHand.update(delta);

  }

}
