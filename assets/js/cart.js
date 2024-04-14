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

  // Render & Logic
  this.update = function(delta, time, gameStarted=false) {
    this.time+=delta;

    if(gameStarted){ // Game loop
      mg.clear();
      // let font = "30px Papyrus";
      // writeTxt(ctx, 1, font,"WHITE","Main Game:", canvasW-300, 200);
      // Test drawing one entity
      this.entity.update(delta);
      this.rotatingEntity.update(delta);
      this.spinningEntity.update(delta);
      //this.chasingEntity.update(delta);
      //this.figureEightEntity.update(delta);
      //this.helicalEntity.update(delta);
      //this.spiralEntity.update(delta);

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

      // Update helical entity position
      radius = 100; // Adjust as needed
      let helixSpeed = 0.1; // Adjust helix speed as needed
      let helixAngle = this.time * 2 * Math.PI / 5; // Adjust rotation speed
      let helixHeight = 20; // Adjust height of the helix
      let helixX = this.entity.x + radius * Math.cos(helixAngle);
      let helixY = this.entity.y + radius * Math.sin(helixAngle);
      let helixZ = this.entity.y + helixHeight * this.time * helixSpeed; // Adjust speed and direction
      this.helicalEntity.x = helixX;
      this.helicalEntity.y = helixY;
      this.helicalEntity.z = helixZ;

      radius = 100; // Adjust as needed
      let spiralSpeed = 0.1; // Adjust spiral speed as needed
      let spiralAngle = this.time * 2 * Math.PI / 5; // Adjust rotation speed
      let spiralRadius = radius + this.time * spiralSpeed; // Adjust the rate of change of the spiral
      let spiralX = this.entity.x + spiralRadius * Math.cos(spiralAngle);
      let spiralY = this.entity.y + spiralRadius * Math.sin(spiralAngle);
      this.spiralEntity.x = spiralX;
      this.spiralEntity.y = spiralY;

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
