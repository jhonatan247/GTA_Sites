var imageItem;
var txtTitulo;
var txtDescripcion;
var selectedView = {
	preload: function() {  
        pantalla.load.image("imageItem", snapshotSelected.child(IMAGEN_REFERENCE).val());
		pantalla.load.image("salir", "images/exit.png");
		pantalla.load.image("btnMove", "images/ButtonDown.png");
	},
	
	create: function() { 
        pantalla.stage.backgroundColor = '#212F3C';
        
        imageItem = pantalla.add.sprite(60, 100, "imageItem");
        imageItem.scale.setTo(700/imageItem.width, 500/imageItem.height);  
        var sText =snapshotSelected.child(TITULO_REFERENCE).val();
        
        if(sText.length>maxLengthTitulo){
            sText = sText.slice(0, maxLengthTitulo)
        }
        txtTitulo = pantalla.add.text(pantalla.width/2, pantalla.height/2 -350, sText, {font: "Bold Arial", fill: '#ffffff', align:"center"});
        txtTitulo.fontSize = 40;
        txtTitulo.anchor.setTo(0.5);
        
        
        sText = snapshotSelected.child(DESCRIPCION_REFERENCE).val();
        
        txtDescripcion = pantalla.add.text(0, 0, sText , {font: "Bold Arial", fill: '#ffffff', align:"center"});
        txtDescripcion.fontSize = 20;
        txtDescripcion.anchor.setTo(0.5);
        txtDescripcion.wordWrapWidth  = 700;
        txtDescripcion.wordWrap = true;
        txtDescripcion.x = pantalla.width/2;
        txtDescripcion.y = txtDescripcion.height/2+620;
        
        sText ="Autor: "+ snapshotSelected.child(AUTOR_REFERENCE).val();
        
        txtAutor = pantalla.add.text(0, 0, sText , {font: "Bold Arial", fill: '#ffffff', align:"center"});
        txtAutor.fontSize = 15;
        txtAutor.x = pantalla.width-txtAutor.width-60;
        txtAutor.y = txtDescripcion.y +txtDescripcion.height+10;
        
        var buttonExit = pantalla.add.button(770, 50, "salir", this.goToBack, this);
        buttonExit.anchor.setTo(0.5);         
		buttonExit.scale.setTo(0.2, 0.2);  
        if(txtDescripcion.position.y + txtDescripcion.height >= pantalla.height){
            var buttonDown = pantalla.add.button(0, 770, "btnMove", vacio, this);
            var buttonUp = pantalla.add.button(820, 820, "btnMove", vacio, this);
            buttonUp.rotation = 3.1416;

            buttonDown.events.onInputUp.add(function(){down=false;});
            buttonDown.events.onInputDown.add(function(){down=true;});

            buttonUp.events.onInputUp.add(function(){up=false;});
            buttonUp.events.onInputDown.add(function(){up=true;});
        }
        
        
        flechaarriba = pantalla.input.keyboard.addKey(Phaser.Keyboard.UP);
		flechaabajo = pantalla.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    },
    update:function(){
       if(down|| flechaabajo.isDown){
           this.abajo();
       }
        else if(up|| flechaarriba.isDown){
            this.arriba();
        }
    },
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
    goToBack:function(){
        pantalla.state.start('mapa');
    }
    

}