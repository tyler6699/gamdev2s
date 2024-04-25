function Spawner(hero){
  this.hero=hero;
  this.enemies = [];

  this.update = function(delta, t) {
    this.enemies.forEach(enemy => {
      enemy.update(delta, this.enemies);
      enemy.e.update(delta);

      if(enemy.e.type==types.ENEMY){
        enemy.handMov += delta;
        let bounce = 4 * Math.sin(enemy.handMov * 2 * Math.PI * 0.4);
        enemy.rHand.x = enemy.e.x+10;
        enemy.rHand.y = enemy.e.y+65+bounce;
        enemy.lHand.x = enemy.e.x+50;
        enemy.lHand.y = enemy.e.y+65+bounce;
        enemy.rHand.update(delta);
        enemy.lHand.update(delta);
      }
    });

    this.enemies = this.enemies.filter(function (i) {
     return i.active;
   });
  }

  this.addEnemy = function(numE, radius) {
    for (let i = 0; i < numE; i++) {
      let angle = (i / numE) * 2 * Math.PI; // Divide the circle into segments
      let enemy = new Enemy(0,0,9,8, [types.LILY, types.LILG, types.LILP][rndNo(0,2)], i, numE,1);

      enemy.e.x=this.hero.x + radius * Math.cos(angle); // Position enemies in a circle
      enemy.e.y=this.hero.y + radius * Math.sin(angle);
      this.enemies.push(enemy);
    }

    for (let i = 0; i < 10; i++) {
      let angle = (i / Math.floor(numE/4)) * 2 * Math.PI; // Divide the circle into segments
      let enemy = new Enemy(0,0,12,16, types.ENEMY, i, 5,5);

      enemy.speed=.001;
      enemy.e.x=this.hero.x + radius * Math.cos(angle); // Position enemies in a circle
      enemy.e.y=this.hero.y + radius * Math.sin(angle);
      this.enemies.push(enemy);
    }
  }

  this.addEnemy(30, 600);
}
