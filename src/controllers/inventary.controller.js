const db = require("../models");
const Inventary = db.inventary;

const {
    inventaryval
  } = require("../../services/validation");

const inventaryController = {
  //METODO PARA CREAR INVENTARIO
  async  createinventary(req,res){
        const item = req.body;
        //Validar informacion enviada por el usuario
        const { error } = inventaryval(item);
        if (error) return res.status(400).send(error.details[0].message);


        const inventary ={
            cantidad:item.cantidad,
            PuntoVentumId:item.puntodeventa,
            ProductoId: item.producto
        }
        try {
            const saveinventary = await Inventary.create(inventary);
            res.send(saveinventary);
            
        } catch (error) {
            res.status(500).send(error)   
        }

    },
    //METODO PARA OBTENER INVENTARIO
    async getinventary(req, res) {
        try {
          const id = req.params.id;
          const inventary = await Inventary.findAll({
            where: { InventarioId: id },
            include:[{model:db.product},{model:db.pointofsales},{model:db.product}]
          });
          if (inventary.length >= 1) return res.status(200).send(inventary);
          return res.status(404).send("inventary with id"+id+"not found");
        } catch (error) {
          res.status(500).send(error);
        }
      },
//METODO PARA OBTENER INVENTARIO POR PUNTO DE VENTA
      async getinventaryByPointOfSale(req, res) {
        try {
          const id = req.params.puntodeventa;
          const inventary = await Inventary.findAll({
            where: { PuntoVentumId: id },
            include:[{model:db.product},{model:db.pointofsales}]
          });
          if (inventary.length >= 1) return res.status(200).send(inventary);
          return res.status(404).send("inventary with id"+id+"not found");
        } catch (error) {
          res.status(500).send(error);
        }
      },
      //OBTENER TODOS LOS DATOS DEL INVENTARIO
      async getAllinventaries(req, res) {
        try {
          const inventary = await Inventary.findAll({
              include:[{model:db.product},{model:db.pointofsales}]
          });
          if (inventary.length >= 1) return res.status(200).send(inventary);
          return res.status(404).send("data not found");
        } catch (error) {
          res.status(500).send(error);
        }
      },
      //ACTUALIZAR INVENTARIO
      async upadateinventary(req, res) {
        try {
          const id = req.params.id;
          const inventary = await Inventary.update(req.body, {
            where: { id: id },
          });
          if (inventary == 1)
            return res.status(200).send("inventary updated succesfully");
          return res
            .status(404)
            .send(
              `Cannot updated inventary with id=${id} .Maybe inventary was not found or req.body is empty!`
            );
        } catch (error) {
          res.status(500).send(error);
        }
      },
      //ELIMINAR INVENTARIO
    
      deleteinventary(req, res) {
        try {
          const id = req.params.id;
          Inventary.destroy({
            where: { id: id },
          }).then((num) => {
            if (num == 1)
              return res.status(200).send("inventary was deleted succesfully");
            return res
              .status(404)
              .send(
                `Cannot deleted inventary with id=${id}. Maybe inventary was not found !`
              );
          });
        } catch (error) {
          res.status(500).send(error);
        }
      },
}


module.exports = inventaryController;