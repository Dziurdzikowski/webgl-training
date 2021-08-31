class Cube extends Element {
    constructor(id,app,mat,indices,colors) {
        super(id,app);
        this.mat=mat;
        this.indices=new Uint16Array(indices);
        this.colors=colors;
         this.draw.Type= this.draw.Types.Triangles;
        //  this.haveColors=true;
         this.draw.Mode='drawElements';
         this.bufferType="ELEMENT_ARRAY_BUFFER";
        this.Render();
    }

}
