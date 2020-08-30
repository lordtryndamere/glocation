const db = require("../models");
const Product = db.product;

const {
    products,
    
  } = require("../../services/validation")

const productController = {
  async  createproduct(req,res){
        const item = req.body;
        //Validar informacion enviada por el usuario
        const { error } = products(item);
        if (error) return res.status(400).send(error.details[0].message);
        const product ={
            nombre:item.nombre,
            descripcion:item.descripcion,
            precio:item.precio,
            CategoriaId:item.categoria

        }
        try {
            const saveproduct = await Product.create(product);
            res.send(saveproduct);
            
        } catch (error) {
            res.status(500).send(error)   
        }

    },
    async getproductsByCategorie(req, res) {
        try {
          const id = req.params.categoria;
          const product = await Product.findAll({
            where: { CategoriaId: id },
            include:[{model:db.category}]
          });
          if (product.length >= 1) return res.status(200).send(product);
          return res.status(404).send("products with id category"+id+"not found");
        } catch (error) {
          res.status(500).send(error);
        }
      },
      async getproduct(req, res) {
        try {
          const id = req.params.id;
          const product = await Product.findAll({
            where: { id: id },
            include:[{model:db.category}]
          });
          if (product.length >= 1) return res.status(200).send(product);
          return res.status(404).send("product with id"+id+"not found");
        } catch (error) {
          res.status(500).send(error);
        }
      },
      async getAllproduct(req, res) {
        try {
          const product = await Product.findAll({
            include:[{model:db.category}]
          });
          if (product.length >= 1) return res.status(200).send(product);
          return res.status(404).send("products not found");
        } catch (error) {
          res.status(500).send(error);
        }
      },
      async upadateproduct(req, res) {
        try {
          const id = req.params.id;
          const product = await Product.update(req.body, {
            where: { id: id },
          });
          if (product == 1)
            return res.status(200).send("product updated succesfully");
          return res
            .status(404)
            .send(
              `Cannot updated product with id=${id} .Maybe product was not found or req.body is empty!`
            );
        } catch (error) {
          res.status(500).send(error);
        }
      },
    
      deleteproduct(req, res) {
        try {
          const id = req.params.id;
          Product.destroy({
            where: { id: id },
          }).then((num) => {
            if (num == 1)
              return res.status(200).send("product was deleted succesfully");
            return res
              .status(404)
              .send(
                `Cannot deleted product with id=${id}. Maybe product was not found !`
              );
          });
        } catch (error) {
          res.status(500).send(error);
        }
      },
}


module.exports = productController;