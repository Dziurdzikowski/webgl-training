
class ElementInterface {
    constructor(id, app, obj) {
        if (typeof obj.name == "undefined") {
            obj.name = id;
        }
        this.id=id;
        this.container = document.createElement("div");
        this.container.classList.add("element");
        this.container.head = document.createElement("div");
        this.container.head.classList.add("head");
        this.container.head.innerText = obj.name;
        this.container.head.onclick = this.Click;
        this.properties = new ElementInterfaceProperties(id);
        app.interface.Que.push(this.constructPropertiesInterface.bind(this));
        return this;
    }
    constructPropertiesInterface(app){
        this.container.append(this.container.head);
        this.properties.Update=this.Update.bind(this);
        for(var pro in this.properties){
            if(typeof this.properties[pro].isProperty !="undefined" && this.properties[pro].isProperty ===true){
                this.properties.addProperty(this.properties[pro]);
                this.properties.container.append(this.properties[pro].container);            
            }
        }
         this.container.append(this.properties.container)
         if (typeof this.hidden == "undefined") {
             app.interface.addElement(this);
         }
        return this;
    }
    Click(event) {

        if (event.target.classList.contains("head")) {
            if (event.target.classList.contains("open")) {
                return event.target.classList.remove("open");
            } else {
                return event.target.classList.add("open");
            }
        }
    }
    Update(event) {
        this.update = true;    
        for (var prop in this.properties) {
            if (typeof this.properties[prop].isProperty !="undefined" && this.properties[prop].isProperty==true ) {
                for (var val in this.properties[prop].values.interface) {
                    this.properties[prop].values[val] = this.properties[prop].values.interface[val].input.value;
                }
            }

        }
    }
    GetProperies() {
        var tmp = { properies: {} };
        tmp.id = this.id;
        for (var prop in this.properties) {
            if (typeof this.properties[prop].isProperty !="undefined" && this.properties[prop].isProperty==true ) {
                tmp.properies[prop]={};
                for (var val in this.properties[prop].values.interface) {
                    tmp.properies[prop][val] = this.properties[prop].values.interface[val].input.value;
                }
            }

        }
        return tmp;
    }
}