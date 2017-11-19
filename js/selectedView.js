var imageItem;
var txtTitulo;
var txtDescripcion;
var selectedView = {
	preload: function() {  
        //carga la imagen del sitio seleccionado, obteniendo el link de la variable snapshotSelected
        pantalla.load.image("imageItem", snapshotSelected.child(IMAGEN_REFERENCE).val());
        //Cargando los recursos del estado
		pantalla.load.image("salir", "images/exit.png");
		pantalla.load.image("btnMove", "images/ButtonDown.png");
	},
	
	create: function() { 
        //Cambiando el color de fondo
        pantalla.stage.backgroundColor = '#212F3C';
        
        //Añade la imagen del sitio
        imageItem = pantalla.add.sprite(60, 100, "imageItem");
        imageItem.scale.setTo(700/imageItem.width, 500/imageItem.height); 
        
        //obtiene el título del sitio
        var sText =snapshotSelected.child(TITULO_REFERENCE).val();
        //recorta el título en caso de ser muy largo
        if(sText.length>maxLengthTitulo){
            sText = sText.slice(0, maxLengthTitulo)
        }
        //añade el título
        txtTitulo = pantalla.add.text(pantalla.width/2, pantalla.height/2 -350, sText, {font: "Bold Arial", fill: '#ffffff', align:"center"});
        txtTitulo.fontSize = 40;
        txtTitulo.anchor.setTo(0.5);
        
        //obtiene la descripcion del stio
        sText = snapshotSelected.child(DESCRIPCION_REFERENCE).val();
        //añade la descripcion
        txtDescripcion = pantalla.add.text(0, 0, sText , {font: "Bold Arial", fill: '#ffffff', align:"center"});
        txtDescripcion.fontSize = 20;
        txtDescripcion.anchor.setTo(0.5);
        txtDescripcion.wordWrapWidth  = 700;
        txtDescripcion.wordWrap = true;
        txtDescripcion.x = pantalla.width/2;
        txtDescripcion.y = txtDescripcion.height/2+620;
        
        //obtiene al autor del sitio
        sText ="Autor: "+ snapshotSelected.child(AUTOR_REFERENCE).val();
        //añade al autor del sitio
        txtAutor = pantalla.add.text(0, 0, sText , {font: "Bold Arial", fill: '#ffffff', align:"center"});
        txtAutor.fontSize = 15;
        txtAutor.x = pantalla.width-txtAutor.width-60;
        txtAutor.y = txtDescripcion.y +txtDescripcion.height+10;
        
        //añade le botón de salir
        var buttonExit = pantalla.add.button(770, 50, "salir", this.goToBack, this);
        buttonExit.anchor.setTo(0.5);         
		buttonExit.scale.setTo(0.2, 0.2);  
        
        //si la descripción se sale de la pantalla añade los botones de navegación
        if(txtDescripcion.position.y + txtDescripcion.height >= pantalla.height){
            var buttonDown = pantalla.add.button(0, 770, "btnMove", vacio, this);
            var buttonUp = pantalla.add.button(820, 820, "btnMove", vacio, this);
            buttonUp.rotation = 3.1416;

            buttonDown.events.onInputUp.add(function(){down=false;});
            buttonDown.events.onInputDown.add(function(){down=true;});

            buttonUp.events.onInputUp.add(function(){up=false;});
            buttonUp.events.onInputDown.add(function(){up=true;});
        }
        
        //instancia los controles del teclado que se van a utilizar
        flechaarriba = pantalla.input.keyboard.addKey(Phaser.Keyboard.UP);
		flechaabajo = pantalla.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    },
    update:function(){
        //Mueve el contenido en la dirección que el usuario indique
       if(down|| flechaabajo.isDown){
           this.abajo();
       }
        else if(up|| flechaarriba.isDown){
            this.arriba();
        }
    },
    //funciones que mueven el contenido
    abajo:function(){
        if(txtAutor.position.y + txtAutor.height+50 >= pantalla.height){
            imageItem.position.y -=1;
            txtTitulo.position.y -=1;
            txtDescripcion.position.y -=1;
            txtAutor.position.y -=1;
        }
    },
    arriba:function(){
        if(txtTitulo.position.y<pantalla.height/2 -350){
            imageItem.position.y +=1;
            txtTitulo.position.y +=1;
            txtDescripcion.position.y +=1;
            txtAutor.position.y +=1;
        }
    },
    //función para regresal al mapa
    goToBack:function(){
        pantalla.state.start('mapa');
    }
    

}