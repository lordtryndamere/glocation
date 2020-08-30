const db = require("../models");
const Pointofsales = db.pointofsales;

const {
    Pointofsale,
    
  } = require("../../services/validation")


  const { getLocation } = require("../../services/getLocation");

const pointofsalesController = {
  async  createpointofsales(req,res){
        const item = req.body;
        //Location
        const location = await getLocation(item.direccion, item.ciudad);
        //Validar informacion enviada por el usuario
        const { error } = Pointofsale(item);
        if (error) return res.status(400).send(error.details[0].message);

        //Validar si ya existe el mismo  Nombre
        const  nameExits =  await Pointofsales.findAll({
            where:{
                nombre:item.nombre
            }
        });

        if(nameExits.length >=1) return res.status(403).send(" name already exits")

        const pointofsale ={
            nombre:item.nombre,
            direccion:item.direccion,
            ciudad:item.ciudad,
            coordenadas: {
                lat: location.lat ? location.lat : "",
                lng: location.lng ? location.lng : "",
              },
            EmpresaId:item.empresa
        }
        try {
            const savepointofsales = await Pointofsales.create(pointofsale);
            res.send(savepointofsales);
            
        } catch (error) {
            res.status(500).send(error)   
        }

    },
    async getpointofsale(req, res) {
        try {
          const id = req.params.id;
          const pointofsales = await Pointofsales.findAll({
            where: { id: id },
            include:[{model:db.business}]
          });
          if (pointofsales.length >= 1) return res.status(200).send(pointofsales);
          return res.status(404).send("pointofsale with id "+id+"not found");
        } catch (error) {
          res.status(500).send(error);
        }
      },
      async getAllpointofsales(req, res) {
        try {
          const pointofsales = await Pointofsales.findAll({
            include:[{model:db.business}]
          });
          if (pointofsales.length >= 1) return res.status(200).send(pointofsales);
          return res.status(404).send("pointofsales not found");
        } catch (error) {
          res.status(500).send(error);
        }
      },
      async upadatepointofsales(req, res) {
        try {
          const id = req.params.id;
          const pointofsales = await Pointofsales.update(req.body, {
            where: { id: id },
          });
          if (pointofsales == 1)
            return res.status(200).send("pointofsale updated succesfully");
          return res
            .status(404)
            .send(
              `Cannot updated pointofsale with id=${id} .Maybe pointofsale was not found or req.body is empty!`
            );
        } catch (error) {
          res.status(500).send(error);
        }
      },
    
      deletepointofsales(req, res) {
        try {
          const id = req.params.id;
          Pointofsales.destroy({
            where: { id: id },
          }).then((num) => {
            if (num == 1)
              return res.status(200).send("pointofsale was deleted succesfully");
            return res
              .status(404)
              .send(
                `Cannot deleted pointofsale with id=${id}. Maybe pointofsale was not found !`
              );
          });
        } catch (error) {
          res.status(500).send(error);
        }
      },
  
}


module.exports = pointofsalesController;