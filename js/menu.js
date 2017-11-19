var menu = {
    
    preload: function(){
        //Cargando los recursos del estado
        pantalla.load.image('ButtonMapa', 'images/ButtonMapa.png');
        pantalla.load.image('ButtonNuevo', 'images/ButtonNuevo.png');
        pantalla.load.image('ButtonAyuda', 'images/ButtonAyuda.png');
        pantalla.load.image('fondo', 'images/menuBackground.jpg');
        pantalla.load.image('soundIcon', 'images/sound.png');
    },
    
    create: function(){
        //Se añade la imagen de fondo
        fondopantalla = pantalla.add.tileSprite(0, 0, 820, 820, "fondo");
        
        
        //Se añaden los botones del menú
        var buttonMapa = this.add.button(pantalla.width/2, pantalla.height/2 -150, 'ButtonMapa', this.iniciar, this);
        buttonMapa.anchor.setTo(0.5);
        buttonMapa.scale.setTo(0.3, 0.3);
        
        var buttonNuevo = this.add.button(pantalla.width/2, pantalla.height/2, 'ButtonNuevo', oscurecerVentana, this);
        buttonNuevo.anchor.setTo(0.5);
        buttonNuevo.scale.setTo(0.3, 0.3);
        
        var buttonAyuda = this.add.button(pantalla.width/2, pantalla.height/2 +150, 'ButtonAyuda', this.abrirDocs, this);
        buttonAyuda.anchor.setTo(0.5);
        buttonAyuda.scale.setTo(0.3, 0.3);
        
        
        //Se añade el botón de sonido y sus eventos para pausar o continuar la música del juego
        var buttonSound = this.add.button(60, 60, 'soundIcon', vacio, this);
        buttonSound.anchor.setTo(0.5);
        buttonSound.scale.setTo(0.2, 0.2);
        if(!soundState)
            buttonSound.alpha = 0.6;
        buttonSound.events.onInputUp.add(function(){inputDown=false;});
        buttonSound.events.onInputDown.add(function(){
            if(!inputDown){
                inputDown = true;
                changeSound(buttonSound);
            }
        });
    },
    //inicia el estdao mapa
    iniciar: function(){
        pantalla.state.start('mapa');
    },
    //abre la documentación
    abrirDocs:function(){
        window.open("docs/documentacion.pdf", '_blank');
    }
};