function Intro(){
  this.arrow=new Entity(11, 12, 100, 60, 0, types.ARROW);
  let delay=0;
  let selectDelay=0;

  this.update = function(delta) {
    let fontSize=getResponsiveFontSize(.05);
    mg.clear();
    ctx.save();
    drawBox(ctx,0.8,"black",0,0,canvasW,canvasH)

    const stripeWidth = 50; // width of each stripe
    const colors = ['#a8f2cb', '#88e4b0']; // two-tone greens, mint and darker mint
    let colorIndex = 0;

     // Calculate the number of stripes needed to fill the screen diagonally
     const numStripes = Math.ceil(Math.sqrt(ctx.canvas.width**2 + ctx.canvas.height**2) / stripeWidth);

     // Draw each stripe
     for (let i = -numStripes; i < numStripes; i++) {
         ctx.beginPath();
         ctx.moveTo(i * stripeWidth, 0);
         ctx.lineTo((i + 1) * stripeWidth, 0);
         ctx.lineTo((i + 1) * stripeWidth + ctx.canvas.height, ctx.canvas.height);
         ctx.lineTo(i * stripeWidth + ctx.canvas.height, ctx.canvas.height);
         ctx.closePath();
         ctx.fillStyle = colors[colorIndex % 2];
         ctx.fill();
         colorIndex++;
     }

    let font=`${fontSize}px Arial`;
    writeStroke(ctx, 1, font,"Black","GameDevJS 2024 ", 30, canvasH*.1,12);
    writeTxt(ctx, 1, font,"WHITE","GameDevJS 2024 ", 30, canvasH*.1);
    writeTxt(ctx, 1, font,"WHITE",startDelay>0?"Generating World ..":"", 30, canvasH-120);
    font=`${fontSize-15}px Arial`;

    if (up() && delay <= 0 && charSet > 0) {
      delay = 0.3;
      charSet--;
    } else if (down() && delay <= 0 && charSet < 3) {
      delay = 0.3;
      charSet++;
    }

    if (charSet == 0) {
      this.arrow.y = 90;
      writeStroke(ctx, 1, font, "BLACK", "Select Hair (Left / Right)", 30, canvasH*.2,6);
      writeTxt(ctx, 1, font, "WHITE", "Select Hair (Left / Right)", 30, canvasH*.2);
      if ((left() || right()) && delay <= 0) {
          delay = 0.3;
          const h = [types.HAIR1, types.HAIR2, types.HAIR3, types.HAIR4];
          cart.hero.hair.type = h[(h.indexOf(cart.hero.hair.type) + 1) % h.length];
          cart.hero.change = true;
      } else if (space() && delay <= 0) {
          charSet = 1;
          delay = 0.3;
      }
    } else if (charSet == 1) {
      this.arrow.y = 120;
      writeStroke(ctx, 1, font, "BLACK", "Select Head (Left / Right)", 30, canvasH*.2,6);
      writeTxt(ctx, 1, font, "WHITE", "Select Head (Left / Right)", 30, canvasH*.2);
      if ((left() || right()) && delay <= 0) {
          delay = 0.3;
          const t = [types.HEAD1, types.HEAD2, types.HEAD3];
          cart.hero.head.type = t[(t.indexOf(cart.hero.head.type) + 1) % t.length];
          cart.hero.change = true;
          if(cart.hero.head.type == types.HEAD3 || cart.hero.head.type == types.HEAD2){
            cart.hero.rHand.sx=16;
            cart.hero.rHand.sy=28;
            cart.hero.lHand.sx=16;
            cart.hero.lHand.sy=28;
          } else {
            cart.hero.rHand.sx=30;
            cart.hero.rHand.sy=9;
            cart.hero.lHand.sx=30;
            cart.hero.lHand.sy=9;
          }

      } else if (space() && delay <= 0) {
          charSet = 2;
          delay = 0.3;
      }
    } else if (charSet == 2) {
      this.arrow.y = 150;
      writeStroke(ctx, 1, font, "BLACK", "Select Clothes (Left / Right)", 30, canvasH*.2,6);
      writeTxt(ctx, 1, font, "WHITE", "Select Clothes (Left / Right)", 30, canvasH*.2);
    } else if (charSet == 3) {
      this.arrow.y = 190;
      writeStroke(ctx, 1, font, "BLACK", "[ Start ]",  (canvasW / 2) - 90, canvasH - 60,10);
      writeTxt(ctx, 1, font, "WHITE", "[ Start ]", (canvasW / 2) - 90, canvasH - 60);
    }

    delay-=delta;
    cart.hero.e.x=70;
    cart.hero.e.y=20;

    ctx.save();
    ctx.scale(3,3);
    cart.hero.update(delta);
    ctx.restore();

    ctx.save();
    ctx.scale(1.5,1.5);
    this.arrow.update(delta);
    ctx.restore();


  }
}
