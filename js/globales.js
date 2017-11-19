var fondoPantalla;
var fondoX = -614;
var fondoY = -614;

var flechaDerecha;
var flechaIzquierda;
var flechaArriba;
var flechaAbajo;

var right = false;
var left = false;
var up = false;
var down = false;

var soundState=true;

var soundGTA;

var SITIOS_REFERENCE = "sitios";
var DESCRIPCION_REFERENCE = "descripcion";
var IMAGEN_REFERENCE = "imagen";
var TITULO_REFERENCE = "titulo";
var AUTOR_REFERENCE = "autor";
var X_REFERENCE = "x";
var Y_REFERENCE = "y";

var DBsites = firebase.database().ref().child(SITIOS_REFERENCE);


var sites;

var inputDown = false;

var snapshotSelected;
var snapShots;

var maxLengthTitulo =18;

function changeSound(btn){
    if(soundState){
        soundGTA.pause();
        btn.alpha = 0.5;
    }else{
        soundGTA.resume();
        btn.alpha = 1;
    }
    soundState = !soundState;
}
function vacio(){}
