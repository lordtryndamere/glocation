//Models And DB Settings
const dbConfig  = require('../../dbConfig/db.config');
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
host:dbConfig.HOST,
dialect:dbConfig.dialect,
operatorAliases:false,

pool:{
    max :dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire :dbConfig.pool.acquire,
    idle:dbConfig.pool.idle
}
})

const db = {};
db.DataType = Sequelize;
db.sequelize = sequelize;


//Call models

db.business =require('./business.model')(sequelize,Sequelize);
db.category =require('./category.model')(sequelize,Sequelize);
db.inventary =require('./inventary.model')(sequelize,Sequelize);
db.pointofsales =require('./pointofsales.model')(sequelize,Sequelize);
db.product =require('./product.model')(sequelize,Sequelize);
db.sales =require('./sales.model')(sequelize,Sequelize);
db.user =require('./user.model')(sequelize,Sequelize);




//Associations





module.exports = db