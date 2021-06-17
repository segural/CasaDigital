window.onload = function(){

    let form = document.querySelector(".main-form");
    let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

    form.addEventListener("submit", function(e){
        let errores = [];
        if(form.course_title.value == "" || form.course_title.value.length < 3){
            errores.push("El título es obligatorio y debe tener un minimo de 3 caracteres");
        }
        if(form.short_description.value == ""){
            errores.push("El campo  ``descripción resumida`` no puede estar vacío"); 
        }   
        if(form.short_description.value.length > 300){
            errores.push("El campo ``descripción resumida`` no puede superar los 300 caracteres"); 
        } 
        if(form.image.value != ""){
            if(!allowedExtensions.exec(form.image.value)){
            errores.push("El formato de la imagen debe ser JPG/JPEG/GIF/PNG"); 
        }}
        if(form.long_description.value == ""){
            errores.push("El campo  ``descripción`` no puede estar vacío"); 
        }   
        if(form.requirements.value == ""){
            errores.push("El campo ``Conocimientos previos`` no puede estar vacío"); 
        }   
        if(form.who_can.value == ""){
            errores.push("El campo ``A quien está dirigido`` no puede estar vacío"); 
        }     
        if(form.price.value == ""){
            errores.push("El campo ``precio`` no puede quedar vacío"); 
        }   
        if(form.discount.value == "" || form.discount.value < 0 || form.discount.value > 100){
            errores.push("El valor del descuento debe ir entre el 0% y 100%"); 
        }   
        if(form.course_owner.value == ""){
            errores.push("El campo `Profesor`` no puede quedar vacío"); 
        }   
        if(errores.length > 0){
            e.preventDefault();
            let ulErrores = document.querySelector(".errores");
            ulErrores.innerHTML = "";
            errores.forEach(error => {
                ulErrores.innerHTML += "<li>" + error + "</li>"
            });
        }
})}