//Se crea el juego
var pantalla = new Phaser.Game(820, 820, Phaser.CANVAS, "container");

//se añaden los estados del juego
pantalla.state.add('mapa', mapa);
pantalla.state.add('menu', menu);
pantalla.state.add('selectedView', selectedView);


var index =0;
var main = {
	preload: function() {  
        //Cargando los recursos del estado
		pantalla.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        pantalla.load.spritesheet("fondoMain", "images/spriteFondo.png", 820, 820); 
		pantalla.load.audio("soundGTA", "sounds/principal.mp3");
	},
	
	create: function() { 
        //Se añade un sprite de carga con su respectiva animación
        var fondoMain = pantalla.add.sprite(0, 0, "fondoMain");
		fondoMain.animations.add("cargar", [0, 1, 2, 3], 5, true); 
        fondoMain.animations.play("cargar");
        //Se añade la música
        soundGTA =pantalla.add.audio("soundGTA");
    },
    update:function(){
        index++;
        //Se cambia de estado cuando se completen 100 iteraciones
        if(index>100){
            pantalla.state.start('menu');
            soundGTA.play("", 0,1,true);
        }
    
    }
}
//se añade el estado main
pantalla.state.add('main', main);   
//se inicia el estado main
pantalla.state.start('main');