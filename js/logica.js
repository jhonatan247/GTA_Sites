window.onbeforeunload = confirmExit;
  function confirmExit()
  {
    return "Usted está saliendo de la pagina";
  }
function oscurecerVentana(){
    $("#oscurecer").fadeIn(300, aparecerFormulario);
}
function aparecerFormulario(){
    $("#registrar").fadeIn(); 
    
    $("#enviar").click(enviarSitio);
    $("#cancelar").click(desaparecerFormulario);
    
    $('input[type=file]').change(function () {
        $('#imagen').val( $('#archivo').val());
    });
}
function desoscurecer(){
    $("#oscurecer").fadeOut()
}
function desaparecerFormulario(){
    $("#registrar").fadeOut(300, desoscurecer)
}
function enviarSitio(e){
    e.preventDefault();
    var titulo = $("#titulo").val();
    var imagen = $("#imagen").val();
    var descripcion = $("#descripcion").val();
    var autor = $("#autor").val();
    var x = $("#x").val();
    var y = $("#y").val();
    var message = "";
    if(titulo.length<3){
        message = "El campo Título es requerido.";
    }if(titulo.length>maxLengthTitulo){
        titulo= titulo.slice(0, maxLengthTitulo)
    }if(titulo.length<3){
        message = "El campo Título es requerido.";
    }else if(imagen.length==0 || !check(imagen)){
        message = "Debes seleccionar una imagen (PNG o JPJ).";
    }else if(descripcion.length<10){
        message = "La descripción debe tener minimo 10 caracteres.";
    }else if(x.length==0){
        message = "El campo X es requerido.";
    }else if(parseFloat(x)<40||parseFloat(x)>2000){
        message = "El campo X debe estar entre 40 y 2000.";
    }else if(y.length==0){
        message = "el campo Y es requerido.";
    }else if(parseFloat(y)<40||parseFloat(y)>2000){
        message = "El campo Y debe estar entre 40 y 2000.";
    }
    else if(autor.length<3){
        message = "El campo autor es requerido.";
    }
    if(message==""){
        var file = document.getElementById("archivo").files[0];
            console.log(file);
        var fileName = file.name;

        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child(fileName).put(file);
        
        uploadTask.on("state_changed", 
          function(snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Subiendo '+progress + '% completado');
          }, 
            function(error) {
                console.log("Ha ocurrido un error")
            }, 
            function() {
                var downloadURL = uploadTask.snapshot.downloadURL;
                DBsites.push({
                        titulo: titulo,
                        imagen: downloadURL,
                        descripcion : descripcion,
                        autor : autor,
                        x : parseFloat(x),
                        y : parseFloat(y)
                    });
                    desaparecerFormulario();
            }
        );

    }else{
        alert(message);
    }
}
function ontenerNombre(str) {
    var index=0;
    for(var i =0; i<str.length;i++){
        if(str.substring(i,i+1)=='/'||str.slice(i,i+1)=="\\"){
            index = i+1;
        }
    }
    return str.substring(index, str.length);
    
 }
function check(img) {
        var ext = img;
        ext = ext.substring(ext.length-3,ext.length);
        ext = ext.toLowerCase();

        if(ext != 'jpg' && ext !='png') {
            return false; 
        }
        else
            return true; 
}