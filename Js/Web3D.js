


var Web3D = function (id_canvas, id_interface) {
    var obj = { shader: {}, xhr: {}, groups: {}, view: {}, Elements: {}, calc: {}, MX: {}, vertexBuffer: null, shader: { attributes: {}, uniforms: {} }, vertShader: null, matrix: [], vertices: [], colors: [], indices: [], center: { x: 0, y: 0, z: 0 }, vertCode: null, fragCode: null, currentColor: { r: 255, g: 255, b: 255 } };
    obj.camera = new Camera();
    obj.camera.Position.values.z = -10;
    obj.camera.Position.values.y = -5;
    obj.camera.Position.values.x = -5;
    obj.camera.Rotation.values.x = 45;
    obj.camera.Rotation.values.y = -70;
    obj.interface = new UserInterface(obj, id_interface, id_canvas);
    obj.shader = new Shader(obj);
    obj.MX = new Matrix();
    obj.Init = function () {

        this.calcCenterPos();
        this.interface.controlInit();
        this.aspect = this.interface.canvas.width / this.interface.canvas.height;
        this.shader.shaderInit();
        this.shader.glInit();
        this.SceneInit();
        return this;
    };
    obj.FpsMeterActive=false;
    obj.FpsMeter =function () {
        this.FpsMeter={overlay:{}, lastCount:{}, lastTime:{}, timeoutFun:{}};

            this.FpsMeter.overlay = document.createElement('div');
            this.FpsMeter.overlay.style.background = 'rgba(0, 0, 0, .7)';
            this.FpsMeter.overlay.style.bottom = '0';
            this.FpsMeter.overlay.style.color = '#fff';
            this.FpsMeter.overlay.style.display = 'inline-block';
            this.FpsMeter.overlay.style.fontFamily = 'Arial';
            this.FpsMeter.overlay.style.fontSize = '14px';
            this.FpsMeter.overlay.style.lineHeight = '12px';
            this.FpsMeter.overlay.style.padding = '5px 8px';
            this.FpsMeter.overlay.style.position = 'fixed';
            this.FpsMeter.overlay.style.right = '0';
            this.FpsMeter.overlay.style.zIndex = '1000000';
            this.FpsMeter.overlay.innerHTML = 'FPS: -';
            this.FpsMeter.btn=document.createElement("button");
            this.FpsMeter.btn.innerText="Get photo";
            this.FpsMeter.btn.style.position="fixed";
            this.FpsMeter.btn.style.bottom="0";
            this.FpsMeter.btn.onclick=this.shader.getImg.bind(this.shader);            
            document.body.appendChild(this.FpsMeter.overlay);
            document.body.appendChild(this.FpsMeter.btn);
            //this.FpsMeter.overlay.append(this.FpsMeter.btn);
            this.FpsMeter.lastCount = window.mozPaintCount;
            this.FpsMeter.lastTime = Date.now();

            this.FpsMeter.FrameUpdate = function () {
                var curCount, curTime;
                curCount = window.mozPaintCount;
                curTime = Date.now();
                this.FpsMeter.overlay.innerHTML = 'FPS: ' + ((curCount - this.FpsMeter.lastCount) / (curTime - this.FpsMeter.lastTime) * 1000).toFixed(2);
                this.FpsMeter.lastCount = curCount;
                this.FpsMeter.lastTime = curTime;
            }.bind(this);
            this.FpsMeterActive=true;
        }.bind(obj);

    obj.SceneInit = function (wielkosc = 8, gestosc = 10) {
        var from = (-1 * wielkosc);
        var to = wielkosc;
        var stripX = [];
        var x = from;
        var tmp2 = from;
        var y = from;
        var z = to;

        var gestosc_wartosc = (to * 2) / gestosc;
        for (var i = 0; i <= gestosc; i++) {
            stripX[i] = new Strip("stripX_" + i, this, [x, y, z, 1], [(-1 * x), y, z, 1]);
            stripX[(i + gestosc)] = new Strip("stripX_" + (i + gestosc), this, [tmp2, y, x, 1], [tmp2, y, (-1 * x), 1]);
            stripX[i].hide().properties.Color.set({ r: 1, g: 0, b: 0, a: 1 });
            stripX[(i + gestosc)].hide().properties.Color.set({ r: 1, g: 0, b: 0, a: 1 });
            z -= gestosc_wartosc;
            tmp2 += gestosc_wartosc;
        }
        x = from;
        tmp2 = from;
        y = to;
        z = to;
        var stripY = [];
        for (var i = 0; i <= gestosc; i++) {
            stripY[i] = new Line("stripY_" + i + "", this, [x, y, z, 1], [(-1 * x), y, z, 1]);
            stripY[(i + gestosc)] = new Line("stripY_" + (i + gestosc) + "", this, [tmp2, x, z, 1], [tmp2, (-1 * x), z, 1]);
            stripY[(i + gestosc)].hide().properties.Color.set({ r: 0, g: 1, b: 0, a: 1 });
            stripY[i].hide().properties.Color.set({ r: 0, g: 1, b: 0, a: 1 });
            y -= gestosc_wartosc;
            tmp2 += gestosc_wartosc;
        }
        z = to;
        x = from;
        tmp2 = from;
        y = from;
        var stripZ = [];
        for (var i = 0; i <= gestosc; i++) {
            stripZ[i] = new Strip("stripZ_" + i + "", this, [x, y, z, 1], [x, (-1 * y), z, 1]);
            stripZ[(i + gestosc)] = new Strip("stripZ_" + (i + gestosc) + "", this, [x, tmp2, y, 1], [x, tmp2, (-1 * y), 1]);
            stripZ[(i + gestosc)].hide();
            stripZ[(i + gestosc)].properties.Color.set({ r: 0, g: 0, b: 1, a: 1 });
            stripZ[i].hide();
            stripZ[i].properties.Color.set({ r: 0, g: 0, b: 1, a: 1 });
            z -= gestosc_wartosc;
            tmp2 += gestosc_wartosc;
        }



    }

    obj.getPointsComplete = function (response) {
        console.log(response.target.response);
        var r = JSON.parse(response.target.response);
        console.log(JSON.parse(response.target.response));
        for (var g in r) {
            this.groups[g] = new PointsGroup(g, this, r[g]);
            

        }
    };

    obj.getPoints = function (file = "./dane.json") {
        this.xhr = new XMLHttpRequest();
        this.xhr.onload = this.getPointsComplete.bind(this);
        this.xhr.open("get", file, true);
        this.xhr.send();
    }

    obj.calcCenterPos = function () {
        this.center.x = (parseFloat(this.interface.canvas.width) / 2);
        this.center.y = (parseFloat(this.interface.canvas.height) / 2);
        this.MaxRadius = (this.interface.canvas.width > this.interface.canvas.height ? (parseFloat(this.interface.canvas.height) / 2) : (parseFloat(this.interface.canvas.width) / 2));
    };
    obj.axis = function () {
        this.Xaxis = new Line("Xaxis", this, [-2, 0, 0, 0], [2, 0, 0, 0]);
        this.Xaxis.properties.Color.set({ r: 1, g: 0, b: 0, a: 1 });
        this.Yaxis = new Line("Yaxis", this, [0, -2, 0, 0], [0, 2, 0, 0]);
        this.Yaxis.properties.Color.set({ r: 0, g: 1, b: 0, a: 1 });
        this.Zaxis = new Line("Zaxis", this, [0, 0, -2, 0], [0, 0, 2, 0]);
        this.Zaxis.properties.Color.set({ r: 0, g: 0, b: 1, a: 1 });
    };

    obj.scena = [[-2, -2, -2, 1], [-2, -2, 2, 1], [2, -2, 2, 1], [2, -2, -2, 1], [-2, -2, -2, 1]];
    obj.scenaColors = [[121, 1, 0, 1], [1, 121, 0, 1], [121, 121, 1, 1], [121, 1, 121, 1], [121, 121, 121, 1]];
    obj.view.clear = function (r = 0, g = 0, b = 0, opa = 1) {
        this.shader.gl.clearColor(r, g, b, opa);  // Clear the canvas
        this.shader.gl.clear(this.shader.gl.COLOR_BUFFER_BIT | this.shader.gl.GL_DEPTH_BUFFER_BIT); // Clear the color buffer bit

        this.shader.gl.enable(this.shader.gl.DEPTH_TEST); // Enable the depth test
        this.shader.gl.viewport(0, 0, this.interface.canvas.clientWidth, this.interface.canvas.clientHeight); // Set the view port
        this.shader.gl.bufferData(this.shader.gl.ARRAY_BUFFER, new Float32Array(this.MX.toArr(this.scena)), this.shader.gl.STATIC_DRAW);// Pass the vertex data to the buffer   
        this.shader.gl.useProgram(this.shader.program);

    }.bind(obj);
    obj.Draw = function () {
        if(this.FpsMeterActive){ this.FpsMeter.FrameUpdate();}
        this.interface.constructInterface(this);
        this.shader.uniformUpdateViewValues();
        //this.UpdateCamera();
        for (var element in this.Elements) {
            this.Elements[element].Draw(this.shader);
        }
    };

    obj.cam_rotate = function (m, vec3) {
        var tmp = [];
        for (var ii = 0; ii < m.length; ii++) {
            this.MX.Rotation.X(vec3.x);
            tmp[ii] = this.MX.Rotation.xTransform(m[ii]);
            this.MX.Rotation.Y(vec3.y);
            tmp[ii] = this.MX.Rotation.yTransform(tmp[ii]);
            this.MX.Rotation.Z(vec3.z);
            tmp[ii] = this.MX.Rotation.zTransform(tmp[ii]);
        }

        return tmp;
    };
    obj.UpdateCamera = function () {
        // this.camera.trans=this.MX.rotateTransform([this.camera.Position.getArray()],this.camera.Rotation.values);
        // this.shader.uniforms.locCamPos = this.shader.gl.getUniformLocation(this.shader.program, "camera_pos");
        // this.shader.gl.uniform4fv(this.shader.uniforms.locCamPos,this.MX.toArr([this.camera.Position.getArray()]));
        // this.shader.uniforms.locCamRot = this.shader.gl.getUniformLocation(this.shader.program, "camera_rot");
        // this.shader.gl.uniform4fv(this.shader.uniforms.locCamRot,this.camera.Rotation.getArray());
    }


    obj.Update=function(){
        
        this.view.clear(1, 1, 1, 1);
        this.Draw();
         if(typeof this.shader.call == "function"){
            var a=this.shader.call("image/jpeg",1.00);
            // if(typeof this.shader.img.remove !=="undefined"){
            //     this.shader.img.remove();
            // }
             this.shader.img= document.createElement("a");
            this.shader.img.href=a;
            this.shader.img.target="_blank";
            this.shader.img.innerText="Zdjecie";
            this.shader.img.style.position="fixed";
            this.shader.img.style.left="20vw";
            this.shader.img.style.background="red";
            this.shader.img.style.padding="10px";
            this.shader.img.onclick=function(){ this.remove(); }.bind(this.shader.img);
            this.FpsMeter.btn.after(this.shader.img);

            this.shader.call=null;
        }
        window.requestAnimationFrame(this.Update);
       
    }.bind(obj);

    return obj.Init();
}
