module.exports = (sequelize,Sequelize)=>{
    const Inventary = sequelize.define("Inventario",{
        cantidad:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
    
      
    })
    return Inventary
}