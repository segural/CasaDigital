window.onload = function(){
    let boton = document.querySelector("#boton");
    let boton1 = document.querySelector("#boton1");
    let acceso = 0
    let input = document.querySelector("#secreto");
    input.addEventListener("keyup", function(e) {
       switch (acceso) {
            case 0:
                e.key == "c" ? acceso++ : (acceso = 0);
                break;
            case 1:
                e.key == "u" ? acceso++ : (acceso = 0);
                break;
            case 2:
                e.key == "r" ? acceso++ : (acceso = 0);
                break;
            case 3:
                e.key == "s" ? acceso++ : (acceso = 0);
                break;
            case 4:
                e.key == "o" ? acceso++ : (acceso = 0);
                break;
            case 5:
                e.key == "s" ? boton.style.display= "block" : (acceso = 0);
                break;

       }
    })
}