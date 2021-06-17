//  Requires
const { fileLoader } = require('ejs');
const path = require('path');
const { validationResult } = require('express-validator');

// Lectura de la DB en formato de Sequelize
const db = require("../data/models");
const sequelize = db.sequelize;

//  Conversion de números a formato con punto "." como separador de miles:
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// Defino en cada método del controlador cuál será la respuesta a cada requerimiento
const productsController ={
		
	index: async (req, res)=>{
		let categories = await db.Category.findAll()
        let courses = await db.Course.findAll(
			{include: [
				{association:"category"},
				{association:"audio"},
				{association:"currency"},
				{association:"subtitles"}
			]}
		);
        
        res.render("./products/products", {products: courses, categories, toThousand});
                
    },

// Muestra todos los productos de la categoría seleccionada:
	byCategory: async (req, res)=>{	
		let categories = await db.Category.findAll({
			where:{ category_name: req.params.category }
		})
        let courses = await db.Course.findAll(			
			{include: [
				{association:"category"},
				{association:"audio"},
				{association:"currency"},
				{association:"subtitles"}
			]}
		)
        
        res.render("./products/products", {products: courses, categories, toThousand});


	},

// Muestra todos los productos de la categoría seleccionada:
	byCommunity: async (req, res)=>{
		let community = req.params.community;
		let courses = await db.Course.findAll(
			{include: [
				{association:"category"},
				{association:"audio"},
				{association:"currency"},
				{association:"subtitles"}
			]}
		)
		res.render("./products/community",{products: courses, community,toThousand});
	},


// Envia al form to create
    create: async (req,res) =>{
		let categories = await db.Category.findAll();
		let audioLangs = await db.Audio.findAll();
		let subtitles = await db.Subtitle.findAll()
		let currencies = await db.Currency.findAll() 
		res.render ('./products/newProduct', {categories, currencies, audioLangs, subtitles})
	},

// Crea - Method To create
    store: async (req,res) =>{
        let errors = validationResult (req);
		let categories = await db.Category.findAll();
		let audioLangs = await db.Audio.findAll();
		let subtitles = await db.Subtitle.findAll();
		let currencies = await db.Currency.findAll(); 
        if(errors.isEmpty()){
            let image        
            if(req.file != undefined){
                image = req.file.filename
            } else {
                image = 'default-image.jpg'
            }
			let newCourse = await db.Course.create ({

				course_title: req.body.course_title,
				short_description: req.body.short_description,
				long_description: req.body.long_description,
				category_id: req.body.category_id,
				requirements: req.body.requirements,
				who_can: req.body.who_can,
				audio_id: req.body.audio_id,
				price: req.body.price,
				discount: req.body.discount,
				currency_id: req.body.currency_id,
				course_owner: req.body.course_owner,
				image: image,
				creation_date: new Date()
			})
			await newCourse.addSubtitles(req.body.subtitle_id)
			res.redirect ('./products')

        } else{
            return res.render ('./products/newProduct', {errors:errors.mapped(), old: req.body, categories, currencies, audioLangs, subtitles});
        };        
    },

    detail: async (req,res) =>{       
		let course = await db.Course.findByPk (req.params.id,
			{include: [
				{association:"category"},
				{association:"audio"},
				{association:"currency"},
				{association:"subtitles"}
			]});

        res.render ('./products/productDetail', {product: course, toThousand})
    },

// Envia formulario de edicion
    edit: async (req,res) =>{
		let categories = await db.Category.findAll();
		let audioLangs = await db.Audio.findAll();
		let subtitles = await db.Subtitle.findAll()
		let currencies = await db.Currency.findAll()

		let courseToEdit = await db.Course.findByPk (req.params.id,
			{include: [
				{association:"category"},
				{association:"audio"},
				{association:"currency"},
				{association:"subtitles"}
			]});

        let selectedSubtitles =[];
		courseToEdit.subtitles.forEach((language) => {selectedSubtitles.push(language.id)})
		res.render ('./products/editProduct',{productToEdit: courseToEdit, categories, currencies, audioLangs, subtitles, selectedSubtitles, toThousand})
		
    },

// EDITA - Method to Update
	update: async (req, res) => {
		let errors = validationResult (req);
		let categories = await db.Category.findAll();
		let audioLangs = await db.Audio.findAll();
		let subtitles = await db.Subtitle.findAll();
		let currencies = await db.Currency.findAll();
		let courseToEdit = await db.Course.findByPk (req.params.id,
			{include: [
				{association:"category"},
				{association:"audio"},
				{association:"currency"},
				{association:"subtitles"}
			]});
		if(errors.isEmpty()){
			let image
			if(req.file != undefined){
				image = req.file.filename
			} else {
				image = courseToEdit.image
			}
			await db.Course.update(
				{
					course_title: req.body.course_title,
					short_description: req.body.short_description,
					long_description: req.body.long_description,
					category_id: req.body.category_id,
					requirements: req.body.requirements,
					who_can: req.body.who_can,
					audio_id: req.body.audio_id,
					price: req.body.price,
					discount: req.body.discount,
					currency_id: req.body.currency_id,
					course_owner: req.body.course_owner,
					image: image,
				},
				{
					where: {id: req.params.id}
				}
			);
			let updatedCourse = await db.Course.findByPk (req.params.id);
			await updatedCourse.setSubtitles(req.body.subtitle_id);
			res.redirect('/products');
			
		}else{
			return res.render ('./products/editProduct', {errors:errors.mapped(), old: req.body, productToEdit: courseToEdit, categories, currencies, audioLangs, subtitles})
		}
	},

    destroy: async (req,res) =>{
		let courseToDelete = await db.Course.findByPk(req.params.id,{include:['subtitles']});
		await courseToDelete.destroy();
		res.redirect("/products/");

    },
    
// Carrito de compras
    productCart: async (req,res) =>{
		if (req.session.userLogged != undefined) {
			let userLogged = await db.User.findByPk (req.session.userLogged.id);
			let userCourses = await userLogged.getCourses(
				{include: [
					{association:"category"},
					{association:"audio"},
					{association:"currency"},
					{association:"subtitles"},
					{association:"users"}
				]}
			);
			res.render ('./products/productCart', {products: userCourses});
			
		} else {
			res.redirect("/users/login");
		}	
		
	},

	productCartAdd: async (req,res) => {
		let courseToAdd = await db.Course.findByPk(req.params.idprod);
		await courseToAdd.setUsers(req.params.iduser);
		res.redirect('/products/productCart');
	},


// Listado de productos para admin
	productList: async (req,res) => {
		let categories = await db.Category.findAll()
        let courses = await db.Course.findAll({include: ['category']})
        
        res.render("./products/productList", {products: courses, categories});
	},
    
}



module.exports = productsController