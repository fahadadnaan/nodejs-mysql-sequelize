const { check, validationResult } = require("express-validator/check");
const db = require("../models");

module.exports = app => {
  //=============================== GET ALL DATA ================================
  app.get("/drivers", async (req, res, next) => {
      await db.Driver.findAll().then((data, err) => {
        if (err)
          res
            .status(500)
            .send({
              message:
                err.message || "Some error occurred while retrieving drivers."
            });
        else res.status(200).json(data);
        next();
      }).catch((error) => res.status(400).send(error));
     
  });
  app.get("/drivers/material", async (req, res) => {
      await db.Driver.findAll({
        include: [{
          model: db.Material,
          as: 'materials'
        }]
      }).then((data, err) => {
        if (err)
          res
            .status(500)
            .send({
              message:
                err.message || "Some error occurred while retrieving drivers."
            });
        else res.status(200).json(data);
      }).catch((error) => res.status(400).send(error.message));
  });

  //=============================== GET BY ID ==================================

  app.get("/drivers/:id", async (req, res, next) => {
      await db.Driver.findByPk(req.params.id).then((result, err) => {
        if (err)
          res
            .status(500)
            .send({
              message:
                err.message || "Some error occurred while retrieving driver."
            });
        if (!result)
          res.status(404).json("Driver with id " + req.params.id + " Not Found");
        else res.status(200).json(result);
        next();
      }).catch((error) => res.status(400).send(error));
  });

  // ============================= CREATE =========================
  app.post(
    "/drivers",
    [
      check("name")
        .not()
        .isEmpty()
        .withMessage("Name feild is required"),
      check("farmer_name")
        .not()
        .isEmpty()
        .withMessage("Farmer Name feild is required"),
      check("car_number")
        .not()
        .isEmpty()
        .withMessage("Car Number feild is required"),
      check("phone_number")
        .not()
        .isEmpty()
        .withMessage("Phone feild is required")
    ],
    async (req, res, next) => {
      const driver = {
        name: req.body.name,
        farmer_name: req.body.farmer_name,
        car_number: req.body.car_number,
        phone_number: req.body.phone_number
      };

      // Check for JSON
      if (!req.is("application/json"))
        res.status(500).send({ message: "Expects 'application/json'" });

        const errors = validationResult(req);
        if (!errors.isEmpty()) res.status(422).json({ errors: errors.array() });
        else
          await db.Driver.create(driver).then(result =>{
            res.status(201).json(result);
            next();
          }).catch((error) => res.status(400).send(error));
       
    }
  );

  // ========================== UPDATE ================================
  app.put(
    "/drivers/:id",
    [
      check("name")
        .not()
        .isEmpty()
        .withMessage("Name feild is required"),
      check("farmer_name")
        .not()
        .isEmpty()
        .withMessage("Farmer Name feild is required"),
      check("car_number")
        .not()
        .isEmpty()
        .withMessage("Car Number feild is required"),
      check("phone_number")
        .not()
        .isEmpty()
        .withMessage("Phone feild is required")
    ],
    async (req, res, next) => {
      const driver = {
        name: req.body.name,
        farmer_name: req.body.farmer_name,
        car_number: req.body.car_number,
        phone_number: req.body.phone_number
      };

      // Check for JSON
      if (!req.is("application/json"))
        res.status(500).send({ message: "Expects 'application/json'" });
        const errors = validationResult(req);
        if (!errors.isEmpty()) res.status(422).json({ errors: errors.array() });
        else
          await db.Driver.update(driver, {
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
                .send({ message: "Driver with this id dont exist " });
            else
              res
                .status(200)
                .json("Update with id " + req.params.id + " Done!");
                next();
          }).catch((error) => res.status(400).send(error));
    }
  );

  //=============================== DELETE BY ID ==================================
  app.delete("/drivers/:id", async (req, res, next) => {
      await db.Driver.destroy({ where: { id: req.params.id } }).then(
        (result, err) => {
          if (err)
            res
              .status(500)
              .send({
                message:
                  err.message || "Some error occurred while retrieving data."
              });
          if (!result)
            res.json("Driver with id " + req.params.id + " Not Found", 404);
          else
            res.status(204).json("Delete with id " + req.params.id + " Done!");
            next();
        }).catch((error) => res.status(400).send(error));
  });
};
