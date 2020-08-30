//Definded model
module.exports = (sequelize,Sequelize)=>{
    const User = sequelize.define("User",{
        name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false
        },
        contraseña:{
            type:Sequelize.STRING,
            allowNull:false
        },
        celular:{
            type:Sequelize.BIGINT(10),
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
        },
        role:{
            type:Sequelize.STRING,
            allowNull:false

        }
    })
    return User
}