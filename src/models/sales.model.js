//Definded model
module.exports = (sequelize,Sequelize)=>{
    const Sale = sequelize.define("Ventas",{
        fecha_de_compra:{
            type:Sequelize.DATE,
            allowNull:false
        },
        cantidad:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
  
    
      
    })
    return Sale
}