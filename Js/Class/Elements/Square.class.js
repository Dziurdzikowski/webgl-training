class Square extends Element {
    constructor(id,app,from,to,nr_false) {
        super(id,app);
        this.draw.Type="TRIANGLE_STRIP";

         this.mat = [
               
                 
                   [from[0], from[1], from[2], from[3]],
                 [from[0], from[1], -from[2], from[3]],
                 [to[0], to[1], to[2], to[3]],
                 [to[0], -to[1], to[2], to[3]],
                 [from[0],-from[1], from[2], from[3]],
                 [to[0], to[1], -to[2], to[3]],
                //  [-1,-1,-1, 0],[-1,-1, 1, 0],[ 1,-1, 1, 0],
                //  [-1,-1,-1, 0],[ 1,-1,-1, 0],[-1,-1,-1, 0], 
                //  [-1,-1, 1, 0],[-1, 1, 1, 0],[ 1,-1, 1, 0],
                //  [ 1,-1, 1, 0],[ 1, 1, 1, 0],[-1, 1, 1, 0]
                    ];
        this.color.set(1, 1.5,0,1);
    //   this.haveColors=true;
    this.this.Render();
    }

    RenderColors(){
        this.app.shader.attributes.colors = this.app.gl.getAttribLocation(this.app.shader.program, "colors");
        console.log(this.app.shader.attributes.colors)
        this.app.gl.bindBuffer(this.app.gl.ARRAY_BUFFER,this.app.shader.attributes.colors)
        this.app.gl.bufferData(this.app.gl.ARRAY_BUFFER,new Float32Array(this.colors), this.app.gl.STATIC_DRAW);
               
    }


}
