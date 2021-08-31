class UserInterface {
    constructor(__super, parent_id, id_canvas) {
        this.__super = __super;
        this.container = document.getElementById(parent_id);
        this.ElementsContainer = document.createElement("div");
        this.ElementsContainer.id = "ElementsContainer";

        // this.Options[0]=new ControlOptions(this.ElementsContainer);
        this.OptionsContainer = document.createElement("div");
        this.OptionsContainer.id = "OptionsContainer";
        this.OptionsContainer.style.display = "none";
        this.Options = new Options(this.__super, this.OptionsContainer);
        this.MenuBtn = document.getElementById("InterfaceMenuBtn");
        this.MenuBtn.tog = false;
        this.MenuBtn.onclick = this.menuToggle.bind(this);
        this.container.appendChild(this.ElementsContainer);
        this.container.appendChild(this.OptionsContainer);
        this.canvas = document.getElementById(id_canvas);
        window.addEventListener('resize', this.updateRatio.bind(this), false);
        this.canvas.height = this.canvas.clientHeight;
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.ratio = this.canvas.clientWidth / this.canvas.clientHeight;
        this.Que = [];
    }
    
    menuToggle() {
        if (this.MenuBtn.tog === true) {
            this.OptionsContainer.style.display = "none";
            this.ElementsContainer.style.display = "block";
            this.MenuBtn.tog = false;
        } else {
            this.ElementsContainer.style.display = "none";
            this.OptionsContainer.style.display = "block";
            this.MenuBtn.tog = true;
        }
    }

    updateRatio() {
        this.canvas.height = this.canvas.clientHeight;
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.ratio = this.canvas.clientWidth / this.canvas.clientHeight;
        this.__super.shader.perspectiveData.aspect.w = this.canvas.clientWidth;
        this.__super.shader.perspectiveData.aspect.h = this.canvas.clientHeight;

        this.__super.shader.gl.viewport(0, 0, this.canvas.clientWidth, this.canvas.clientHeight); // Set the view port
    }
    addElement(element) {
        this.ElementsContainer.append(element.container);
    }
    constructInterface(app) {
        if (this.Que.length > 0) {
            var tmp;
            for (var z = 0; z < this.Que.length; z++) {
                if (typeof this.Que[z] == "function") {
                    this.Que[z](app);
                }
            }
            this.Que = [];
        }
    }
    controlInit() {
        this.__super.addElement = function (obj) { this.__super.Elements[obj.id] = this.addElement(obj); }.bind(this.__super);
        this.canvas.onscroll = this.moveZ.bind(this.__super);
        this.canvas.onwheel = this.moveZ.bind(this.__super);
        this.canvas.onmousedown = this.mousedown.bind(this.__super.camera);
        this.canvas.onmouseup = this.mouseup.bind(this);
        //this.canvas.onmouseout = this.mouseout.bind(this);
        this.canvas.onmousemove = this.move.bind(this.__super.camera);
        this.canvas.addEventListener('contextmenu', function (evt) {
            evt.preventDefault();
        }, false);
    }

    getGl() {
        return this.canvas.getContext('experimental-webgl');
    }
    mousedown(event) {
        this.mousepos.x = event.clientX;
        this.mousepos.y = event.clientY;
    }

    mouseup(event) {
        event.preventDefault();
    }

    mouseout() {
        this.canvas.onmousemove = null;
    }
    move(event) {

        if (event.ctrlKey === true && event.buttons === 1 || event.buttons === 2) {
            this.Position.values.x += parseFloat((this.mousepos.x - event.clientX) * this.mouseOptions.positionIntense);
            this.Position.values.y += parseFloat((this.mousepos.y - event.clientY) * this.mouseOptions.positionIntense);
            this.mousepos.x = event.clientX;
            this.mousepos.y = event.clientY;

        } else if (event.buttons === 1) {
            this.Rotation.values.y += parseFloat((this.mousepos.x - event.clientX) / this.mouseOptions.rotationIntense);
            this.Rotation.values.x += parseFloat((this.mousepos.y - event.clientY) / this.mouseOptions.rotationIntense);
            this.mousepos.x = event.clientX;
            this.mousepos.y = event.clientY;
        }
        return;
    }

    moveInverted(event) {

        if (event.ctrlKey === true && event.buttons === 1 || event.buttons === 2) {
            this.Rotation.values.y += parseFloat((this.mousepos.y - event.clientX) / this.mouseOptions.rotationIntense);
            this.Rotation.values.x += parseFloat((this.mousepos.x - event.clientY) / this.mouseOptions.rotationIntense);
            this.mousepos.y = event.clientX;
            this.mousepos.x = event.clientY;
        } else if (event.buttons === 1) {
            this.Position.values.x -= parseFloat((this.mousepos.y - event.clientX) / this.mouseOptions.positionIntense);
            this.Position.values.y += parseFloat((this.mousepos.x - event.clientY) / this.mouseOptions.positionIntense);
            this.mousepos.y = event.clientX;
            this.mousepos.x = event.clientY;
        }
        return;
    }
    mouseDownInverted(event) {
        this.mousepos.y = event.clientX;
        this.mousepos.x = event.clientY;
    }

    moveInverse() {
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        this.canvas.onmousedown = this.mouseDownInverted.bind(this.__super.camera);
        this.canvas.onmousemove = this.moveInverted.bind(this.__super.camera);
    }

    moveZ(event) {
        event.preventDefault();
        if (event.ctrlKey === true) {

            this.camera.Position.values.z += (event.deltaY * this.camera.mouseOptions.positionIntense);

        } else if (event.shiftKey === true) {
            this.camera.Rotation.values.z += (event.deltaY);
        } else {
            // this.camera.Rotation.values.d += (event.deltaY * this.camera.mouseOptions.positionIntense);
            var tmp = this.MX.modelMatrix[3][3] + (event.deltaY / this.camera.mouseOptions.zoomIntense);
            if (tmp > 0.01) {
                this.MX.modelMatrix[3][3] = tmp;
            }
        }
        this.up = true;
    }
}

