module.exports = (sequelize,Sequelize)=>{
    const Category = sequelize.define("Categorias",{
        nombre:{
            type:Sequelize.STRING,
            allowNull:false
        },
        descripcion:{
            type:Sequelize.STRING,
            allowNull:false
        }
      
    })
    return Category
}