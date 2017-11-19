var pantalla = new Phaser.Game(820, 820, Phaser.CANVAS, "container");

pantalla.state.add('mapa', mapa);
pantalla.state.add('menu', menu);
pantalla.state.add('selectedView', selectedView);
var index =0;

var main = {
	preload: function() {  
		pantalla.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        pantalla.load.spritesheet("fondoMain", "images/spriteFondo.png", 820, 820); 
		pantalla.load.audio("soundGTA", "sounds/principal.mp3");
	},
	
	create: function() { 
        var fondoMain = pantalla.add.sprite(0, 0, "fondoMain");
		fondoMain.animations.add("cargar", [0, 1, 2, 3], 5, true); 
        fondoMain.animations.play("cargar");
        soundGTA =pantalla.add.audio("soundGTA");
    },
    update:function(){
        index++;
        if(index>100){
            pantalla.state.start('menu');
            soundGTA.play("", 0,1,true);
        }
    
    }
}
pantalla.state.add('main', main);   

pantalla.state.start('main');