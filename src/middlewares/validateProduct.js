const {check} = require("express-validator");
const path = require("path");
const { nextTick } = require("process");

let validateProduct = [
    check("course_title")
        .notEmpty().withMessage("Debes introducir un nombre").bail()
        .isLength({min: 5}).withMessage("El título debe tener al menos 5 caracteres"),

    check("short_description")
        .notEmpty().withMessage("Debes introducir una descripción").bail()
        .isLength({min: 5}).withMessage("La descripción debe contener al menos 5 caracteres"),
    
    check("long_description")
        .notEmpty().withMessage("Debes introducir una descripción más extensa").bail()
        .isLength({min: 10}).withMessage("La descripción debe contener al menos 10 caracteres"),
                
        check("image").custom((value, {req}) =>{
            if (req.file != undefined){
            switch(path.extname(req.file.originalname)){
                case ".jpg": return ".jpg";
                break;
                case ".jpeg": return ".jpeg";
                break;
                case ".png": return ".png";
                break;
                case ".gif": return ".gif";
                break;
                default: return false
            }} else {
                return true
            }
        }).withMessage("Solo se admiten imágenes .jpg, .jpeg, .png, .gif"),
    
    check("category_id")
        .notEmpty().withMessage("Debes seleccionar una categoria").bail(),
    
    check("requirements")
        .notEmpty().withMessage("Debes detallar los requerimietnos previos para el curso").bail(),
    
    check("who_can")
        .notEmpty().withMessage("Debes describir a quién está dirigido el curso").bail()
        .isLength({min: 10}).withMessage("Debes agregar al menos 10 caracteres"),
    
    check("audio_id")
        .notEmpty().withMessage("Debes seleccionar una categoria").bail(),
    
    check("price")
        .notEmpty().withMessage("Debes fijar un valor al precio").bail(),
    
    check("discount")
        .notEmpty().withMessage("Debes fijar un valor al descuento").bail(),
        
    check("currency_id")
        .notEmpty().withMessage("Debes seleccionar una moneda").bail(),
    
    check("course_owner")
    .notEmpty().withMessage("Debes introducir el nombre del profesor").bail(),
];

module.exports = validateProduct;