const db = require("../models");
const Pointofsales = db.pointofsales;
const User = db.user;
const { getKilometres } = require("../../services/getKilometres");
const { Pointofsale } = require("../../services/validation");

const { getLocation } = require("../../services/getLocation");

const pointofsalesController = {
  //METODO PARA CREAR UN PUNTO DE VENTA CON GEOLOCALIZACION

  async createpointofsales(req, res) {
    const item = req.body;
    //Location
    const location = await getLocation(item.direccion, item.ciudad);
    //Validar informacion enviada por el usuario
    const { error } = Pointofsale(item);
    if (error) return res.status(400).send(error.details[0].message);

    //Validar si ya existe el mismo  Nombre
    const nameExits = await Pointofsales.findAll({
      where: {
        nombre: item.nombre,
      },
    });

    if (nameExits.length >= 1)
      return res.status(403).send(" name already exits");

    const pointofsale = {
      nombre: item.nombre,
      direccion: item.direccion,
      ciudad: item.ciudad,
      coordenadas: {
        lat: location.lat ? location.lat : "Direccion ingresada incorrecta",
        lng: location.lng ? location.lng : "Direccion ingresada incorrecta",
      },
      EmpresaId: item.empresa,
    };
    try {
      const savepointofsales = await Pointofsales.create(pointofsale);
      res.send(savepointofsales);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  //METODO PARA OBTENER LOS PUNTOS DE VENTA
  async getpointofsale(req, res) {
    try {
      const id = req.params.id;
      const pointofsales = await Pointofsales.findAll({
        where: { id: id },
        include: [{ model: db.business }],
      });
      if (pointofsales.length >= 1) return res.status(200).send(pointofsales);
      return res.status(404).send("pointofsale with id " + id + "not found");
    } catch (error) {
      res.status(500).send(error);
    }
  },
  //METODO PAR AOBTENER TODOS LOS PUNTOS DE VENTA
  async getAllpointofsales(req, res) {
    try {
      const pointofsales = await Pointofsales.findAll({
        include: [{ model: db.business }],
      });
      if (pointofsales.length >= 1) return res.status(200).send(pointofsales);
      return res.status(404).send("pointofsales not found");
    } catch (error) {
      res.status(500).send(error);
    }
  },
  //METODO PARA ACTUALIZAR UN PUNTO DE VENTA
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
//METODO PARA ELIMINAR UN PUNTO DE VENTA
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
//METODO PARA OBTENER PUNTOS DE VENTA POR CIUDAD
  async getAllpointofsalesperCity(req, res) {
    const city = req.params.city;
    try {
      const pointofsales = await Pointofsales.findAll({
        where: {
          ciudad: city,
        },
        include: [{ model: db.business }],
      });
      if (pointofsales.length >= 1) return res.status(200).send(pointofsales);
      return res.status(404).send("pointofsales in this city not found");
    } catch (error) {
      res.status(500).send(error);
    }
  },
  //METODO PARA OBTENER PUNTOS DE VENTA A NO MAS DE 1KM DE LA UBICACION DEL USUARIO QUE DESEA COMPRAR
  async getpointsofsalesperdistance(req, res) {
    const user = req.user.id;
    try {
      const pointofsales = await Pointofsales.findAll({});
      if (pointofsales.length <= 0)
        return res.status(404).send("Points of sales not found");
      const userfind = await User.findByPk(user);
      let coordenadas = JSON.parse(userfind.coordenadas);

      let newspuntos = [];
      let puntosaunkilometro = [];
      for (let index = 0; index < pointofsales.length; index++) {
        const element = pointofsales[index];
        let coordenadasparseadas = JSON.parse(element.coordenadas);
        newspuntos.push({
          nombre: element.nombre,
          direccion: element.direccion,
          ciudad: element.ciudad,
          coordenadas: coordenadasparseadas,
          EmpresaId: element.EmpresaId,
        });
        const info = getKilometres(
          coordenadas.lat,
          coordenadas.lng,
          newspuntos[index].coordenadas.lat,
          newspuntos[index].coordenadas.lng
        );

        if (info <= 1) {
          puntosaunkilometro.push(newspuntos[index]);
        }
      }

      res.status(200).send({
        puntos_venta_a_un_kilometro_o_menos_del_usuario_logeado :puntosaunkilometro
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = pointofsalesController;
