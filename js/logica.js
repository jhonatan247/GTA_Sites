//Evita que el usuario salga de la página por accidente, mostrando un mensaje de confirmación.
window.onbeforeunload = confirmExit;
  function confirmExit()
  {
    return "Usted está saliendo de la pagina";
  }
//Lógica para aparecer y desaparecer el formulario hecha con jquery
function oscurecerVentana(){
    //oscurece el juego
    $("#oscurecer").fadeIn(300, aparecerFormulario);
}
function aparecerFormulario(){
    //muestra el formulario
    $("#registrar").fadeIn(); 
    //Se añade el evento para enviar formulario al boton enviar
    $("#enviar").click(enviarSitio);
    //se añade el evento para desaparecer formulario al boton cancelar
    $("#cancelar").click(desaparecerFormulario);
    
    //Se añade un evento al input de tipo file para saber cuándo se seleccionó un archivo
    $('input[type=file]').change(function () {
        $('#imagen').val( $('#archivo').val());
    });
}
//hace visible al juego
function desoscurecer(){
    $("#oscurecer").fadeOut()
}
//desaparece el formulario
function desaparecerFormulario(){
    $("#registrar").fadeOut(300, desoscurecer)
}
//Registra el sitio en la base de datos
function enviarSitio(e){
    //neutraliza la acción por defecto del botón
    e.preventDefault();
    //obtiene los datos del formulario
    var titulo = $("#titulo").val();
    var imagen = $("#imagen").val();
    var descripcion = $("#descripcion").val();
    var autor = $("#autor").val();
    var x = $("#x").val();
    var y = $("#y").val();
    var message = "";
    //valida que los datos ingresados sean correctos
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
    //en caso de que los datos sean correctos
    if(message==""){
        //obtiene el archivo seleccionado
        var file = document.getElementById("archivo").files[0];
        var fileName = file.name;
        
        //Instancia una referencia a la base de datos
        var storageRef = firebase.storage().ref();
        //Sube la imagen a la base de datos
        var uploadTask = storageRef.child(fileName).put(file);
        //Evento que informa el estado de subida de la imagen
        uploadTask.on("state_changed", 
            //función que informa algún cambio en el estado de la imagen
          function(snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Subiendo '+progress + '% completado');
          }, 
            //función que informa algún error en la subida
            function(error) {
                console.log("Ha ocurrido un error")
            }, 
            //función que se ejecuta cuando se ha completado la subida de la imagen
            function() {
                //se obtiene el link de la imagen subida
                var downloadURL = uploadTask.snapshot.downloadURL;
                //se añade el sitio a la base de datos
                DBsites.push({
                        titulo: titulo,
                        imagen: downloadURL,
                        descripcion : descripcion,
                        autor : autor,
                        x : parseFloat(x),
                        y : parseFloat(y)
                    });
                //se limpia el formulario
                $("#titulo").val("");
                $("#imagen").val("");
                $("#descripcion").val("");
                $("#x").val("");
                $("#y").val("");
                //Se muestra un mensaje
                alert("El sitio ha sido registrado correctamente.\n¡Ve al mapa para verlo!");
                //se regresa al menú anterior
                desaparecerFormulario();
            }
        );

    }else{
        //Se muestra mensaje de validación
        alert(message);
    }
}
//verifica que el archivo sea una imagen
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