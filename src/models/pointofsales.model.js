//Definded model
module.exports = (sequelize,Sequelize)=>{
    const Pointofsale = sequelize.define("PuntoVenta",{
        nombre:{
            type:Sequelize.STRING,
            allowNull:false
        },
        direccion:{
            type:Sequelize.STRING,
            allowNull:false
        },
        ciudad:{
            type:Sequelize.STRING,
            allowNull:false
        },
        coordenadas:{
            type:Sequelize.JSON
        }
    
      
    })
    return Pointofsale
}