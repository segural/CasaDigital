// Requiero los módulos de node que se van a usar:
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const bcrypt = require('bcrypt');

// Middleware que sólo permite acceder a ciertas rutas si NO se está loggeado:
const guestMiddleware = require("../middlewares/guestMiddleware");

//Middlewares para validacion de formularios del Backend:
const validateUserStore = require ("../middlewares/validateUserStore");
const validateUserLogin = require ("../middlewares/validateUserLogin");


// Requiero el controller al que apuntan las rutas que defino maás abajo:
const usersController = require("../controllers/usersController.js")

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/users");
    },
    filename: (req, file, cb) => {
        const newImageName = "img-" + Date.now() + path.extname(file.originalname);
        cb(null, newImageName );
    }
});

const upload = multer({storage: storage});

// Rutas para: Creación de usuarios 
router.get("/register", guestMiddleware, usersController.register);
router.post('/', upload.single("image"), validateUserStore, usersController.store);


// Rutas para: Perfil de usuarios
router.get("/userProfile", usersController.userProfile);

// Rutas para: Proceso de formulario de Login
router.get("/login", guestMiddleware, usersController.login);
router.post("/login", validateUserLogin, usersController.loginProcess);
router.post("/logout", usersController.logoutProcess);

module.exports = router;