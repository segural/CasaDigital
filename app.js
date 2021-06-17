//Requiero paquetes y genero las variables(espress,path):
const express = require ('express');
const path = require ('path');
const app = express ();
const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE
const publicPath = path.resolve ('./public');
console.log (publicPath);
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userLoggedMiddleware = require("./src/middlewares/userLoggedMiddleware");
const rememberMeMiddleware = require("./src/middlewares/rememberMeMiddleware");

//Requiero el/los archivo/s de rutas que se usarán para dirigir las paticiones:
const mainRoutes = require("./src/routes/main.js");
const productsRoutes = require("./src/routes/products.js");
const usersRoutes = require("./src/routes/users.js");
const apiRoutes = require("./src/routes/api.js");


//Defino el/los middlewares que se usarán de forma global:
app.use(express.static (publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method')); // Para poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(session({secret: "CasaDigital", resave:false, saveUninitialized:true}));
app.use(userLoggedMiddleware);
app.use(rememberMeMiddleware);


// Establezco Engine de Vistas
app.set('view engine', 'ejs');
app.set('views' , './src/views/')

//Indico para cada petición, el archivo de rutas que lo manejará:
app.use("/", mainRoutes);
app.use("/users", usersRoutes);
app.use('/products', productsRoutes);
app.use('/api', apiRoutes);

//levanto server express en puerto 3000
app.listen (process.env.PORT || 3000, function () {
    console.log ('Servidor corriendo en puerto 3000');
});