module.exports = (sequelize,Sequelize)=>{
    const Sale = sequelize.define("Ventas",{
        precio:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
  
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