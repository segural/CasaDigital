const db = require('../../data/models');
const sequelize = db.sequelize;


const lastCourseAPIController = {
    'list': async (req, res) => {
        let courses= await db.Course.findAll();
        let coursesURL = courses.map(course =>{            
            course.dataValues.url = `http://localhost:8000/images/products/${course.image}`;
            return course
        });
       
        let last = coursesURL[courses.length-1]
        
        let respuesta = {
            meta: {
                TotalOfCourses: courses.length,
            },
            LastCourse: last
        }
       
        res.json(respuesta);
            
    },
}

module.exports = lastCourseAPIController;