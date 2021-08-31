function Camera(){
    this.up=false;
    this.rotation=[];
    this.target=[0,0,0,0];
    this.upVec=[0,2,0,0];
    this.mousepos={ x:0,y:0,z:0,d:0};
    this.mouseOptions={positionIntense:1,rotationIntense:25,inverse:false,zoomIntense:10};
    this.Position =new Position();
    this.Position.set({x: 0, y: 0, z: 0, d: 0});
    this.Rotation=new Rotation(); 
    this.Rotation.set({x: 0, y: 0, z: 0, d: 0});
    return this;
};