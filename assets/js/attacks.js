function Attack(hero) {
  this.hero = hero;
  this.weapons = [];
  this.spinWeapons = [];
  this.chaseWeapons = [];
  this.chasingEntity = new Entity(7, 8, 0, 0, 0, types.C1);
  this.chaseWeapons.push(this.chasingEntity)
  this.weapons.push(this.chasingEntity);
  this.chasingEntity = new Entity(7, 8, 0, 0, 0, types.C2);
  this.chaseWeapons.push(this.chasingEntity)
  this.weapons.push(this.chasingEntity);
  this.chasingTargets = new Set();
  // Configuration for rotating entities
  this.numberOfRotatingItems = 5; // Default number of rotating items
  this.distanceFromHero = 80; // Default distance from the hero in pixels
  let closestDistance = 500;

  // Create multiple rotating entities based on numberOfRotatingItems
  for (let i = 0; i < this.numberOfRotatingItems; i++) {
    const angle = (2 * Math.PI / this.numberOfRotatingItems) * i;
    const x = this.hero.e.x + 32 + this.distanceFromHero * Math.cos(angle);
    const y = this.hero.e.y + 32 + this.distanceFromHero * Math.sin(angle);
    let rotatingEntity = new Entity(6, 8, x, y, 0, types.SHIELD);
    this.weapons.push(rotatingEntity);
    this.spinWeapons.push(rotatingEntity);
  }

  // Entity behavior flags
  this.rotate = true;
  this.spin = false;
  this.chase = true;
  this.loop = false;

  // Additional function within Attack
this.applySeparation = function(chase, delta) {
  let separationDistance = 30; // Minimum desired distance between chasers
  let steerX = 0;
  let steerY = 0;

  this.chaseWeapons.forEach(other => {
    if (other !== chase) {
      let dx = chase.x - other.x;
      let dy = chase.y - other.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 0 && distance < separationDistance) {
        // Calculate force vector away from the other chaser
        let force = (separationDistance - distance) / distance;
        steerX += dx * force;
        steerY += dy * force;
      }
    }
  });

  // Apply this force to the chaser's velocity or position
  chase.x += steerX * delta;
  chase.y += steerY * delta;
};

  this.update = function(delta, t) {
    if (this.rotate) {
      // Update all rotating entities
      let rotateSpeed = 0.8; // Speed of rotation
      this.spinWeapons.forEach((entity, index) => {
        let angle = t * 2 * Math.PI / rotateSpeed + (2 * Math.PI / this.numberOfRotatingItems) * index;
        entity.x = this.hero.e.x + 32 + this.distanceFromHero * Math.cos(angle);
        entity.y = this.hero.e.y + 32 + this.distanceFromHero * Math.sin(angle);
        entity.update(delta);
      });
    }

    // You can include similar conditional logic for spin, chase, and loop with respective modifications
    // Chasing logic
    // Update chase weapons

    // Call this function in the update method for each chaser
  this.chaseWeapons.forEach((chase) => {
    this.applySeparation(chase, delta);
  });

   this.chaseWeapons.forEach((chase) => {
     if (this.chase) {
       let closestDistance = 500;
       switch (chase.chasePhase) {
         case 'search':
         this.targetEnemy = null;
          let closestDistance = Infinity; // Start with a very large distance
          cart.spawner.enemies.forEach(enemy => {
          if (!this.chasingTargets.has(enemy) && enemy.active) { // Check if enemy is not already targeted and is active
            let dx = chase.x - enemy.e.x;
            let dy = chase.y - enemy.e.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < closestDistance && distance < 200) { // Also ensure within chasing range
              closestDistance = distance;
              this.targetEnemy = enemy;
            }
          }
          });

          if (this.targetEnemy) {
          this.chasingTargets.add(this.targetEnemy); // Mark this enemy as targeted
          chase.chasePhase = 'attack';
          }
          break;

         case 'attack':
           if (this.targetEnemy && this.targetEnemy.active) {
             let dx = this.targetEnemy.e.x - chase.x;
             let dy = this.targetEnemy.e.y - chase.y;
             let angle = Math.atan2(dy, dx);
             chase.x += Math.cos(angle) * 5;
             chase.y += Math.sin(angle) * 5;

             if (Math.sqrt(dx * dx + dy * dy) < 5) {
               chase.chasePhase = 'return';
             }
           } else {
             chase.chasePhase = 'return'; // Target is no longer active or was killed
           }
           break;

         case 'return':
          // Before returning, remove the enemy from the targeting list
           if (this.targetEnemy) {
             this.chasingTargets.delete(this.targetEnemy);
           }
           let dx = this.hero.e.x - chase.x;
           let dy = this.hero.e.y - chase.y;
           if (Math.sqrt(dx * dx + dy * dy) > 5) {
             let angle = Math.atan2(dy, dx);
             chase.x += Math.cos(angle) * 5;
             chase.y += Math.sin(angle) * 5;
           } else {
             chase.chasePhase = 'search'; // Return completed
           }
           break;
       }
       chase.update(delta);
     }
   });

  }
}


