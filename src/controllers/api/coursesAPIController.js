const db = require('../../data/models');
const sequelize = db.sequelize;


const coursesAPIController = {
    'list': async (req, res) => {
        let courses = await db.Course.findAll(
            {
            include: ['category'],
            attributes: ['id','course_title','short_description','price','discount','course_owner']
            }
        );        
        let coursesURL = courses.map(course =>{            
            course.dataValues.url = `/api/courses/${course.id}`;
            return course
        });
        let categories = []
            courses.map(category =>{
            categories.push(category.category.category_name)
        });
        const result = [];
        categories.forEach((item)=>{
            if(!result.includes(item)){
                result.push(item);
            }
        })
        let Finanzas = 0;
        courses.map(course =>{            
            if (course.category.category_name == "Finanzas"){
                Finanzas = Finanzas + 1
            }
        });
        let Excel = 0;
        courses.map(course =>{            
            if (course.category.category_name == "Excel"){
                Excel = Excel + 1
            }
        });
        let Desarrollo = 0;
        courses.map(course =>{            
            if (course.category.category_name == "Desarrollo"){
                Desarrollo = Desarrollo + 1
            }
        });
        let Fotografia = 0;
        courses.map(course =>{            
            if (course.category.category_name == "Fotografía"){
                Fotografia = Fotografia + 1
            }
        });
        let respuesta = {
            meta: {
                count: courses.length,
                countCategories: result.length,
                countByCategory: {               
                    Finanzas: Finanzas,
                    Fotografía: Fotografia,
                    Excel: Excel,
                    Desarrollo: Desarrollo,
                },
            },
            Product: coursesURL
        };
        res.json(respuesta);
    },
    'detail': async (req, res) => {
        let course = await db.Course.findByPk (req.params.id,
			{include: [
				{association:"category"},
				{association:"audio"},
				{association:"currency"},
				{association:"subtitles"}
			]});
        course.dataValues.image = `/images/products/${course.image}`;
        res.json(course);
    }

};

module.exports = coursesAPIController;