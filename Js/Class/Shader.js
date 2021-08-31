class Shader {

    constructor(__super) {
        this.__super = __super;
        this.gl= this.__super.interface.getGl();
        this.program = {};
        this.vertShader = {};
        this.fragShader = {};
        this.attributes = {};
        this.uniforms = {};
        this.UpdatesList = [];
        this.perspectiveData={fieldOfView:120,aspect:{w:1050,h:950},near:-1,far:1};
        this.call=null;
        this.img="";
        this.buffers={vertex:{},colors:{},elements:{}};
        this.buffers.vertex = this.gl.createBuffer();
        this.buffers.colors = this.gl.createBuffer();
        this.buffers.elements = this.gl.createBuffer();
        this.BindBuffers();

    }
    BindBuffers(){
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.buffers.elements);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.vertex);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.colors);
    }
    Update(){
        for(var i=0;i < this.UpdatesList.length;i++){
            this.UpdatesList[i](this.___super);
        }
    }
    addUpdate(call,binded){
        this.UpdatesList.push(call.bind(binded));
    }
    shaderInit() {
        this.program = this.gl.createProgram();
        this.vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(this.vertShader, this.getVertexShaderCode());
        this.gl.compileShader(this.vertShader);
        this.gl.attachShader(this.program, this.vertShader);

        this.fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);// Create fragment shader object
        this.gl.shaderSource(this.fragShader, this.getFragmentCode());// Attach fragment shader source code
        this.gl.compileShader(this.fragShader);// Compile the fragmentt shader
        this.gl.attachShader(this.program, this.fragShader);

        this.gl.linkProgram(this.program);
        
        this.gl.useProgram(this.program);
        this.__super.axis();
        this.attributes.locPosition = this.gl.getAttribLocation(this.program, "verts");
        this.attributes.locColors = this.gl.getAttribLocation(this.program, "colors");
        this.uniformInit();
        return this.__super;
    };
    
    glInit(){
        console.log(this);
        this.gl.clearColor(0, 0, 0,0);       
        this.gl.clearDepth(1.00);       
        this.gl.depthMask(true); 
       // this.gl.getParameter(this.gl.DEPTH_CLEAR_VALUE);
        //this.gl.glShadeModel(this.gl.GL_SMOOTH);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.enable(this.gl.DEPTH_TEST);
           
        
    }
    getImg(){
         this.call=this.__super.interface.canvas.toDataURL.bind(this.__super.interface.canvas);
    }
    getFragmentCode() {
        return ' varying highp vec4 vColor; void main(void) { gl_FragColor = vColor; } ';
    }
    getVertexShaderCode() {
        return ' uniform mat4 perspection; ' +
            ' uniform vec4 camera_rot; ' +
            'uniform vec4 camera_pos;' +
            'uniform vec4 camera_ver;' +
            ' attribute vec4 colors; ' +
            ' uniform vec4 col; ' +
            ' uniform bool hasColors; ' +
            ' uniform vec4 off; ' +
            ' uniform mat4 perspective; ' +
            ' uniform mat4 view; ' +
            ' uniform mat4 viewModel; ' +
            ' uniform mat4 model; ' +
            ' uniform float pointSize; ' +
            ' uniform vec4 vertsUni; ' +
            ' attribute vec4 verts; ' +
            ' varying highp vec4 vColor; ' +
            ' int one = 1;' +
            ' vec4 display_pos;' +
            ' vec4 ver;' +
            'float x;' +
            ' void main(void) {' +
           ' gl_Position = perspective*view*model*vec4(verts[0]+off[0],verts[1]+off[1],verts[2]+off[2],verts[3]+off[3]);' +
                      ' gl_PointSize = pointSize; ' +
            
             'if(hasColors){ '+
               ' vColor=colors; '+
                ' }else{ '+
                '  vColor=col; ' +
                    ' }'+
              
            ' }';
 //           'ver = gl_Vertex;'
            /*
            oid main(void) {' + 
            
            'display_pos=vec4('+
                '(verts[0]/(camera_pos[2]))+off[0]+camera_pos[0],'+
                '(verts[1]/(camera_pos[2]))+off[1]+camera_pos[1],'+
                'verts[2]+off[2]+camera_pos[2],'+
                'verts[3]+off[3]+camera_pos[3]+camera_pos[2]); '+' gl_Position = display_pos;' + ' gl_PointSize = 0.0001; ' + '  vColor=col; ' +
                */
            //    // ' display_pos=vec4( ((verts[0]/camera_pos[3])+off[0]+camera_pos[0]),( (verts[1]/camera_pos[3])+off[1]+camera_pos[1]),(verts[2]+off[2]+camera_pos[2]),(verts[3]+off[3]+camera_pos[3]) ); '+
            //  'display_pos=vec4('+
            //     ' (perspective[0][0]*view[0][0]*verts[0])+(perspective[0][1]*view[0][1]*verts[1])+(perspective[0][2]*view[0][2]*verts[2])+(perspective[0][3]*view[0][3]) ,'+
            //     ' (perspective[1][0]*view[1][0]*verts[0])+(perspective[1][1]*view[1][1]*verts[1])+(perspective[1][2]*view[1][2]*verts[2])+(perspective[1][3]*view[1][3]) ,'+
            //     ' (perspective[2][0]*view[2][0]*verts[0])+(perspective[2][1]*view[2][1]*verts[1])+(perspective[2][2]*view[2][2]*verts[2])+(perspective[2][3]*view[2][3]) ,'+
            //     ' (perspective[3][0]*view[3][0]*verts[0])+(perspective[3][1]*view[3][1]*verts[1])+(perspective[3][2]*view[3][2]*verts[2])+(perspective[3][3]*view[3][3]) ); '+
            //  ' gl_Position = vec4( (display_pos[0] +off[0]) , (display_pos[1]+off[1]) , ( display_pos[2]+off[2] ), (display_pos[3]) );' +
            // 'display_pos=vec4('+
            //     ' (view[0][0]*verts[0])+(view[0][1]*verts[1])+(view[0][2]*verts[2])+(view[0][3]*verts[3]) ,'+
            //     ' (view[1][0]*verts[0])+(view[1][1]*verts[1])+(view[1][2]*verts[2])+(view[1][3]*verts[3]) ,'+
            //     ' (view[2][0]*verts[0])+(view[2][1]*verts[1])+(view[2][2]*verts[2])+(view[2][3]*verts[3]) ,'+
            //     ' (view[3][0]*verts[0])+(view[3][1]*verts[1])+(view[3][2]*verts[2])+(view[3][3]*verts[3]) ); '+
         //  ' gl_Position = vec4( (display_pos[0] +off[0]) , (display_pos[1]+off[1]) , ( display_pos[2]+off[2] ), (display_pos[3]) );' +
          
          
          
          
          
          // !!!! ' gl_Position = perspective*view*model*vec4(verts[0],verts[1],verts[2],verts[3]);' +
              
              
              
              
               // 'display_pos=vec4(' +
            // ' (verts[0]+off[0])*view[0][0]+(verts[1]+off[1])*view[0][1]+(verts[2]+off[2])*view[0][2]  ,' +
            // ' (verts[0]+off[0])*view[1][0]+(verts[1]+off[1])*view[1][1]+(verts[2]+off[2])*view[1][2]  ,' +
            // ' (verts[0]+off[0])*view[2][0]+(verts[1]+off[1])*view[2][1]+(verts[2]+off[2])*view[2][2] ,' +
            // '  verts[3]* view[3][3]  ); ' +
            // //   ' gl_Position = vec4( (display_pos[0] +off[0]+camera_pos[0]) , (display_pos[1]+off[1]+camera_pos[1]) , ( display_pos[2]+off[2]+camera_pos[2] ), (display_pos[3]+camera_pos[3]) );' +
            //' gl_Position = vec4( ((verts[0]/camera_pos[2]))+camera_pos[0]+off[0] ,((verts[1]/camera_pos[2]))+camera_pos[1]+off[1] , (verts[2])+camera_pos[2]+off[2] , (verts[3])+camera_pos[3]+off[3] );' +
            // ' gl_Position = vec4( display_pos[0]+off[0] ,display_pos[1]+off[1] ,display_pos[2]+off[2]  ,display_pos[3]]);' +

    }
    uniformInit(){
        this.gl.useProgram(this.program);
        this.uniforms.locCol = this.gl.getUniformLocation(this.program, "col");
        this.uniforms.locPointSize = this.gl.getUniformLocation(this.program, "pointSize");
        this.uniforms.locPerspective = this.gl.getUniformLocation(this.program, "perspective");
        this.uniforms.locView = this.gl.getUniformLocation(this.program, "view");
        this.uniforms.locViewModel = this.gl.getUniformLocation(this.program, "viewModel");
        this.uniforms.locModel = this.gl.getUniformLocation(this.program, "model");
        this.uniforms.locOff = this.gl.getUniformLocation(this.program, "off");
        this.uniforms.locHasColors = this.gl.getUniformLocation(this.program, "hasColors");
    }
     uniformUpdateElementValues(vpointSize,vPosition,vColor,hasC) {
        this.gl.uniform1f(this.uniforms.locPointSize,vpointSize);
        this.gl.uniform4fv(this.uniforms.locOff, vPosition.getArray());
        this.gl.uniform4fv(this.uniforms.locCol, vColor.getArray());
        this.gl.uniform1i (this.uniforms.locHasColors, (hasC===true?1:0));
    }
    debugShaderLog(){
       return this.gl.getShaderInfoLog(this.vertShader); 
    }
    uniformUpdateViewValues(){
     // this.gl.depthFunc(this.gl.GL_ALWAYS);
    // glStencilOp(GL_KEEP, GL_KEEP, GL_REPLACE);
    // glStencilMask(0xFF);

      //  a[1]=this.__super.MX.perspective(this.perspectiveData.fieldOfView,(this.perspectiveData.aspect.w/this.perspectiveData.aspect.h),this.perspectiveData.near,this.perspectiveData.far);

        //perspectiveData={fieldOfView:120,aspect:{w:1050,h:950},near:-5,far:5};
        // this.__super.MX.multiply(,this.__super.MX.perspectiveProjection(45,(1920/1080),-20,20),this.__super.MX.modelMatrix);
        
        //console.log(a);
        this.gl.uniformMatrix4fv(this.uniforms.locPerspective, false, this.__super.MX.toArr(this.__super.MX.perspectiveProjection(this.perspectiveData.fieldOfView,(this.perspectiveData.aspect.w/this.perspectiveData.aspect.h),this.perspectiveData.near,this.perspectiveData.far)));
        this.gl.uniformMatrix4fv(this.uniforms.locModel, false, this.__super.MX.toArr(this.__super.MX.modelMatrix));
        this.viewLookAt =this.__super.MX.LookAtRH(this.__super.MX.rotateTransform([this.__super.camera.Position.getArray()],this.__super.camera.Rotation.values,true),[0,0,0,0],[0,1,0,0,0.1*this.__super.camera.Position.z]);
        this.gl.uniformMatrix4fv(this.uniforms.locViewModel,false,this.__super.MX.toArr(this.__super.MX.modelViewMatrix));
        this.gl.uniformMatrix4fv(this.uniforms.locView,false,this.__super.MX.toArr(this.viewLookAt));
     //   a=this.__super.MX.multiply(this.__super.MX.toArr(a[0]),this.__super.MX.toArr(a[1]),this.__super.MX.toArr(a[2]));
        
        //  this.gl.uniformMatrix4fv(this.shader.uniforms.locView,false,this.MX.lookAt(this.MX.toArr(this.MX.perspectiveProjection(45,(1920/1080),-20,20)),[0,0,0,1] ,[0,0,0,Math.abs(0.3*this.camera.Position.values.d)]) );


// !!!!!!!! var viewMX = this.__super.MX.lookAt(a[1],this.__super.MX.rotateTransform([this.__super.camera.Position.getArray()],this.__super.camera.Rotation.values,true),[0,0,0,0.03*this.__super.camera.Position.values.d],this.__super.MX.vUp);	



//var viewMX = this.__super.MX.rotateTransform([this.__super.camera.Position.getArray()],this.__super.camera.Rotation.values,true);	
  //    console.log(viewMX);
// this.__super.MX.seclookAt(this.__super.MX.rotateTransform([[0,3,-20,0]],this.__super.camera.Rotation.values,true),this.__super.MX.rotateTransform([[0,0,0,0]],this.__super.camera.Rotation.values,true),this.__super.MX.center,this.__super.MX.vUp);	
        //     var a = this.MX.toArr(this.cam_rotate([this.camera.Position.getArray()],this.camera.Position.values));
    //    console.log(viewMX);
    //    console.log("CAMERA : ");
     //var mx=this.__super.MX.rotateTransform([this.__super.camera.Position.getArray()],this.__super.camera.Rotation.values,true);

 //    this.__super.MX.modelViewMatrix[0][3]=-this.__super.camera.Position.values.x;
    //  this.__super.MX.modelViewMatrix[0]=this.__super.MX.rotateTransform(this.__super.MX.modelViewMatrix[0],this.__super.camera.Rotation.values,true);
 //    this.__super.MX.modelViewMatrix[1][3]=-this.__super.camera.Position.values.y;
    //  this.__super.MX.modelViewMatrix[1]=this.__super.MX.rotateTransform(this.__super.MX.modelViewMatrix[1],this.__super.camera.Rotation.values,true)
  //   this.__super.MX.modelViewMatrix[2][3]=-this.__super.camera.Position.values.z;
 //    this.__super.MX.modelViewMatrix[3][3]=-this.__super.camera.Position.values.d;
    //    this.__super.MX.modelViewMatrix[2]= this.__super.MX.rotateTransform(this.__super.MX.modelViewMatrix[2],this.__super.camera.Rotation.values,true)
   //  mx=this.__super.MX.rotateTransform(mx,{x:(-this.__super.camera.Rotation.values.x),y:(-this.__super.camera.Rotation.values.y),z:(-this.__super.camera.Rotation.values.z)});
    // console.log(mx);
    //    console.log(this.__super.camera.Rotation.getArray());
         
           
      //    this.gl.uniformMatrix4fv(this.uniforms.locView,false, this.__super.MX.toArr(viewMX));
        //  this.gl.uniformMatrix4fv(this.uniforms.locView,false, 	);
               // this.gl.uniformMatrix4fv(this.shader.uniforms.locView,false,this.MX.lookAt([this.camera.Position.values.x,this.camera.Position.values.y,10,this.camera.Position.values.d],this.MX.toArr(this.cam_rotate([[0.0, 3.0, 0,1]],this.camera.Rotation.values)),[0.0,0.0,0,Math.abs( (0.4)*this.camera.Position.values.d )] ));
        // this.gl.uniformMatrix4fv(this.shader.uniforms.locView,false,this.MX.lookAt(this.MX.toArr(this.cam_rotate([[this.camera.Position.values.x,this.camera.Position.values.y,-10,this.camera.Position.values.d]],this.camera.Rotation.values)),[0.0, 0.0, 0,0],[0.0,0,0,0.04] ));
        // var target=this.MX.toArr(this.cam_rotate([[10,10,15,1]],this.camera.Rotation.values));
        //  this.shader.uniforms.locCols = this.gl.getUniformLocation(this.shader.program, "colors");
        // this.gl.uniform4fv(this.shader.uniforms.locCols, this.MX.toArr(ccolors));
       
    }



}