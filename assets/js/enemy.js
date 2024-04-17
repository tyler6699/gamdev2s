function Enemy(x, y, type, index, totalEnemies) {
  this.e = new Entity(16, 16, 0, 0, 0, type);
  this.speed = .8; // Speed of the enemy
  this.angleOffset = (Math.PI * 2) * (index / totalEnemies); // Unique angle for each enemy

  this.update = function(delta, mobs) {
    let steerPow = this.steerFromNearbyMobs(mobs, 60);
    let targetX = cart.hero.x + 24 + 50 * Math.cos(this.angleOffset); // 50 is the desired radius
    let targetY = cart.hero.y + 24 + 50 * Math.sin(this.angleOffset);
    this.e.x += (targetX - this.e.x > 0 ? this.speed : -this.speed) + steerPow.x;
    this.e.y += (targetY - this.e.y > 0 ? this.speed : -this.speed) + steerPow.y;

    // Check collision with hero
   if (this.e.isCollidingWith(cart.hero)) {
     console.log('Enemy is touching the hero!');
     this.e.x+=1000;
   }
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
