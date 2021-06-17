window.onload = function(){

    let form = document.querySelector(".main-form");
    let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    let image = document.querySelector("#image");
    let date = document.querySelector("#date");

    form.addEventListener("submit", function(e){
        let errores = [];
        if(form.first_name.value == "" || form.first_name.value.length < 2){
            errores.push("El Nombre es obligatorio y debe tener un minimo de 2 caracteres");
        }
        if(form.last_name.value == "" || form.last_name.value.length < 2){
            errores.push("El Apellido es obligatorio y debe tener un minimo de 2 caracteres");
        }
        if(form.email.value == ""){
            errores.push("El campo email es obligatorio"); 
        }
        if(form.password.value == ""){
            errores.push("La contraseña es obligatoria"); 
        }
        if(form.password.value.length < 8){
            errores.push("La contraseña debe tener un mínimo de 8 caracteres"); 
        }
        if(!form.password.value.match(/[A-Z]/) || !form.password.value.match(/[a-z]/) || !form.password.value.match(/\d/)){
            errores.push("La contraseña debe ser alfanumerica y contener Mayúsculas y Minúsculas"); 
        }
        if(date.value == ""){
            errores.push("Debe completar la fecha de cumpleaños"); 
        }
        if(form.image.value != ""){
            if(!allowedExtensions.exec(image.value)){
            errores.push("El formato de la imagen debe ser JPG/JPEG/GIF/PNG"); 
        }}
        if(errores.length > 0){
            e.preventDefault();
            let ulErrores = document.querySelector(".errores");
            ulErrores.innerHTML = "";
            errores.forEach(error => {
                ulErrores.innerHTML += "<li>" + error + "</li>"
            });
        }
})}