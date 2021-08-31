class ControlOptions extends Option{
    constructor(OptionsContainer){
        super("ControlOptions", "Opcje sterowania")
    }

    RenderWindow(__super){
        var positionIntense = this.createOptionTextInput();
        positionIntense.setLabel("Czułość położenia kamery");
        positionIntense.setValue(__super.camera.mouseOptions.positionIntense);
        positionIntense.setDesc("Ustawia czułość sterowania położeniem kamery -  domyślna wartośc 1");
        positionIntense.input.onkeyup = function(){
              __super.camera.mouseOptions.positionIntense= parseInt(positionIntense.input.value);
          };
         this.window.append(positionIntense.container);
        
        var rotationIntense = this.createOptionTextInput();
        rotationIntense.setLabel("Czułość położenia kamery");
        rotationIntense.setValue(__super.camera.mouseOptions.rotationIntense);
        rotationIntense.setDesc("Ustawia czułość sterowania obrotem kamery -  domyślna wartośc 25");
        rotationIntense.input.onkeyup = function(){
              __super.camera.mouseOptions.rotationIntense= parseInt(rotationIntense.input.value);
          };
         this.window.append(rotationIntense.container);
         
        var zoomIntense = this.createOptionTextInput();
        zoomIntense.setLabel("Czułość położenia kamery");
        zoomIntense.setValue(__super.camera.mouseOptions.zoomIntense);
        zoomIntense.setDesc("Ustawia czułość sterowania przybliżeniem kamery -  domyślna wartośc 10");
        zoomIntense.input.onkeyup = function(){
              __super.camera.mouseOptions.zoomIntense= parseInt(100/zoomIntense.input.value);
          };
         this.window.append(zoomIntense.container);

        console.log("RENDER WINDOW");
        console.log(__super.camera.mouseOptions);
    }
    
}