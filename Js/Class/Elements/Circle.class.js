class Circle extends Element {
    constructor(id,app,radius = 0.2) {
        super(id,app);
        this.radius = radius;
        this.Generate();
        this.Render();

    }
    Generate() {
        this.mat = [];
        this.colors=[];
        var tmpy = [];
        var radius2 = Math.pow(this.radius, 2)
        var tmp = 0,tmpx = 0,end = (this.radius + this.properties.Position.values.x),start = ((-1 * this.radius) + this.properties.Position.values.x);
    for (var i = start; i < end; i += 0.0001) {
        tmp = (radius2 - Math.pow((i - this.properties.Position.values.x), 2));    
        tmpy = Math.sqrt(tmp);  tmpx = i;
        this.mat.push([i, (tmpy), 0.1, 1]); this.colors.push([i, (tmpy), 0.1, 1,1]);
        this.mat.push([i, (tmpy), -0.1, 1]); this.colors.push([i, (tmpy), -0.1, 1,1]);
        this.mat.push([i, ((tmpy * -1)), 0.1, 1]); this.colors.push([i, ((tmpy * -1)), 0.1, 1,1]);
        this.mat.push([i, ((tmpy * -1)), -0.1, 1]);   this.colors.push([i, ((tmpy * -1)), -0.1, 1,1]);
    }
    console.log(this);
    this.vertices = this.MX.toArr(this.mat);

    return this;
};
}