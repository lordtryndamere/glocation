//VALIDATION
const Joi = require('@hapi/joi');


const registervalidation = data =>{
    const schema  = {
        name:Joi.string().min(3).required(),
        email:Joi.string().min(3).required().email(),
        contraseña:Joi.string().min(6).required(),
        direccion:Joi.string().required(),
        ciudad:Joi.string().required(),
        celular:Joi.string().required(),
        role:Joi.string().required(),
   
    }
    return Joi.validate(data,schema)
}

const Loginvalidation = data =>{
    const schema  = {
        email:Joi.string().min(3).required().email(),
        contraseña:Joi.string().min(6).required()
    }
    return Joi.validate(data,schema)
}
const Businessvalidation = data=>{
    const schema ={
        name:Joi.string().min(3).required(),
        nit:Joi.number().min(10).required(),
        celular:Joi.string().min(10).required(),
        user:Joi.required()

    }
    return Joi.validate(data,schema)
}

const Pointofsale = data =>{
    const schema = {
        nombre:Joi.string().min(3).required(),
        direccion:Joi.string().required(),
        ciudad:Joi.string().required(),
        empresa:Joi.required(),
     
    }
    return Joi.validate(data,schema)
}

const Products = data =>{
    const schema ={
        nombre:Joi.string().min(3).required(),
        descripcion:Joi.string().max(400).required(),
        precio:Joi.number().required(),
        categoria:Joi.required(),
    }
    return Joi.validate(data,schema)
}
const Categoryval = data =>{
    const schema = {
        nombre:Joi.string().min(3).required(),
        descripcion:Joi.string().min(10).required(),
    }
    return Joi.validate(data,schema)
}
const Facturaval = data =>{
    const schema = {
        total:Joi.number().required(),
        numerodefactura:Joi.number().min(5).required(),
        venta:Joi.required()
    }
    return Joi.validate(data,schema)
}
const Sales = data =>{
    const schema = {
        puntodeventa:Joi.required(),
        producto:Joi.required(),
        usuario:Joi.required(),
        fecha_de_compra:Joi.required(),
        cantidad:Joi.number().required()

    

    }
    return Joi.validate(data,schema)
}
const inventary = data =>{
    const schema = {
        cantidad:Joi.number().required(),
        producto:Joi.required(),
        puntodeventa:Joi.required()
    }
    return Joi.validate(data,schema)
}

module.exports.registervalidation = registervalidation;
module.exports.loginvalidation = Loginvalidation;
module.exports.businessvalidation = Businessvalidation;
module.exports.Pointofsale= Pointofsale;
module.exports.products = Products;
module.exports.Categoryval = Categoryval;
module.exports.salesval = Sales;
module.exports.inventaryval = inventary;
module.exports.facturaval = Facturaval;
