class Line extends Element {
    constructor(id,app,from,to) {
        super(id,app);
        this.from=from;
        this.to=to;
         this.mat = [this.from, this.to];
         this.draw.Type=this.draw.Types.Lines;
         this.vertices=this.MX.toArr(this.mat);
         this.haveColors=false;
         this.Render();
    }

}
