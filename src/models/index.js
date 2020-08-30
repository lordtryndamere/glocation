//Call DB settings
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
db.Sequelize = Sequelize;
db.sequelize = sequelize;


//Call models

db.business =require('./business.model')(sequelize,Sequelize);
db.category =require('./category.model')(sequelize,Sequelize);
db.inventary =require('./inventary.model')(sequelize,Sequelize);
db.pointofsales =require('./pointofsales.model')(sequelize,Sequelize);
db.product =require('./product.model')(sequelize,Sequelize);
db.sales =require('./sales.model')(sequelize,Sequelize);
db.user =require('./user.model')(sequelize,Sequelize);
db.factura = require('./facture.model')(sequelize,Sequelize);




//Associations

// RELACION EMPRESA A PUNTOS DE VENTA
db.business.hasMany(db.pointofsales,{onDelete:"cascade"});
//RELACION PUNTOS DE VENTA A EMPRESA
db.pointofsales.belongsTo(db.business,{
    foreingKey:{
        allownull:false,
        onDelete:"cascade"
    }
});

//RELACION INVENTARIO A PUNTOS DE VENTA
db.inventary.belongsTo(db.pointofsales,{
    foreingKey:{
        allownull:false,
        onDelete:"cascade"
    }
});
//RELACION INVENTARIO A PRODUCTO
db.inventary.belongsTo(db.product,{
    foreingKey:{
        allownull:false,
        onDelete:"cascade"
    }
});
//RELACION PUNTOS DE VENTA A INVENTARIO
db.pointofsales.hasMany(db.inventary,{onDelete:"cascade"});
//RELACION PRODUCTO A INVENTARIO
db.product.hasMany(db.inventary,{onDelete:"cascade"});
//RELACION CATEGORIA A PRODUCTO
db.category.hasMany(db.product,{onDelete:"cascade"});
//RELACION PRODUCTO A CATEGORIA
db.product.belongsTo(db.category,{
    foreingKey:{
        allownull:false,
        onDelete:"cascade"
    }
})
//RELACION PRODUCTO A VENTAS
db.product.hasMany(db.sales,{onDelete:"cascade"});
//RELACION VENTAS A PRODUCTO
db.sales.belongsTo(db.product,{
    foreingKey:{
        allownull:false,
        onDelete:"cascade"
    }
});

//RELACION USUARIO A VENTAS
db.user.hasMany(db.sales,{onDelete:"cascade"});
//RELACION VENTAS A USUARIO
db.sales.belongsTo(db.user,{
    foreingKey:{
        allownull:false,
        onDelete:"cascade"
    }
});
//RELACION PUNTOS DE VENTA A VENTAS
db.pointofsales.hasMany(db.sales,{onDelete:"cascade"});
//RELACION VENTAS A PUNTOS DE VENTA
db.sales.belongsTo(db.pointofsales,{
    foreingKey:{
        allownull:false,
        onDelete:"cascade"
    }
})
//RELACION EMPRESA USUARIO
db.user.hasMany(db.business,{onDelete:"cascade"});
db.business.belongsTo(db.user,{
    foreingKey:{
        allownull:false,
        onDelete:"cascade"
    }
})
//RELACION FACTURA A VENTA  
db.sales.hasMany(db.factura,{onDelete:"cascade"})
db.factura.belongsTo(db.sales,{
    foreingKey:{
        allownull:false,
        onDelete:"cascade"
    }
})





module.exports = db