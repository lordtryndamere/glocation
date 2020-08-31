const db = require("../models");
const Sales = db.sales;
const Inventary = db.inventary;

const { salesval } = require("../../services/validation");

const salesController = {
  //METODO PARA CREAR UNA VENTA

  async createSale(req, res) {
    const item = req.body;
    //Validar informacion enviada por el usuario
    const { error } = salesval(item);
    if (error) return res.status(400).send(error.details[0].message);
    //Se validad si existe el producto en el inventario y en el punto de venta
    const productExits = await Inventary.findAll({
      where: {
        ProductoId: item.producto,
        PuntoVentumId: item.puntodeventa,
      },
    });
    if (productExits.length <= 0)
      return res.status(404).send("This product is not available");
    let cantidadproducto = productExits[0].dataValues.cantidad;
    let id = productExits[0].dataValues.id;
    //Se valida si hay suficientes unidades
    if (cantidadproducto < parseInt(item.cantidad))
      return res
        .status(400)
        .send(
          "there are not enough units of this product " +
            "alvalibles units : " +
            cantidadproducto
        );
    const Buy = {
      cantidad: item.cantidad,
      fecha_de_compra: item.fechadecompra,
      ProductoId: item.producto,
      UserId: item.usuario,
      PuntoVentumId: item.puntodeventa,
      EmpresaId:item.empresa
    };

    try {
      let newcantidad = {
        cantidad: cantidadproducto - parseInt(item.cantidad),
      };
      const saveSale = await Sales.create(Buy);
      await Inventary.update(newcantidad, {
        where: { id: id },
      });

      res.send(saveSale);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  //METODO PARA OBTENER UNA VENTA
  async getSale(req, res) {
    try {
      const id = req.params.id;
      const sale = await Sales.findAll({
        where: { id: id },
        include:[{model:db.product},{model:db.user} ]
      });
      if (sale.length >= 1) return res.status(200).send(sale);
      return res.status(404).send("Sale with id "+id+"not found");
    } catch (error) {
      res.status(500).send(error);
    }
  },
//METODO PARA OBTENER VENTAS POR PUNTO DE VENTA EMPRESA
  async getSaleByPointOfSale(req, res) {
    try {
      const id = req.params.puntodeventa;
      const sale = await Sales.findAll({
        where: { PuntoVentumId: id },
        include:[{model:db.pointofsales}]
      });
      if (sale.length >= 1) return res.status(200).send(sale);
      return res.status(404).send("Sales with id pointofsale "+id+"not found");
    } catch (error) {
      res.status(500).send(error);
    }
  },
  //METODO PARA OBTENER VENTAS POR EMPRESA
  async getSaleByBusiness(req, res) {
    try {
      const id = req.params.empresa;
      const sale = await Sales.findAll({
        where: { EmpresaId: id },
        include:[{model:db.business}]
      });
      if (sale.length >= 1) return res.status(200).send(sale);
      return res.status(404).send("Sales with id empresa "+id+"not found");
    } catch (error) {
      res.status(500).send(error);
    }
  },
  //METODO PARA OBTENER TODOS LAS VENTAS
  async getAllSales(req, res) {
    try {
      const sales = await Sales.findAll({
      });
      if (sales.length >= 1) return res.status(200).send(sales);
      return res.status(404).send("Sales not found");
    } catch (error) {
      res.status(500).send(error);
    }
  },
  //METODO PARA ACTUALIZAR UNA VENTA
  async upadateSale(req, res) {
    try {
      const id = req.params.id;
      const sale = await Sales.update(req.body, {
        where: { id: id },
      });
      if (sale == 1)
        return res.status(200).send("Sale updated succesfully");
      return res
        .status(404)
        .send(
          `Cannot updated Sale with id=${id} .Maybe Sale was not found or req.body is empty!`
        );
    } catch (error) {
      res.status(500).send(error);
    }
  },
//METODO PARA ELIMINAR  UNA VENTA
  deleteSale(req, res) {
    try {
      const id = req.params.id;
      Sales.destroy({
        where: { id: id },
      }).then((num) => {
        if (num == 1)
          return res.status(200).send("Sale was deleted succesfully");
        return res
          .status(404)
          .send(
            `Cannot deleted Sale with id=${id}. Maybe Sale was not found !`
          );
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },


};

module.exports = salesController;
