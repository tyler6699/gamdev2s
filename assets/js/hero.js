function Hero(w, h, x, y, angle, type) {

  this.e = new Entity(16, 16, 0, 0, 0, types.HERO);
  this.hair = new Entity(13, 13, 0, 0, 0, types.HAIR1);
  this.head = new Entity(11, 9, 0, 0, 0, types.HEAD1);
  this.rHand = new Entity(4, 4, 0, 0, 0, types.HAND);
  this.lHand = new Entity(4, 4, 0, 0, 0, types.HAND);
  this.change=false;

  this.update = function(delta) {
    this.e.move(delta);
    this.e.update(delta);

    this.head.x=this.e.x+18;
    this.head.y=this.e.y+18;
    this.head.update(delta);

    switch(this.hair.type){
      case types.HAIR1:
        this.hair.x=this.e.x+8;
        this.hair.y=this.e.y-6;
        break;
      case types.HAIR2:
        this.hair.x=this.e.x-6;
        this.hair.y=this.e.y-8;
        break;
      case types.HAIR3:
        this.hair.x=this.e.x+10;
        this.hair.y=this.e.y+2;
        break;
      case types.HAIR4:
        this.hair.x=this.e.x+18;
        this.hair.y=this.e.y+20;
        break;
    }

    if(this.change){
      this.hairChange=false;
      this.head.setType();
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
