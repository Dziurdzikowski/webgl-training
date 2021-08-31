



/*
  

        this.shader = {
            program: {},
            uniforms: {},
            attributes: {},
        };

    obj.vertexBufferInit = function () { // Create and store data into vertex buffer
        this.vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);

    };
    obj.colorBufferInit = function () { // Create and store data into color buffer
        this.color_buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.color_buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.colors), this.gl.STATIC_DRAW);

    };
    obj.dataBufferInit = function () {// Create and store data into index buffer
        this.indexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), this.gl.STATIC_DRAW);
    };

    
    
    
    obj.buffer = {
        vertex: null,
        create: function () {
            this.vertex = this.gl.createBuffer();
        }.bind(this),
        bind: function (data, type = this.gl.STATIC_DRAW) {
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);// Pass the vertex data to the buffer
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null); // Unbind the buffer
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, data);
        }
    };
      
    obj.shader.coordinates = function (r = 0, g = 0, b = 0, opa = 1) {
        var shader = {};
        shader.form={};
        shader.program=this.gl.createProgram();
        
        shader.vertCode = ' uniform vec4 camera_pos; '+
                          ' uniform vec4 camera_rot; '+
                          ' attribute vec3 colors; '+
                          ' uniform vec4 col; '+
                          ' uniform vec4 u_offset; '+
                          ' attribute vec4 coordinates; '+
                          ' attribute vec4 pos; '+
                          ' varying lowp vec4 vColor; ' + 
                          ' void main(void) {' +
                                             ' gl_Position = (coordinates+u_offset)+(camera_rot+camera_pos);' + 'gl_PointSize = 0.01;' + '  vColor=col; '+
                                             '}';

        shader.fragCode = ' varying lowp vec4 vColor; void main(void) { gl_FragColor = vColor; } ';
       
        shader.vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);// Create a vertex shader object
        this.gl.shaderSource(shader.vertShader, shader.vertCode); // Attach vertex shader source code
        this.gl.compileShader(shader.vertShader); // Compile the vertex shader
        this.gl.attachShader(shader.program, shader.vertShader);
        
        shader.fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);// Create fragment shader object
        this.gl.shaderSource(shader.fragShader,shader.fragCode);// Attach fragment shader source code
        this.gl.compileShader(shader.fragShader);// Compile the fragmentt shader
        this.gl.attachShader(shader.program, shader.fragShader);
        
        this.gl.getProgramInfoLog(shader.program);
        
        
        this.gl.linkProgram(shader.program);
        this.gl.useProgram(shader.program);
        shader.form.uniCoordinates={};
        shader.attr={coordinates:{},color_buffer:{}};
        //shader.form.uniCoordinates.location=gl.getUniformLocation(shader.program, 'uniCoordinates');
        shader.attr.color_buffer.location=this.gl.getAttribLocation(shader.program, "colors");
        shader.attr.coordinates.location=this.gl.getAttribLocation(shader.program, "coordinates");
        
        return shader;
    }.bind(obj);

    
    obj.element = function () {
        var el = {x: 0, y: 0, z: 0, radius: 0.1, vertices: [],colors:[], clear: function () {this.view.clear(); return this; }, color: {r: 0, g: 0, b: 0, opa: 1, set: function (r, g, b, a) { this.r = r;this.g = g; this.b = b; this.opa = a;}}, rotate: {}};
        el.X=function(xx){this.x=xx; return this;};        
        el.Y=function(yy){this.y=yy; return this;};        
        el.Z=function(zz){this.z=zz; return this;};        
        el.rotateX = function (deg) {
            this.vertices = obj.rotateX(this.vertices, deg,this.x,this.y,this.z);
            return this;
        }
        el.rotateY = function (deg) {
            this.vertices = obj.rotateY(this.vertices, deg,this.x,this.y,this.z);
            return this;
        }
        el.rotateZ = function (deg) {
            this.vertices = obj.rotateZ(this.vertices, deg,this.x,this.y,this.z);
            return this;
        }
        el.BufferInit = function () {
            el.vertex_buffer = this.gl.createBuffer(); // Create an empty buffer object to store the vertex buffer
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null); // Unbind the buffer
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, el.vertex_buffer);//Bind appropriate array buffer to it
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(el.vertices), this.gl.STATIC_DRAW);// Pass the vertex data to the buffer
           
        }.bind(this);
        
        el.BufferColorInit = function () {
            el.colors=[];
            el.colors.push(122);
            el.colors.push(212);
            el.colors.push(222);
            el.color_buffer = this.gl.createBuffer(); // Create an empty buffer object to store the vertex buffer
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, el.color_buffer);//Bind appropriate array buffer to it
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(el.colors), this.gl.STATIC_DRAW);

        }.bind(this);
        el.setColor=function(r=0,g=0,b=0,a=1){ this.color.r=r; this.color.g=g; this.color.b=b; this.color.a=a; return this; };
        return el;
    };
    
    

*/