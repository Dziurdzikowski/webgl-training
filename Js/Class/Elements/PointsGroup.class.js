class PointsGroup extends Element {
    constructor(id,app,mats) {
        super(id,app);
        this.mat = mats;
        this.draw.Type=this.draw.Types.Points;
        this.pointSize=3;
        this.Render();
    }

}
