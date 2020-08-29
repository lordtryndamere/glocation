module.exports = (sequelize,Sequelize)=>{
    const Product = sequelize.define("Producto",{
        nombre:{
            type:Sequelize.STRING,
            allowNull:false
        },
        descripcion:{
            type:Sequelize.STRING,
            allowNull:false
        },
        precio:{
            type:Sequelize.INTEGER                     ,
            allowNull:false
        },
        disponible:{
            type:Sequelize.BOOLEAN,
            allowNull:false
        }
    
      
    })
    return Product
}