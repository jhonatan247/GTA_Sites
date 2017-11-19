var mapa = {
	preload: function() {  
        //Cargando los recursos del estado
		pantalla.load.image("fondo", "images/mapa.jpg");
		pantalla.load.image("joystick", "images/joystick.png");
		pantalla.load.image("location", "images/location.png");
		pantalla.load.image("salir", "images/exit.png");
	},
	
	create: function() { 
        //Añadiendo mapa
		fondoPantalla = pantalla.add.tileSprite(0, 0, 820, 820, "fondo");
        //Se mueve el mapa a la posición almacenada
		fondoPantalla.tilePosition.x = fondoX;
		fondoPantalla.tilePosition.y = fondoY;
        
		pantalla.physics.startSystem(Phaser.Physics.ARCADE);   
        
        //Añadiendo grupo de sitios
        sites = pantalla.add.group();
        var mX, mY;
        //Obteniendo los sitios de la base de datos
        DBsites.once('value', function(snap) {
            sites.position.x = 0;
            sites.position.y = 0;
          var objeto = snap.val();
          mensajes_keys = Object.keys(objeto);
          for (var i = 0; i < mensajes_keys.length ; i++) {
              
            snapshot =  snap.child(mensajes_keys[i]);
            //Se almacenan los datos del sitio en una lista
            if(i==0){
                snapShots = [snapshot];
            }
            else{
                snapShots.push(snapshot);
            }
            //Se obtiene las coordenadas x,y del sitio
            mX = snapshot.child(X_REFERENCE).val() + fondoPantalla.tilePosition.x;
            mY = snapshot.child(Y_REFERENCE).val()+ fondoPantalla.tilePosition.y;
            
            //se añade el sitio obtenido al grupo de sitios
            var site = sites.create(mX, mY, "location");
            site.anchor.setTo(0.5);	
            site.scale.setTo(0.2, 0.2); 
            site.inputEnabled = true; 
            //evento cuando el usuario haga click o toque con el dedo al indicador del sitio
            site.events.onInputDown.add(function(spr){
                //se guardan los datos del sitio seleccionado
                snapshotSelected = snapShots[spr.key];
                //se guarda la ubicación actual del mapa para que esta se mantega después de cambiar de estado
                fondoX = fondoPantalla.tilePosition.x;
                fondoY = fondoPantalla.tilePosition.y;
                //se inicia el estado "Detalle de sitio"
                pantalla.state.start('selectedView');
            });
            //se le da un identificador al estado
            site.key = i;
          }
        });
                                     
		    
		//botón para regresar al menú
        var buttonExit = pantalla.add.button(770, 50, "salir", this.goToBack, this);
        buttonExit.anchor.setTo(0.5);         
		buttonExit.scale.setTo(0.2, 0.2);   
        
        //Se añaden los botones joystick para moverse sobre el mapa
		var joystick1 = pantalla.add.button(100, 650, "joystick", vacio, this); 
		joystick1.anchor.setTo(0.5);
		joystick1.scale.setTo(0.4, 0.4);
        joystick1.rotation = 3.1416;
		joystick1.alpha = 0.6;   
        
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
		
        //se inicializan los controles del teclado que se van a utilizar
		flechaDerecha = pantalla.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		flechaIzquierda = pantalla.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        flechaArriba = pantalla.input.keyboard.addKey(Phaser.Keyboard.UP);
		flechaAbajo = pantalla.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		
        //se añaden los eventos a cada botón (El evento onInputDown también detecta las pulsaciones en pantalals táctiles)
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
        //Se mueven los objetos del mapa a la dirección que el usuario indique
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
    //funciones para mover los objetos del mapa
	 izquierda: function(){  
		 if (fondoPantalla.tilePosition.x < 0){ 
	        fondoPantalla.tilePosition.x += 4;
             sites.position.x +=4
		 }
     },
	 derecha: function(){  
		 if (fondoPantalla.tilePosition.x > -1228){ 
	        fondoPantalla.tilePosition.x -= 4;
			sites.position.x -= 4;
		 }
	 },
	 abajo: function(){  
		 if (fondoPantalla.tilePosition.y > -1228){ 
	        fondoPantalla.tilePosition.y -= 4;
			sites.position.y -= 4;
		 }
	 }, 
	 arriba: function(){  
		 if (fondoPantalla.tilePosition.y < 0){
	        fondoPantalla.tilePosition.y += 4;   
			sites.position.y +=4;     
		 }
     },
    //funciones para volver al mmenu
    goToBack: function(){
        pantalla.state.start('menu');
    }
}

