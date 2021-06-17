// Requiero los módulos de node que se van ausar:
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Middleware que sólo permite acceder a ciertas rutas si se está loggeado:
const authMiddleware = require("../middlewares/authMiddleware");

//Middleware para validacion de formulario del Backend:
const validateProduct = require("../middlewares/validateProduct");

// Requiero el controller al que apuntan las rutas que defino maás abajo:
const productsController = require("../controllers/productsController.js")

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/products");
    },
    filename: (req, file, cb) => {
        const newImageName = "img-" + Date.now() + path.extname(file.originalname);
        cb(null, newImageName );
    }
});
const upload = multer({storage: storage});

// Rutas para: Listado de productos para admin
router.get("/productList", authMiddleware, productsController.productList);

//  Aqui irán las rutas para procesar las compras.
router.get("/productCart", authMiddleware, productsController.productCart);
router.post("/add/:idprod/:iduser", authMiddleware, productsController.productCartAdd);

//  Rutas para: Creación de productos
router.get("/newProduct", authMiddleware, productsController.create);
router.post('/', upload.single("image"), validateProduct, productsController.store);

//  Rutas para: Listado de productos:
router.get("/", productsController.index);

//  Rutas para: Listado de productos de una categoría:
router.get("/:category", productsController.byCategory);

//  Rutas para: Listado de productos de por docente (Comunidad):
router.get("/community/:community", productsController.byCommunity);

//  Rutas para: Detalle de un producto particular
router.get("/:id/productDetail", productsController.detail);

//  Rutas para: Edición de productos
router.get('/:id/edit', authMiddleware, productsController.edit); 
router.put('/:id', upload.single("image") ,validateProduct, productsController.update);

//  Rutas para: Borrado de productos
router.delete('/:id', productsController.destroy);







module.exports = router;