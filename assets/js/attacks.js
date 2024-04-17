function Attack(hero){
  this.hero = hero;

  this.rotatingEntity = new Entity(8, 8, 0, 0, 0, types.SHIELD);
  this.spinningEntity = new Entity(4, 4, 0, 0, 0, types.SHIELD);
  this.chasingEntity = new Entity(8, 8, 0, 0, 0, types.SHIELD);
  this.helicalEntity = new Entity(8, 8, 0, 0, 0, types.SHIELD);
  this.figureEightEntity = new Entity(4, 4, 0, 0, 0, types.SHIELD);


  this.update = function(delta, t) {
    this.rotatingEntity.update(delta);
    this.spinningEntity.update(delta);
    this.chasingEntity.update(delta);
    this.figureEightEntity.update(delta);

    // Update rotating entity position
    let radius = 60; // Adjust as needed
    let rotateSpeed = 2;
    let angle = t * 2 * Math.PI / rotateSpeed;
    this.rotatingEntity.x = (this.hero.x+32) + radius * Math.cos(angle);
    this.rotatingEntity.y = (this.hero.y+32) + radius * Math.sin(angle);

    // Update spinning entity position around rotatingEntity
    let spinningRadius = 60; // Adjust as needed
    let spinningAngle = t * 2 * Math.PI / .6; // Adjust rotation speed
    this.spinningEntity.x = (this.rotatingEntity.x+16) + spinningRadius * Math.cos(spinningAngle);
    this.spinningEntity.y = (this.rotatingEntity.y+16) + spinningRadius * Math.sin(spinningAngle);

    // Update chasing entity position
    let chasingSpeed = 0.1; // Adjust chasing speed as needed
    let dx = this.hero.x - this.chasingEntity.x;
    let dy = this.hero.y - this.chasingEntity.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > 1) { // Move only if distance is significant
      this.chasingEntity.x += chasingSpeed * dx;
      this.chasingEntity.y += chasingSpeed * dy;
    }

    // Update figure-eight entity position
    radius = 80; // Adjust as needed
    let orbitSpeed = 2; // Adjust orbit speed as needed
    let x = this.hero.x + 32 + radius * Math.sin(t * orbitSpeed);
    let y = this.hero.y + 50 + radius * Math.sin(t * 2 * orbitSpeed); // Double the frequency for the figure-eight pattern
    this.figureEightEntity.x = x;
    this.figureEightEntity.y = y;
  }

}
