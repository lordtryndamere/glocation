const db = require("../models");
const Business = db.business;
const Op = db.Sequelize.Op;
const {
    businessvalidation,
    
  } = require("../../services/validation")

const businessController = {
  //METODO PARA CREAR UNA EMPRESA
  async  createBusiness(req,res){
        const item = req.body;
        //Validar informacion enviada por el usuario
        const { error } = businessvalidation(item);
        if (error) return res.status(400).send(error.details[0].message);

        //Validar si ya existe el mismo NIT Y Nombre
        const  nitandNameExists =  await Business.findAll({
            where: {
                [Op.or]: [{nit: item.nit}, {name: item.name}]
              }
        });
        if(nitandNameExists.length >=1) return res.status(403).send("Nit or name already exists")
        const business ={
            name:item.name,
            nit:item.nit,
            celular:item.celular,
            UserId:item.usuario

        }
        try {
            const saveBusiness = await Business.create(business);
            res.send(saveBusiness);
            
        } catch (error) {
            res.status(500).send(error)   
        }

    },
    //METODO PARA OBTENER UNA EMPRESA 
    async getBusiness(req, res) {
        try {
          const id = req.params.id;
          const business = await Business.findAll({
            where: { id: id },
            include:[{model:db.user}]
          });
          if (business.length >= 1) return res.status(200).send(business);
          return res.status(404).send("business with id"+id+"not found");
        } catch (error) {
          res.status(500).send(error);
        }
      },
      //METODO PARA OBTENER TODAS LAS EMPRESAS
      async getAllBusiness(req, res) {
        try {
          const business = await Business.findAll({
            include:[{model:db.user}]
          });
          if (business.length >= 1) return res.status(200).send(business);
          return res.status(404).send("business not found");
        } catch (error) {
          res.status(500).send(error);
        }
      },
      //METODO PARA ACTUALIZAR UNA EMPRESA
      async upadateBusiness(req, res) {
        try {
          const id = req.params.id;
          const business = await Business.update(req.body, {
            where: { id: id },
          });
          if (business == 1)
            return res.status(200).send("business updated succesfully");
          return res
            .status(404)
            .send(
              `Cannot updated business with id=${id} .Maybe business was not found or req.body is empty!`
            );
        } catch (error) {
          res.status(500).send(error);
        }
      },
      //METODO PARA ELIMINAR UNA EMPRESA
    
      deleteBusiness(req, res) {
        try {
          const id = req.params.id;
          Business.destroy({
            where: { id: id },
          }).then((num) => {
            if (num == 1)
              return res.status(200).send("business was deleted succesfully");
            return res
              .status(404)
              .send(
                `Cannot deleted business with id=${id}. Maybe business was not found !`
              );
          });
        } catch (error) {
          res.status(500).send(error);
        }
      },
}


module.exports = businessController;