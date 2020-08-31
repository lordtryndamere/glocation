const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registervalidation,
  loginvalidation,
} = require("../../services/validation");

const { getLocation } = require("../../services/getLocation");
const userController = {
  //METODO PARA REGISTAR UN USUARIO
  async register(req, res) {
    const item = req.body;

    //Location
    const location = await getLocation(item.direccion, item.ciudad);

    //Validar informacion enviada por el usuario
    const { error } = registervalidation(item);
    if (error) return res.status(400).send(error.details[0].message);
    //Validar si el usuario ya existe en la DB
    const emailExists = await User.findAll({
      where: {
        email: item.email,
      },
    });
    console.log(emailExists);
    if (emailExists.length >= 1)
      return res.status(403).send("Email already exists");
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hassPassword = await bcrypt.hash(item.contraseña, salt);

    const user = {
      name: item.name,
      email: item.email,
      contraseña: hassPassword,
      celular: item.celular,
      direccion: item.direccion,
      ciudad: item.ciudad,
      coordenadas: {
        lat: location.lat ? location.lat : "",
        lng: location.lng ? location.lng : "",
      },
      role: item.role,
    };

    try {
      const savedUser = await User.create(user);
      res.send(savedUser);
    } catch (err) {
      res.status(500).send(err);
    }
  },
//METODO PARA LOGEAR UN USUARIO
  async login(req, res) {
    const item = req.body;
    //Validar informacion enviada por el usuario
    const { error } = loginvalidation(item);
    if (error) return res.status(400).send(error.details[0].message);
    //Se validad si el email existe
    const user = await User.findAll({
      where: {
        email: item.email,
      },
    });

    if (user.length <= 0) return res.status(400).send("Email is not found");

    //Se validad si la contraseña es correcta
    const data = user[0].dataValues;
    const validPass = await bcrypt.compare(item.contraseña, data.contraseña);

    if (!validPass) return res.status(400).send("Invalid password");

    //Creando y asignando token
    const token = jwt.sign(
      { id: data.id, email: data.email, role: data.role },
      process.env.TOKEN_SECRET
    );

    res.header("auth-token", token).send({
      user: user,
      role: data.role
    });
  },
//METODO PARA OBTENER UN USUARIO
  async getUser(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findAll({
        where: { id: id },
        include: [{ model: db.business }],
      });
      if (user.length >= 1) return res.status(200).send(user);
      return res.status(404).send("User not found");
    } catch (error) {
      res.status(500).send(error);
    }
  },
  //METODO PARA OBTENER TODOS LOS USUARIOS
  async getUsers(req, res) {
    try {
      const users = await User.findAll({
        include: [{ model: db.business }],
      });
      if (users.length >= 1) return res.status(200).send(users);
      return res.status(404).send("Users not found");
    } catch (error) {
      res.status(500).send(error);
    }
  },
  //METODO PARA ACTUALIZAR UN USUARIO
  async upadateUser(req, res) {
    try {
      const id = req.params.id;
      const userUpdated = await User.update(req.body, {
        where: { id: id },
      });
      if (userUpdated == 1)
        return res.status(200).send("User updated succesfully");
      return res
        .status(404)
        .send(
          `Cannot updated User with id=${id} .Maybe User was not found or req.body is empty!`
        );
    } catch (error) {
      res.status(500).send(error);
    }
  },
//METODO PARA ELIMINAR UN USUARIO
  deleteUser(req, res) {
    try {
      const id = req.params.id;
      User.destroy({
        where: { id: id },
      }).then((num) => {
        if (num == 1)
          return res.status(200).send("User was deleted succesfully");
        return res
          .status(404)
          .send(
            `Cannot deleted User with id=${id}. Maybe User was not found !`
          );
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = userController;
