const { check, validationResult } = require("express-validator/check");
const db = require("../models");

module.exports = app => {
  //=============================== GET ALL DATA ================================
  app.get("/materials", async (req, res, next) => {
      await db.Material.findAll().then((data, err) => {
        if (err)
          res
            .status(500)
            .send({
              message:
                err.message || "Some error occurred while retrieving data."
            });
        else res.status(200).json(data);
        next();
      }).catch((error) => res.status(400).json(error));
  });
  app.get("/materials/driver", async (req, res) => {
      await db.Material.findAll({
        include: [db.Driver]
      }).then((data, err) => {
        if (err)
          res
            .status(500)
            .send({
              message:
                err.message || "Some error occurred while retrieving data."
            });
        else res.status(200).json(data);
      }).catch((error) => res.status(400).send(error.message));
  });

  //=============================== GET BY ID ==================================

  app.get("/fridges/:id", async (req, res) => {
      await db.Material.findByPk(req.params.id).then((result, err) => {
        if (err)
          res
            .status(500)
            .send({
              message:
                err.message || "Some error occurred while retrieving data."
            });
        if (!result)
          res.json("Fridge Content with id " + req.params.id + " Not Found", 404);
        else res.status(200).json(result);
      }).catch((error) => res.status(400).send(error));
  });

  // ============================= CREATE =========================
  app.post(
    "/fridges",
    [
      check("material_name")
        .not()
        .isEmpty()
        .withMessage("Material Name feild is required"),
      check("material_type")
        .not()
        .isEmpty()
        .withMessage("Material Name feild is required"),
      check("farmer_ratio")
        .not()
        .isEmpty()
        .withMessage("Farmer Ratio feild is required"),
      check("factor_ratio")
        .not()
        .isEmpty()
        .withMessage("Factor Ratio is required"),
      check("unit_price")
        .not()
        .isEmpty()
        .withMessage("Unit Price is required"),
      check("kg_ratio")
        .not()
        .isEmpty()
        .withMessage("Kg Ratio is required"),
      check("DriverId")
        .not()
        .isEmpty()
        .withMessage("Driver ID is required"),
    ],
    async (req, res, next) => {
      const FridgeContents = {
        material_name: req.body.material_name,
        material_type: req.body.material_type,
        farmer_ratio: req.body.farmer_ratio,
        factor_ratio: req.body.factor_ratio,
        unit_price: req.body.unit_price,
        kg_ratio: req.body.kg_ratio,
        DriverId: req.body.DriverId,
      };

      // Check for JSON
      if (!req.is("application/json"))
        res.status(500).send({ message: "Expects 'application/json'" });
        const errors = validationResult(req);
        if (!errors.isEmpty()) res.status(422).json({ errors: errors.array() });
        else
          await db.Material.create(FridgeContents).then(result =>{
            res.status(201).json(result);
            next();
          }).catch((error) => res.status(400).send(error));
    }
  );

  // ========================== UPDATE ================================
  app.put(
    "/fridges/:id",
    [
      check("material_name")
        .not()
        .isEmpty()
        .withMessage("Material Name feild is required"),
      check("material_type")
        .not()
        .isEmpty()
        .withMessage("Material Name feild is required"),
      check("farmer_ratio")
        .not()
        .isEmpty()
        .withMessage("Farmer Ratio feild is required"),
      check("factor_ratio")
        .not()
        .isEmpty()
        .withMessage("Factor Ratio is required"),
      check("unit_price")
        .not()
        .isEmpty()
        .withMessage("Unit Price is required"),
      check("kg_ratio")
        .not()
        .isEmpty()
        .withMessage("Kg Ratio is required"),
      check("DriverId")
        .not()
        .isEmpty()
        .withMessage("Driver ID is required"),
    ],
    async (req, res, next) => {
      const FridgeContents = {
        material_name: req.body.material_name,
        material_type: req.body.material_type,
        farmer_ratio: req.body.farmer_ratio,
        factor_ratio: req.body.factor_ratio,
        unit_price: req.body.unit_price,
        kg_ratio: req.body.kg_ratio,
        DriverId: req.body.DriverId,
      };

      // Check for JSON
      if (!req.is("application/json"))
        res.status(500).send({ message: "Expects 'application/json'" });
        const errors = validationResult(req);
        if (!errors.isEmpty()) res.status(422).json({ errors: errors.array() });
        else
          await db.Material.update(FridgeContents, {
            where: {
              id: req.params.id
            }
          }).then((result, err) => {            
            if (err)
              res
                .status(500)
                .send({
                  message:
                    err.message || "Some error occurred while retrieving data."
                });
            if (result[0] != req.params.id)
              res
                .status(500)
                .send({ message: "Fridge Content with this id dont exist " });
            else
              res
                .status(200)
                .json("Update with id " + req.params.id + " Done!");
                next();
          }).catch((error) => res.status(400).send(error));
    }
  );

  //=============================== DELETE BY ID ==================================
  app.delete("/fridges/:id", async (req, res, next) => {
      await db.Material.destroy({ where: { id: req.params.id } }).then(
        (result, err) => {
          if (err)
            res
              .status(500)
              .send({
                message:
                  err.message || "Some error occurred while retrieving data."
              });
          if (!result)
            res.json("Fridge Content with id " + req.params.id + " Not Found", 404);
          else
            res.status(204).json("Delete with id " + req.params.id + " Done!");
            next();
        }).catch((error) => res.status(400).send(error));
  });

};
