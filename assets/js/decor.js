function Decor(){
  this.decors = [];

  var areaSize = 2000; // Define the range for random placement
  var num = 60; // Number to place

  for (let i = 0; i < num; i++) {
    let x = Math.random() * (2 * areaSize) - areaSize;
    let y = Math.random() * (2 * areaSize) - areaSize;
    this.decors.push(new Entity(9, 6, x, y, 0, types.SMALLROCK));
  }

  numRocks = 50;
  for (let i = 0; i < num; i++) {
    let x = Math.random() * (2 * areaSize) - areaSize;
    let y = Math.random() * (2 * areaSize) - areaSize;
    this.decors.push(new Entity(14, 10, x, y, 0, types.BIGROCK));
  }

  num = 30;
  for (let i = 0; i < num; i++) {
    let x = Math.random() * (2 * areaSize) - areaSize;
    let y = Math.random() * (2 * areaSize) - areaSize;
    this.decors.push(new Entity(14, 14, x, y, 0, types.STUMP));
  }

  num = 20;
  for (let i = 0; i < num; i++) {
    let x = Math.random() * (2 * areaSize) - areaSize;
    let y = Math.random() * (2 * areaSize) - areaSize;
    this.decors.push(new Entity(10, 9, x, y, 0, types.BIGMUSH));
  }

  num = 40;
  for (let i = 0; i < num; i++) {
    let x = Math.random() * (2 * areaSize) - areaSize;
    let y = Math.random() * (2 * areaSize) - areaSize;
    this.decors.push(new Entity(7, 7, x, y, 0, types.SMALLMUSH));
  }

  this.update = function(delta, t) {
    // Update each rock based on game delta time
    this.decors.forEach(rock => {
      rock.update(delta);
    });

    // Optionally filter out inactive rocks if needed
    // Uncomment below line if rocks need to be removed when inactive
    // this.decors = this.decors.filter(rock => rock.active);
  }
}
