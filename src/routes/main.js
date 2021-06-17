// Requiero los módulos de node que se van ausar:
const express = require("express");
const router = express.Router();
const guestMiddleware = require("../middlewares/guestMiddleware");

// Requiero el controller al que apuntan las rutas que defino maás abajo:
const mainController = require("../controllers/mainController.js");


// Defino las rutas, es decir que controlador y cuál de sus métodos es el que va a manejar el requerimiento
router.get("/", mainController.index);
router.post('/search', mainController.search);
router.get("/UnderConstruction", mainController.underConstruction);

module.exports = router;