class ElementInterfaceProperty {
    constructor(Prop) {      
        this.container = document.createElement("div");
        this.container.classList.add("property");
        this.name = { text: Prop, container: document.createElement("div") };
        this.name.container.classList.add("name");
        this.name.container.innerText = Prop;
        this.container.values =document.createElement("div");
        this.container.values.classList.add("pvalue");
        this.container.append(this.name.container);
        this.container.append(this.container.values);
        return this;
    }
    addValue(VName, VValue = 0) {
        this.values.interface[VName]={};
        this.values.interface[VName].container= document.createElement("label")
        this.values.interface[VName].name = VName;
        this.values.interface[VName].input = document.createElement("input");
        this.values.interface[VName].input.value=VValue;
        this.values.interface[VName].input.id = VName;
        this.values.interface[VName].container.innerText = VName + " => ";
        this.values.interface[VName].container.append(this.values.interface[VName].input);
        this.container.values.append(this.values.interface[VName].container);
        return this;
    }
}
