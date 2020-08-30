//Definded model
module.exports = (sequelize,Sequelize)=>{
    const Business = sequelize.define("Empresa",{
        name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        nit:{
            type:Sequelize.BIGINT(10),
            allowNull:false
        },
        celular:{
            type:Sequelize.BIGINT(10),
            allowNull:false
        }
    })
    return Business
}