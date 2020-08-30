const db = require("../models");
const Sales = db.sales;
const Pointofsale = db.pointofsales;
const User = db.user;
const {getKilometres} = require('../../services/getKilometres');
const {
    salesval
  } = require("../../services/validation");

const salesController = {
  async createSale(req, res) {
    const item = req.body;
    //Validar informacion enviada por el usuario
    const { error } =     salesval(item);
    if (error) return res.status(400).send(error.details[0].message);

    //Obtener puntos de venta
    const puntoventas = await Pointofsale.findAll({
        include:[{model:db.inventary}]
    })
    if(puntoventas.length<=0) return res.status(404).send("points of sales not found")

    //Obtener coordenadas usuario
     const user = await User.findByPk(item.usuario)
     if(!user)  return res.status(404).send("user with id: "+item.usuario+"not found")

    const coordenadas = JSON.parse(user.coordenadas);
    const lat = coordenadas.lat
    const lng  = coordenadas.lng

    const puntosvalidos = []
    for (let index = 0; index < puntoventas.length; index++) {
        const element = puntoventas[index];
        let lat2 = Number(puntoventas[index].coordenadas.lat)
        let lng2 = Number(puntoventas[index].coordenadas.lng)
      if(parseInt(getKilometres(lat,lng,lat2,lng2)) <=5){
        puntosvalidos.push(element)

     

      }
        
    }
    res.send(puntosvalidos)



    const Buy={
        cantidad:item.cantidad,
        fecha_de_compra:item.fecha_de_compra,
        ProductoId:item.producto,
        UserId:item.usuario,
        PuntoVentumId:item.puntodeventa
    }
  },
};

module.exports = salesController;
