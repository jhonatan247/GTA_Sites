// Ejemplo de un mapa interactivo creado utilizando la librería externa Phaser
// realizado por el profesor Carlos Delgado para el curso Gráfica Interactiva de la Universidad Nacional de Colombia
// El primer paso es crear un nuevo objeto "Phaser.Game" y definir su tamaño


// se declaran todas las variables


var mapa = {
	preload: function() {  
		pantalla.load.image("fondo", "images/mapa.jpg");
		pantalla.load.image("joystick", "images/joystick.png");
		pantalla.load.image("location", "images/location.png");
		pantalla.load.image("salir", "images/exit.png");
	},
	
	create: function() { 
        
		fondoPantalla = pantalla.add.tileSprite(0, 0, 820, 820, "fondo");
		fondoPantalla.tilePosition.x = fondoX;
		fondoPantalla.tilePosition.y = fondoY;
		pantalla.physics.startSystem(Phaser.Physics.ARCADE);   
        
        sites = pantalla.add.group();
        var mX, mY;
        DBsites.once('value', function(snap) {
            sites.position.x = 0;
            sites.position.y = 0;
          var objeto = snap.val();
          mensajes_keys = Object.keys(objeto);
          for (var i = 0; i < mensajes_keys.length ; i++) {
            snapshot =  snap.child(mensajes_keys[i]);
            if(i==0){
                snapShots = [snapshot];
            }
            else{
                snapShots.push(snapshot);
            }
            mX = snapshot.child(X_REFERENCE).val() + fondoPantalla.tilePosition.x;
            mY = snapshot.child(Y_REFERENCE).val()+ fondoPantalla.tilePosition.y;
              
            var site = sites.create(mX, mY, "location");
            site.anchor.setTo(0.5);	
            site.scale.setTo(0.2, 0.2); 
            site.inputEnabled = true; 
            site.events.onInputDown.add(function(spr){
                snapshotSelected = snapShots[spr.key];
                fondoX = fondoPantalla.tilePosition.x;
                fondoY = fondoPantalla.tilePosition.y;
                pantalla.state.start('selectedView');
            });
            site.key = i;
          }
        });
                                     
		    
		
        var buttonExit = pantalla.add.button(770, 50, "salir", this.goToBack, this);
        buttonExit.anchor.setTo(0.5);         
		buttonExit.scale.setTo(0.2, 0.2);   
        
		var joystick1 = pantalla.add.button(100, 650, "joystick", vacio, this); 
		joystick1.anchor.setTo(0.5);
		joystick1.scale.setTo(0.4, 0.4);
        joystick1.rotation = 3.1416;
		joystick1.alpha = 0.6;   
        
        // cambia la transparencia del botón
		var joystick2 = pantalla.add.button(260, 650, "joystick", vacio, this);
		joystick2.anchor.setTo(0.5);
		joystick2.scale.setTo(0.4, 0.4);
		joystick2.alpha = 0.6;
        
		var joystick3 = pantalla.add.button(180, 730, "joystick", vacio, this);
		joystick3.anchor.setTo(0.5);
		joystick3.scale.setTo(0.4, 0.4);
        joystick3.rotation = 3.1416/2;
		joystick3.alpha = 0.6;
        
		var joystick4 = pantalla.add.button(180, 570, "joystick", vacio, this);
		joystick4.anchor.setTo(0.5);
		joystick4.scale.setTo(0.4, 0.4);
        joystick4.rotation = 3.1416*3/2;
		joystick4.alpha = 0.6;
		
		flechaDerecha = pantalla.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		flechaIzquierda = pantalla.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        flechaArriba = pantalla.input.keyboard.addKey(Phaser.Keyboard.UP);
		flechaAbajo = pantalla.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		
        buttonExit.events.onInputDown.add(this.goToBack);
        
        joystick1.events.onInputUp.add(function(){left=false; 
			joystick1.alpha = 0.6;});
        joystick1.events.onInputDown.add(function(){left=true;
			joystick1.alpha = 1;});
		
		
        joystick2.events.onInputUp.add(function(){right=false;
			joystick2.alpha = 0.6;});
        joystick2.events.onInputDown.add(function(){right=true;
			joystick2.alpha = 1;});
		
        joystick3.events.onInputUp.add(function(){down=false;
			joystick3.alpha = 0.6;});
        joystick3.events.onInputDown.add(function(){down=true;
			joystick3.alpha = 1;});
		
        joystick4.events.onInputUp.add(function(){up=false;
			joystick4.alpha = 0.6;});
        joystick4.events.onInputDown.add(function(){up=true;
			joystick4.alpha = 1;});
	},
	
	update: function(){ 
		if(flechaDerecha.isDown||right){
			this.derecha();
        }
		else if(flechaIzquierda.isDown||left)			
			this.izquierda();
        if(flechaAbajo.isDown||down){		
			this.abajo();
        }
		else if(flechaArriba.isDown||up)		
			this.arriba(); 
	},
	 izquierda: function(){  
		 if (fondoPantalla.tilePosition.x < 0){  // le pone límite al desplazamiento del fondo
	        fondoPantalla.tilePosition.x += 4; // mueve el fondo
             sites.position.x +=4
		 }
     },
	 derecha: function(){  
		 if (fondoPantalla.tilePosition.x > -1228){  // le pone límite al desplazamiento del fondo
	        fondoPantalla.tilePosition.x -= 4;
			sites.position.x -= 4;
		 }
	 },
	 abajo: function(){  
		 if (fondoPantalla.tilePosition.y > -1228){  // le pone límite al desplazamiento del fondo
	        fondoPantalla.tilePosition.y -= 4;
			sites.position.y -= 4;
		 }
	 }, 
	 arriba: function(){  
		 if (fondoPantalla.tilePosition.y < 0){  // le pone límite al desplazamiento del fondo
	        fondoPantalla.tilePosition.y += 4;   
			sites.position.y +=4;     
		 }
     },
    goToBack: function(){
        pantalla.state.start('menu');
    }
}

