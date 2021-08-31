
class Element extends ElementInterface{
    constructor(id,app,data={}) {
        
        super(id,app,data);
        app.Elements[id]=this;
        this.vertices = [];
        this.colors = [];
        this.Buffer={};
        this.mat = [];
        this.properties=new ElementInterfaceProperties();
        this.properties.Color=new Color()
        this.properties.Position=new Position();
        this.properties.Rotation=new Rotation();
        this.spin={values:{x:0,y:0,z:0},x:false,y:false,z:false,start:function(axis){this[axis]=true;},stop:function(axis){this[axis]=false;} };        
        this.tmp={};
        this.haveColors=false;
        this.draw={
            Type:"LINE_LOOP",
            Types:{
                LineLoop:"LINE_LOOP",
                LineStrip:"LINE_STRIP",
                Lines:"LINES",
                Triangles:"TRIANGLES",
                TriangleStrip:"TRIANGLE_STRIP",
                TriangleFan:"TRIANGLE_FAN",
                Quads:"QUADS",
                QuadStrip:"QUAD_STRIP",
                Polygon:"POLYGON",
                Points:"Points"
            },
            Mode:"drawArrays",
            offset:0
        };
        this.visible=true;

        this.pointSize=0.001;
        this.bufferType="ARRAY_BUFFER";
        this.bufferData=new Float32Array();
        this.MX=new Matrix();
        this.Render();
        this.update =true;
    }
    UpdatePos(pos = { x: 0, y: 0, z: 0, d: 0 }) {
            this.position.x = pos.x;
            this.position.y = pos.y;
            this.position.d = pos.d;
     return this;
    }
    hide(){
        this.visible=false;
        this.container.style.display='none';
        return this;
    }
    show(){
        this.visible=true;
        this.container.style.display='block';
        return this;
    }
    setBuffers() {
            this.gl.bufferData(this.gl[this.bufferType], new Float32Array(this.vertices), this.gl.STATIC_DRAW);// Pass the vertex data to the buffer
         return this;}
    spining(){
            if(this.spin.x===true){
                if(this.spin.values.x>2){
                    this.spin.values.x=0;
                }
                this.spin.values.x+=0.01;
                this.rotateX(this.spin.values.x);
             }
             if(this.spin.y===true){
                if(this.spin.values.y>2){
                    this.spin.values.y=0;
                }
                this.spin.values.y+=0.01;
                this.rotateY(this.spin.values.y);
             }
             if(this.spin.z===true){
                 if(this.spin.values.z>2){
                    this.spin.values.z=0;
                }
                this.spin.values.z+=0.01;
                this.rotateZ(this.spin.values.z);
             }
             this.Render();
        return this;}
    Render(){
        this.RotateTransform();
        this.vertices = new Float32Array(this.MX.toArr(this.mat));
        return this;
    }
    Draw(shader) {
        // this.spining();
         if(this.haveColors===true){
             
             shader.gl.bindBuffer(shader.gl.ARRAY_BUFFER, shader.buffers.colors);
             shader.gl.bufferData(shader.gl.ARRAY_BUFFER,this.colors, shader.gl.STREAM_DRAW);
             shader.gl.vertexAttribPointer(shader.attributes.colors, 4, shader.gl.FLOAT, false, 0, 0);
             shader.gl.enableVertexAttribArray(shader.attributes.colors);

         }
        
        shader.uniformUpdateElementValues(this.pointSize,this.properties.Position,this.properties.Color,this.haveColors);
        if (this.bufferType == "ARRAY_BUFFER") {
            shader.gl.bufferData(shader.gl.ARRAY_BUFFER, this.vertices, shader.gl.STREAM_DRAW);// Pass the vertex data to the buffer   
        } else {
            shader.gl.bufferData(shader.gl.ELEMENT_ARRAY_BUFFER,this.indices, shader.gl.STREAM_DRAW);
            shader.gl.bufferData(shader.gl.ARRAY_BUFFER, this.vertices, shader.gl.STREAM_DRAW);
            
        }
        shader.gl.vertexAttribPointer(shader.attributes.locPosition, 4, shader.gl.FLOAT, false, 0, 0);
        shader.gl.enableVertexAttribArray(shader.attributes.locPosition);


        if (this.draw.Mode === "drawArrays") {
            shader.gl[this.draw.Mode](shader.gl[this.draw.Type], [this.draw.offset],  (this.vertices.length / 4));
        } else {
            console.log(shader.gl[this.draw.Type])
            
            shader.gl.drawElements(shader.gl[this.draw.Type], this.indices.length , shader.gl.UNSIGNED_SHORT,0);
        }

    }

    RotateTransform() {
        for (var ii = 0; ii < this.mat.length; ii++) {
            this.MX.Rotation.X(this.properties.Rotation.values.x);
            this.mat[ii] = this.MX.Rotation.xTransform(this.mat[ii]);
            this.MX.Rotation.Y(this.properties.Rotation.values.y);
            this.mat[ii] = this.MX.Rotation.yTransform(this.mat[ii]);
            this.MX.Rotation.Z(this.properties.Rotation.values.z);
            this.mat[ii] = this.MX.Rotation.zTransform(this.mat[ii]);
        }
        return this.mat;
    };
    rotateX(spin=0) {
         this.MX.Rotation.X(this.properties.Rotation.values.x+spin);
        for (var ii = 0; ii < this.mat.length; ii++) {
            this.mat[ii] = this.MX.Rotation.xTransform(this.mat[ii]);
        }
        return this;
    };
    rotateY(spin=0) {
          this.MX.Rotation.Y(this.properties.Rotation.values.y+spin);
        for (var ii = 0; ii < this.mat.length; ii++) {
            this.mat[ii] = this.MX.Rotation.yTransform(this.mat[ii]);
        }
        return this;
    };

    rotateZ(spin=0) { 
       this.MX.Rotation.Z(this.properties.Rotation.values.z+spin);
        for (var ii = 0; ii < this.mat.length; ii++) {
            this.mat[ii] = this.MX.Rotation.zTransform(this.mat[ii]);
        }
        return this;
    };
    
}
class Property extends ElementInterfaceProperty{
    constructor(id){
        super(id);
        this.id=id;
        this.values={};
        this.values.interface={};
        this.isProperty=true;
    }
    get() { return this.values; }
}

class Position extends Property { 
    constructor(id="Position"){
         super(id);
         this.values=Object.assign(this.values,{x: 0, y: 0, z: 0, d: 1});
    }
    getArray(){return [this.values.x,this.values.y,this.values.z,this.values.d]; }
    set(input) {  this.values.x = input.x; this.values.y = input.y; this.values.z = input.z; this.values.d = input.d; return this; }
    X(x = 0){ this.values.x = x; return this; }
    Y(y = 0){ this.values.y = y; return this; }
    Z(z = 0){ this.values.z = z; return this; }
}
class Rotation extends Position{ 
    constructor(id="Rotation"){
        super(id);
        this.cos=0;
        this.sin=0; 
    }
    Cos(deg) { return Math.cos(Math.PI * (deg / 180))};
    Sin(deg) { return Math.sin(Math.PI * (deg / 180))};
    }   
class Color extends Property{
     constructor(id="Color"){
         super(id);
         this.values=Object.assign(this.values,{r: 0, g: 0, b: 0, a: 1});
         }
         getArray(){
              return [this.values.r,this.values.g,this.values.b,this.values.a];
         }
         set(input) {  this.values.r = input.r; this.values.g = input.g; this.values.b = input.b; this.values.a = input.a; return this; }

  }   