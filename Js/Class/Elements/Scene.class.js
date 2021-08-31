class Scene extends Element {
    constructor(id, app, data) {
        super(id, app, data);
        this.draw.Type = "TRIANGLE_STRIP";
        this.mat = [
            [-1, 1, 1, 0], [-1, 1, -1, 0], [-1, -1, -1, 0],
            [-1, -1, -1, 0], [-1, 1, 1, 0], [-1, 1, 1, 0],
            [-1, -1, -1, 0], [-1, -1, 1, 0], [1, -1, 1, 0],
            [-1, -1, -1, 0], [1, -1, -1, 0], [-1, -1, -1, 0],
            [-1, -1, 1, 0], [-1, 1, 1, 0], [1, -1, 1, 0],
            [1, -1, 1, 0], [1, 1, 1, 0], [-1, 1, 1, 0]
        ];
        this.properties.Color.set(1, 1.5, 0, 1);
        //   this.haveColors=true;
    }
    setZ(size) {
        this.mat = [
            [-size, -size, -size, 0], [-size, size, -size, 0], [-size, size, size, 0],
            [-size, size, size, 0], [-size, -size, size, 0], [-size, -size, -size, 0],
        ];
        this.Render();
    }
    setX() {
        this.mat = [
            [-2, -2, -2, 0], [-2, -2, 2, 0], [2, -2, 2, 0],
            [-2, -2, -2, 0], [2, -2, -2, 0], [-2, -2, -2, 0],
        ];
        this.Render();
    }
    setY() {
        this.mat = [
            [-2, -2, 2, 0], [-2, 2, 2, 0], [2, -2, 2, 0],
            [2, -2, 2, 0], [2, 2, 2, 0], [-2, 2, 2, 0]
        ];
        this.Render();
    }
    // RenderColors(){
    //     this.app.shader.attributes.colors = this.app.gl.getAttribLocation(this.app.shader.program, "colors");
    //     this.app.gl.bindBuffer(this.app.gl.ARRAY_BUFFER,this.app.shader.attributes.colors)
    //     this.app.gl.bufferData(this.app.gl.ARRAY_BUFFER,new Float32Array(this.colors), this.app.gl.STATIC_DRAW);
    // }

}


/*

vertices = [
  // Front face
  -1.0, -1.0,  1.0,0],
   1.0, -1.0,  1.0,0],
   [1.0,  1.0,  1.0,0],
  [-1.0,  1.0,  1.0,0],

  // Back face
  [-1.0, -1.0, -1.0,0],
  [-1.0,  1.0, -1.0,0],
   [1.0,  1.0, -1.0,0],
   [1.0, -1.0, -1.0,0],

  // Top face
  [-1.0,  1.0, -1.0,0],
  [-1.0,  1.0,  1.0,0],
   [1.0,  1.0,  1.0,0],
   [1.0,  1.0, -1.0,0],

  // Bottom face
  [-1.0, -1.0, -1.0,0],
  [ 1.0, -1.0, -1.0,0],
  [ 1.0, -1.0,  1.0,0],
  [-1.0, -1.0,  1.0,0],

  // Right face
   [1.0, -1.0, -1.0,0],
  [ 1.0,  1.0, -1.0,0],
 [  1.0,  1.0,  1.0,0],
 [ 1.0, -1.0,  1.0,0],

  // Left face
  [-1.0, -1.0, -1.0,0],
  [-1.0, -1.0,  1.0,0],
  [-1.0,  1.0,  1.0,0],
  [-1.0,  1.0, -1.0,0],
];








*/