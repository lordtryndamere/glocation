//Definded model
module.exports = (sequelize,Sequelize)=>{
    const Factura = sequelize.define("Factura",{
        total:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        numerodefactura:{
            type:Sequelize.INTEGER,
            allowNull:false
        }
      
    })
    return Factura
}