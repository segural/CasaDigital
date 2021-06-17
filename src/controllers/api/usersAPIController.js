const db = require('../../data/models');
const sequelize = db.sequelize;


const usersAPIController = {
    'list': async (req, res) => {
        let users= await db.User.findAll({
            attributes: ['id','first_name','email']
        });
        let usersURL = users.map(user =>{            
            user.dataValues.detail = `/api/users/${user.id}`;
            return user;
        });
        
        let respuesta = {
            meta: {
                count: users.length,
            },
            User: usersURL
        }
       
        res.json(respuesta);
            
    },
    'detail': async (req, res) => {
        let user = await db.User.findByPk(req.params.id,{
            attributes: ['id','first_name', 'last_name', 'birth_date','email','image']
        });
        user.dataValues.image = `/images/users/${user.image}`;
        res.json(user);
    }

}

module.exports = usersAPIController;