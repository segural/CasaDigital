//  Requires
const { fileLoader } = require('ejs');
const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Lectura de la DB en formato de Sequelize
const db = require('../data/models');
const sequelize = db.sequelize;

// Creo la variable para no llamar en las function a db
const users = db.User;

// Defino en cada método del controlador cuál será la respuesta a cada requerimiento
const usersController ={

    register: (req, res)=>{ res.render ('./users/register')}, 
    // Crea - Method To create
    store: async (req,res) =>{
        let errors = validationResult(req);
       
        if(errors.isEmpty()){
            let image        
            if(req.file != undefined){
                image = req.file.filename
            } else {
                image = 'default-avatar.jpg'
            }
            let existingUser = await db.User.findOne({
                where: {
                    email: req.body.email
                    }
                });
            if (existingUser == undefined) {
                let user = await db.User.create ({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    birth_date: req.body.birth_date,
                    image: image
                });
                req.session.userLogged = user;
                res.redirect('./users/userProfile');
            } else {                
                return res.render (
                    './users/register',
                    {errors:{ email: {msg: "Ya existe un usuario registrado con ese email"}},
                    old: req.body}
                );
            };

            
        } else{
            return res.render ('./users/register', {errors:errors.mapped(), old: req.body});
        };        
    },

    login: (req, res)=>{ res.render ('./users/login')},

    loginProcess: (req, res) => {
        let errors = validationResult(req);        
        let userToLogin = undefined;
        if(errors.isEmpty()){
            users.findAll()
            .then(users => {
            for(user of users){
                if(user.email == req.body.email){
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        userToLogin = user;
                        break;
                    }
                }
            }
            if (userToLogin == undefined){
                return res.render ('./users/login', {errors:{ noUser:
                    {msg: "Credenciales inválidas"}
                }, old: req.body});
            }
            req.session.userLogged = userToLogin;
            if (req.body.rememberMe != undefined){
                res.cookie("rememberMe", userToLogin.email, {maxAge: 120000})
            }
            res.redirect("/users/userProfile"); 
        })            
        } else{
            return res.render ('./users/login', {errors:errors.mapped(), old: req.body});
        }        
    },

    logoutProcess: (req, res) => {        
        req.session.destroy();
        res.cookie("rememberMe", "", {maxAge: -1});
        res.redirect ('/');
    },

    userProfile: (req, res) => {
        res.render ('./users/userProfile');

    }
}


module.exports = usersController;