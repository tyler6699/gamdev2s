function Cart() {
  this.cam=new Camera();
  this.tips=true;
  this.time=0;

  // if the window is 800px and your canvas 600px, apply scale(/*800/600 = */ 1.2)
  this.scale = 1;
  this.reset=false;

  // Set up one entity to render test
  this.entity = new Entity(16, 16, 0, 0, 0, types.HERO);

  // New entity for rotation
  this.rotatingEntity = new Entity(8, 8, 0, 0, 0, types.GRASS);
  this.spinningEntity = new Entity(4, 4, 0, 0, 0, types.GRASS);
  this.chasingEntity = new Entity(8, 8, 0, 0, 0, types.GRASS);
  this.helicalEntity = new Entity(8, 8, 0, 0, 0, types.GRASS);
  this.spiralEntity = new Entity(8, 8, 0, 0, 0, types.GRASS);
  this.figureEightEntity = new Entity(4, 4, 0, 0, 0, types.GRASS);

  this.enemies = [];
  const numberOfEnemies = 30;
  const radius = 100; // Radius of the circle on which enemies will be placed

  for (let i = 0; i < numberOfEnemies; i++) {
    let angle = (i / numberOfEnemies) * 2 * Math.PI; // Divide the circle into 30 segments
    let enemy = new Enemy(8, 8, types.GRASS, i, numberOfEnemies);
    enemy.e.x=this.entity.x + radius * Math.cos(angle); // Position enemies in a circle
    enemy.e.y=this.entity.y + radius * Math.sin(angle);
    this.enemies.push(enemy); // Position and type for the enemy);
  }
  // Render & Logic
  this.update = function(delta, time, gameStarted=false) {
    this.time+=delta;

    if(gameStarted){ // Game loop
      mg.clear();
      // let font = "30px Papyrus";
      // writeTxt(ctx, 1, font,"WHITE","Main Game:", canvasW-300, 200);

      // hero
      this.entity.update(delta);

      this.enemies.forEach(enemy => {
        enemy.update(delta, this.enemies);
        enemy.e.update(delta);
      });
      //this.rotatingEntity.update(delta);
      //this.spinningEntity.update(delta);
      //this.chasingEntity.update(delta);
      //this.figureEightEntity.update(delta);

      // Update rotating entity position
      let radius = 100; // Adjust as needed
      let rotateSpeed = 2;
      let angle = this.time * 2 * Math.PI / rotateSpeed;
      this.rotatingEntity.x = (this.entity.x+32) + radius * Math.cos(angle);
      this.rotatingEntity.y = (this.entity.y+64) + radius * Math.sin(angle);

      // Update spinning entity position around rotatingEntity
      let spinningRadius = 60; // Adjust as needed
      let spinningAngle = this.time * 2 * Math.PI / .6; // Adjust rotation speed
      this.spinningEntity.x = (this.rotatingEntity.x+16) + spinningRadius * Math.cos(spinningAngle);
      this.spinningEntity.y = (this.rotatingEntity.y+32) + spinningRadius * Math.sin(spinningAngle);

      // Update chasing entity position
      let chasingSpeed = 0.1; // Adjust chasing speed as needed
      let dx = this.entity.x - this.chasingEntity.x;
      let dy = this.entity.y - this.chasingEntity.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 1) { // Move only if distance is significant
        this.chasingEntity.x += chasingSpeed * dx;
        this.chasingEntity.y += chasingSpeed * dy;
      }

      // Update figure-eight entity position
      radius = 100; // Adjust as needed
      let orbitSpeed = 6; // Adjust orbit speed as needed
      let x = this.entity.x + radius * Math.sin(this.time * orbitSpeed);
      let y = this.entity.y + radius * Math.sin(this.time * 2 * orbitSpeed); // Double the frequency for the figure-eight pattern
      this.figureEightEntity.x = x;
      this.figureEightEntity.y = y;

      // Movement for Hero
      let speed = delta*400;
      if(left()){
        this.entity.x-=speed;
      }

      if(right()){
        this.entity.x+=speed;
      }

      if(up()){
        this.entity.y-=speed;
      }

      if(down()){
        this.entity.y+=speed;
      }

    } else { // Intro Screen
      let fontSize=getResponsiveFontSize(.05);
      mg.clear();
      ctx.save();
      drawBox(ctx,0.8,"black",0,0,canvasW,canvasH)
      let font=`${fontSize}px Arial`;
      writeTxt(ctx, 1, font,"WHITE","Game Title", 30, 90);
      writeTxt(ctx, 1, font,"WHITE",startDelay>0?"Generating World ..":"Press any key to start", 30, canvasH-120);
      writeTxt(ctx, 1, font,"WHITE","INTRO SCREEN " + TIME, 30, 200);
      ctx.restore();
    }
  }
}

function Enemy(x, y, type, index, totalEnemies) {
  this.e = new Entity(8, 8, 0, 0, 0, types.GRASS);
  this.speed = 1.5; // Speed of the enemy
  this.angleOffset = (Math.PI * 2) * (index / totalEnemies); // Unique angle for each enemy

  this.update = function(delta, mobs) {
    let steerPow = this.steerFromNearbyMobs(mobs, 50);
    let targetX = cart.entity.x + 24 + 50 * Math.cos(this.angleOffset); // 50 is the desired radius
    let targetY = cart.entity.y + 24 + 50 * Math.sin(this.angleOffset);
    this.e.x += (targetX - this.e.x > 0 ? this.speed : -this.speed) + steerPow.x;
    this.e.y += (targetY - this.e.y > 0 ? this.speed : -this.speed) + steerPow.y;
  };

  this.steerFromNearbyMobs = function(allMobs, maxDist) {
    let steerX = 0;
    let steerY = 0;
    let count = 0;

    for(let i = 0; i < allMobs.length; i++) {
      let mob = allMobs[i];
      let d = Math.sqrt(Math.pow(this.e.x - mob.e.x, 2) + Math.pow(this.e.y - mob.e.y, 2));

      if (mob !== this && d < maxDist) {
        steerX += (this.e.x - mob.e.x);
        steerY += (this.e.y - mob.e.y);
        count++;
      }
    }

    if (count > 0) {
      steerX /= count;
      steerY /= count;
    }

    // Normalize steering force, and adjust its mag
    let mag = Math.sqrt(steerX * steerX + steerY * steerY);
    if (mag > 0) {
      steerX /= mag;
      steerY /= mag;
    }
    return { x: steerX, y: steerY };
    };
}