// function Attack(hero){
//   this.hero = hero;
//   this.weapons=[];
//
//   this.rotatingEntity = new Entity(6, 8, 0, 0, 0, types.SHIELD);
//   this.spinningEntity = new Entity(4, 4, 0, 0, 0, types.SHIELD);
//   this.chasingEntity = new Entity(6, 8, 0, 0, 0, types.SHIELD);
//   this.helicalEntity = new Entity(6, 8, 0, 0, 0, types.SHIELD);
//   this.figureEightEntity = new Entity(4, 4, 0, 0, 0, types.SHIELD);
//
//   this.weapons.push(this.rotatingEntity);
//   //this.weapons.push(this.spinningEntity);
//   //this.weapons.push(this.chasingEntity);
//   //this.weapons.push(this.helicalEntity);
//   //this.weapons.push(this.figureEightEntity);
//
//   this.rotate = true;
//   this.spin = false;
//   this.chase = false;
//   this.loop = false;
//
//   this.update = function(delta, t) {
//     if(this.rotate){
//       // Update rotating entity position
//       let radius = 60; // Adjust as needed
//       let rotateSpeed = .8;
//       let angle = t * 2 * Math.PI / rotateSpeed;
//       this.rotatingEntity.x = (this.hero.e.x+32) + radius * Math.cos(angle);
//       this.rotatingEntity.y = (this.hero.e.y+32) + radius * Math.sin(angle);
//
//       this.rotatingEntity.update(delta);
//     }
//
//     if(this.spin){
//       let spinningRadius = 60; // Adjust as needed
//       let spinningAngle = t * 2 * Math.PI / .6; // Adjust rotation speed
//       this.spinningEntity.x = (this.rotatingEntity.x+16) + spinningRadius * Math.cos(spinningAngle);
//       this.spinningEntity.y = (this.rotatingEntity.y+16) + spinningRadius * Math.sin(spinningAngle);
//
//       this.spinningEntity.update(delta);
//     }
//
//     if(this.chase){
//       let chasingSpeed = 0.1; // Adjust chasing speed as needed
//       let dx = this.hero.e.x - this.chasingEntity.x;
//       let dy = this.hero.e.y - this.chasingEntity.y;
//       let distance = Math.sqrt(dx * dx + dy * dy);
//       if (distance > 1) { // Move only if distance is significant
//         this.chasingEntity.x += chasingSpeed * dx;
//         this.chasingEntity.y += chasingSpeed * dy;
//       }
//
//       this.chasingEntity.update(delta);
//     }
//
//     if(this.loop){
//       // Update figure-eight entity position
//       radius = 80; // Adjust as needed
//       let orbitSpeed = 2; // Adjust orbit speed as needed
//       let x = this.hero.e.x + 32 + radius * Math.sin(t * orbitSpeed);
//       let y = this.hero.e.y + 50 + radius * Math.sin(t * 2 * orbitSpeed); // Double the frequency for the figure-eight pattern
//       this.figureEightEntity.x = x;
//       this.figureEightEntity.y = y;
//
//       this.figureEightEntity.update(delta);
//     }
//   }
// }
