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
        //coordenadas:Joi.required(),
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
        nombre:Joi.string().min(3).required(),
        nit:Joi.number().min(10).max(10).required(),
        celular:Joi.string().min(10).max(10).required(),
        UsuarioId:Joi.number().required()

    }
    return Joi.validate(data,schema)
}

const Pointofsale = data =>{
    const schema = {
        nombre:Joi.string().min(3).required(),
        direccion:Joi.string().required(),
        ciudad:Joi.string().required(),
        EmpresaId:Joi.required()
        //coordenadas:Joi.required()
    }
    return Joi.validate(data,schema)
}

const Products = data =>{
    const schema ={
        name:Joi.string().min(3).required(),
        descripcion:Joi.string().max(400).required(),
        precio:Joi.number().required(),
        disponible:Joi.boolean().required(),
        CategoriasId:Joi.required(),
    }
    return Joi.validate(data,schema)
}
const Category = data =>{
    const schema = {
        nombre:Joi.string().min(3).required(),
        descripcion:Joi.string().min(10).required(),
    }
    return Joi.validate(data,schema)
}
const Sales = data =>{
    const schema = {
        Punto_de_ventaId:Joi.required(),
        InventaioId:Joi.required(),
        UsuarioId:Joi.required(),
        precio:Joi.number().required(),
        fecha_de_compra:Joi.required(),
        cantidad:Joi.number().required()

    

    }
    return Joi.validate(data,schema)
}
const inventary = data =>{
    const schema = {
        cantidad:Joi.number().required(),
        ProductoId:Joi.required(),
        Punto_de_ventaId:Joi.required()
    }
    return Joi.validate(data,schema)
}

module.exports.registervalidation = registervalidation;
module.exports.loginvalidation = Loginvalidation;
module.exports.businessvalidation = Businessvalidation;
module.exports.Pointofsale= Pointofsale;
module.exports.products = Products;
module.exports.category = Category;
module.exports.sales = Sales;
module.exports.inventary = inventary;
