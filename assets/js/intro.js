function Intro(){

  this.update = function() {
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
