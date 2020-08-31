const db = require("../models");
const Category = db.category;
const {
    Categoryval
  } = require("../../services/validation")

const categoryController = {
  //METODO PARA CREAR UNA CATEGORIA
  async  createcategory(req,res){
        const item = req.body;
        //Validar informacion enviada por el usuario
        const { error } = Categoryval(item);
        if (error) return res.status(400).send(error.details[0].message);

        //Validar si ya existe el mismo nombre
        const  name =  await Category.findAll({
            where:{
                nombre:item.nombre
            }
        });
        if(name.length >=1) return res.status(403).send("this category already exists")
        const category ={
            nombre:item.nombre,
            descripcion:item.descripcion,
         

        }
        try {
            const savecategory = await Category.create(category);
            res.send(savecategory);
            
        } catch (error) {
            res.status(500).send(error)   
        }

    },
    //METODO PARA OBTENER UNA CATEGORIA
    async getcategory(req, res) {
        try {
          const id = req.params.id;
          const category = await Category.findAll({
            where: { id: id },
          });
          if (category.length >= 1) return res.status(200).send(category);
          return res.status(404).send("category with id"+id+"not found");
        } catch (error) {
          res.status(500).send(error);
        }
      },
      //METODO PARA OBTENER TODAS LAS CATEGORIAS
      async getAllcategories(req, res) {
        try {
          const category = await Category.findAll({
          });
          if (category.length >= 1) return res.status(200).send(category);
          return res.status(404).send("categories not found");
        } catch (error) {
          res.status(500).send(error);
        }
      },
      //METODO PARA ACTUALIZAR UNA CATEGORIA
      async upadatecategory(req, res) {
        try {
          const id = req.params.id;
          const category = await Category.update(req.body, {
            where: { id: id },
          });
          if (category == 1)
            return res.status(200).send("category updated succesfully");
          return res
            .status(404)
            .send(
              `Cannot updated category with id=${id} .Maybe category was not found or req.body is empty!`
            );
        } catch (error) {
          res.status(500).send(error);
        }
      },
    //METODO PARA ELIMINAR UNA CATEGORIA
      deletecategory(req, res) {
        try {
          const id = req.params.id;
          Category.destroy({
            where: { id: id },
          }).then((num) => {
            if (num == 1)
              return res.status(200).send("category was deleted succesfully");
            return res
              .status(404)
              .send(
                `Cannot deleted category with id=${id}. Maybe category was not found !`
              );
          });
        } catch (error) {
          res.status(500).send(error);
        }
      },
}


module.exports = categoryController;