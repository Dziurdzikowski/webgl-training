class Grid  extends Strip {
    constructor(id,app,from,to) {
        super(id,app);
        this.from=from;
        this.to=to;
        this.mat = [this.from, this.to];
        this.haveColors=false;
        this.draw.Type=this.draw.Types.LineStrip;
        this.pointSize=3;
    }
    SceneInit=function(wielkosc=8,gestosc=10){
            var from=(-1*wielkosc);
            var to=wielkosc;
             var stripX=[];
             var x=from;
             var tmp2=from;
             var y=from;
             var z=to;

             var gestosc_wartosc= (to*2)/gestosc;
             for(var i=0;i<=gestosc;i++){
               stripX[i]=new Strip("stripX_"+i,this, [x, y, z, 1], [(-1*x), y, z, 1]);
               stripX[(i+gestosc)]=new Strip("stripX_"+(i+gestosc),this, [tmp2, y, x, 1], [tmp2, y, (-1*x), 1]);
                stripX[i].properties.Color.set({r:1,g:0,b:0,a:1});
                stripX[(i+gestosc)].properties.Color.set({r:1,g:0,b:0,a:1});
                z-=gestosc_wartosc;
                tmp2+=gestosc_wartosc;
             }
              x=from;
              tmp2=from;
              y=to;
              z=to;
             var stripY=[];
             for(var i=0;i <= gestosc;i++){
               stripY[i]=new Strip("stripY_"+i+"",this, [x, y, z, 1], [(-1*x), y, z, 1]);
               stripY[(i+gestosc)]=new Strip("stripY_"+(i+gestosc)+"",this, [tmp2, x, z, 1], [tmp2,(-1*x), z, 1]);
               stripY[(i+gestosc)].properties.Color.set({r:0,g:1,b:0,a:1});
               stripY[i].properties.Color.set({r:0,g:1,b:0,a:1});
                y-=gestosc_wartosc;
                tmp2+=gestosc_wartosc;
             }
             z=to;
             x=from;
             tmp2=from;
             y=from;
             var stripZ=[];
             for(var i=0;i <= gestosc;i++){
               stripZ[i]=new Strip("stripZ_"+i+"",this, [x, y, z, 1], [x, (-1*y), z, 1]);
               stripZ[(i+gestosc)]=new Strip("stripZ_"+(i+gestosc)+"",this, [x, tmp2, y, 1], [x,tmp2, (-1*y), 1]);
               stripZ[(i+gestosc)].properties.Color.set({r:0,g:0,b:1,a:1});
               stripZ[i].properties.Color.set({r:0,g:0,b:1,a:1});
                z-=gestosc_wartosc;
                tmp2+=gestosc_wartosc;
             }
            

             
    }   

}
