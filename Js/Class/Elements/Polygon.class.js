class Polygon extends Element {
    constructor(id, app, mat, indices, colors) {
        super(id, app);
        this.mat = mat;
        this.indices = new Uint16Array(indices);
        
        var generatedColors = [];

        for (var j = 0; j < 6; j++) {
            var c = colors[j];

            for (var i = 0; i < 4; i++) {
                generatedColors = generatedColors.concat(c);
            }
        }
        this.colors = new Float32Array(generatedColors);
        this.draw.Type = "TRIANGLES";
        this.haveColors = true;
        this.draw.Mode = 'drawElements';
        this.bufferType = "ELEMENT_ARRAY_BUFFER";
        this.Render();
    }

}