//Definded model
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
        }
      
    })
    return Product
}