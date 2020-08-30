const db = require("../models");
const Facture = db.factura;

const {
    facturaval
  } = require("../../services/validation")

const factureController = {
  async  createfacture(req,res){
        const item = req.body;
        //Validar informacion enviada por el usuario
        const { error } = facturaval(item);
        if (error) return res.status(400).send(error.details[0].message);

        //Validar si ya existe el mismo numero
        const  numerodefactura =  await Facture.findAll({
            where:{
                numerodefactura:item.numerodefactura
            }
        });
        if(numerodefactura.length >=1) return res.status(403).send("this facture already exits")
        const facture ={
            nombre:item.nombre,
            descripcion:item.descripcion,
        }
        try {
            const savefacture = await Facture.create(facture);
            res.send(savefacture);
            
        } catch (error) {
            res.status(500).send(error)   
        }

    },
    async getfacture(req, res) {
        try {
          const id = req.params.id;
          const facture = await Facture.findAll({
            where: { id: id },
          });
          if (facture.length >= 1) return res.status(200).send(facture);
          return res.status(404).send("facture with id"+id+"not found");
        } catch (error) {
          res.status(500).send(error);
        }
      },
      async getAllfacturies(req, res) {
        try {
          const facture = await Facture.findAll({
          });
          if (facture.length >= 1) return res.status(200).send(facture);
          return res.status(404).send("factures not found");
        } catch (error) {
          res.status(500).send(error);
        }
      },
      async upadatefacture(req, res) {
        try {
          const id = req.params.id;
          const facture = await Facture.update(req.body, {
            where: { id: id },
          });
          if (facture == 1)
            return res.status(200).send("facture updated succesfully");
          return res
            .status(404)
            .send(
              `Cannot updated facture with id=${id} .Maybe facture was not found or req.body is empty!`
            );
        } catch (error) {
          res.status(500).send(error);
        }
      },
    
      deletefacture(req, res) {
        try {
          const id = req.params.id;
          Facture.destroy({
            where: { id: id },
          }).then((num) => {
            if (num == 1)
              return res.status(200).send("facture was deleted succesfully");
            return res
              .status(404)
              .send(
                `Cannot deleted facture with id=${id}. Maybe facture was not found !`
              );
          });
        } catch (error) {
          res.status(500).send(error);
        }
      },
}


module.exports = factureController;