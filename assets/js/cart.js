function Cart() {
  var totalWidth = 800;
  var totalHeight = 600;
  var widthToHeight = 4 / 3;
  var newWidthToHeight = totalHeight / canvasH;
  var resize=true;
  this.cam=new Camera();
  this.ratio=1;
  this.tips=true;
  this.time=0;

  if (canvasW > totalWidth) {
    this.ratio=canvasW / totalWidth;
  } else {
    this.ratio=canvasH / totalHeight;
  }

  // if the window is 800px and your canvas 600px, apply scale(/*800/600 = */ 1.2)
  this.scale = 2;
  this.cube = 16; // width of tiles
  this.scaled = this.scale*this.cube;
  this.hero = new hero(16, 16, 0, 0, 0, types.HERO, this.scale);
  this.introT=0;
  this.shake=0;
  this.shakeTime=0;
  this.reset=false;
  this.wait=2;

  this.genLevel = function(num){
    this.levels = []; // Array to get tiles surrounding an entity

    var lvl = new level(1, canvasW, canvasH, this.scale);
    lvl.reset(1, this.scaled);
    this.levels.push(lvl);

    // TODO Function this
    this.level = this.levels[0];
    this.hero.e.curLevel = 0;
    this.hero.e.x=this.level.startPos[0];
    this.hero.e.y=this.level.startPos[1];
  }

  this.genLevel(0);
  this.level.objs.push(this.hero.e);
  // Changing the number of columns changes the surrounding tiles array.
  var c = this.levels[this.hero.e.curLevel].cols;

  // UI
  this.menu = new menu();

  // Render & Logic
  this.update = function(delta, time, intro=false) {
    this.time+=delta/1000;
    if(resize){
      resize=false;
      ctx.scale(this.ratio,this.ratio);
    }

    // Screen shake
    this.shake = shaky ? Math.cos(TIME) : 0;
    if(cart.shakeTime>0) cart.shakeTime-=delta/1000;

    this.hero.setCurrentTile(this.scaled);

    // HERO
    if(!intro){
      this.level.draw(this.hero, delta);
      // draw all the shadows
      this.hero.update(ctx, delta);
      // MOUSE
      //mg.canvas.style.cursor='none';
    }

    // Render Menu
    this.menu.ui.forEach(e => e.update(delta));
    this.menu.tick();

    // Draw resources
    for(i=0;i<this.level.trees;i++){
      this.menu.tree.x=8+(i*30);
      this.menu.tree.y=150;
      this.menu.tree.update(delta);
    }
    for(i=0;i<this.level.rocks;i++){
      this.menu.rock.x=8+(i*30);
      this.menu.rock.y=190;
      this.menu.rock.update(delta);
    }

    // Tick the mobs but add the entities to the obj list to render!
    this.level.mobs.forEach(m => m.update(delta));

    // Follow hero
    this.cam.x = lerp(-this.hero.e.x + (totalWidth/2)-20,this.cam.x ,.8);
    this.cam.y = lerp(-this.hero.e.y + (totalHeight/2)-80,this.cam.y ,.8);

    // remove objects
    this.level.objs = this.level.objs.filter(function (i) {
      return i.hp >= 0;
    });

    this.level.mobs = this.level.mobs.filter(function (i) {
     return i.e.hp >= 0;
    });
  }
}
