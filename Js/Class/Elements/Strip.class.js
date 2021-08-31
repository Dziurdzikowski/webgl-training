class Strip extends Element {
    constructor(id,app,from,to) {
        super(id,app);
        this.from=from;
        this.to=to;
        this.mat = [this.from, this.to];
        this.haveColors=false;
        this.draw.Type=this.draw.Types.LineStrip;
        this.pointSize=3;
        this.Render();
    }

}