class Options {
    constructor(__super, MenuContainer) {
        this.BuildOptionsWindow();
        this.CloseWindow();
        this.items = [];
        this.items[1] = new ControlOptions();
        this.menu = MenuContainer;
        this.__super = __super;
        this.BuildMenu();
    }
    BuildMenu() {
        for (var item in this.items) {
            this.items[item].container = document.createElement("div");
            this.items[item].container.classList.add("options-menu-item");
            this.items[item].menuBtn.onclick = this.OpenWindow.bind(this, this.items[item], this.__super);
            this.items[item].container.append(this.items[item].menuBtn);
            this.menu.append(this.items[item].container);
        }
    }
    BuildOptionsWindow() {
        this.OptionsWindow = document.createElement("div");
        this.OptionsWindow.id = "optionWindow";
        this.OptionsWindow.Label = document.createElement("div");
        this.OptionsWindow.Label.style.innerText = "Opcje";
        this.OptionsWindow.Label.classList.add("option-top-bar");

        this.OptionsWindow.Label.Text = document.createElement("h5");
        this.OptionsWindow.Label.CloseBtn = document.createElement("button");
        this.OptionsWindow.Label.CloseBtn.classList.add("close-btn");
        this.OptionsWindow.Label.CloseBtn.innerText = "x";
        this.OptionsWindow.Label.CloseBtn.onclick = this.CloseWindow.bind(this);
        this.OptionsWindow.Content = document.createElement("div");
        this.OptionsWindow.Content.classList.add("options-window-content");

        this.OptionsWindow.Label.append(this.OptionsWindow.Label.Text);
        this.OptionsWindow.Label.append(this.OptionsWindow.Label.CloseBtn);
        this.OptionsWindow.append(this.OptionsWindow.Label);
        this.OptionsWindow.append(this.OptionsWindow.Content);
        document.body.append(this.OptionsWindow);
        return this.OptionsWindow;

    }

    CloseWindow() {
        this.OptionsWindow.style.display = "none";
    }

    OpenWindow(item, scope) {
        

        console.log("scope");
        console.log(scope);
        console.log("Content");
        console.log(item.window);
        console.log("This");
        console.log(this);
        item.getWindow(this.__super);
        this.OptionsWindow.Label.Text.innerText = item.label;
        if(this.OptionsWindow.Content.hasChildNodes()){
            this.OptionsWindow.Content.removeChild(this.OptionsWindow.Content.firstChild);
        }
        this.OptionsWindow.Content.append(item.window);
        this.OptionsWindow.style.display = "block";
    }

}
class Option {
    constructor(id, label) {
        this.id = id;
        this.label = label;
        this.window = document.createElement("div");
        this.window.classList.add("window-options-container");
        this.menuBtn = document.createElement("button");
        this.menuBtn.innerText = this.label;
    }
    getWindow(context) {
        this.window = document.createElement("div");
        this.window.classList.add("window-options-container");
        this.RenderWindow(context);
        return this.window;
    }
    getMenuButton() {
        return this.menuBtn;
    }
    getLabel() {
        return this.label;
    }
    RenderWindow() {
        this.window = "Not overwrited ! ";
    }
    createOptionTextInput() {
        var group = {};
        group.container = document.createElement("div");
        group.container.classList.add("option-input-text-group");
        group.input = document.createElement("input");
        group.label = document.createElement("label");
        group.desc = document.createElement("span");
        group.setLabel = function (label) {
            group.label.innerText = label;
        };
        group.setValue = function (v) {
            group.input.value = v;
        };
        group.setDesc = function (desc) {
            group.desc.innerText = desc;
        };

        group.container.append(group.label);
        group.container.append(group.input);
        group.container.append(group.desc);
        return group;
    }
}
