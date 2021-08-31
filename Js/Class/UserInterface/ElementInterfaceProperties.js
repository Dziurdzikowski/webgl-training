class ElementInterfaceProperties {
    constructor(name) {
        this.container = document.createElement("div");
        this.container.classList.add("properties");
        this.container.name = name;
        this.length = 0;
        this.Update=function(){};

    }
    addProperty(Prop) {
        this.length++;
                var tmp;
            for(var pr in  Prop.values){
                if(pr !="interface"){
                    this[Prop.id].Update=function(){};
                    this[Prop.id].addValue(pr,Prop.values[pr])
                    this[Prop.id].values.interface[pr].input.onkeyup=this.Update;
                }
            }
        this.container.append(this[Prop.id].container);
        return this;
    }
}