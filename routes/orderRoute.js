const { check, validationResult } = require("express-validator/check");
const db = require("../models");


module.exports = app => {

app.get("/orders", async (req, res) => {
    await db.Order.findAll({
        include: [db.order_details,db.Customer]
    }).then((data, err) => {
        if (err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving data."
            });
        else res.status(200).json(data);
    }).catch((error) => res.status(400).send(error.message));
});

app.post("/orders", async (req, res) => {
    const order = {
        user_id: req.body.user_id,
        material_id: req.body.material_id,
        order_detail:{
            weight: req.body.weight,
            price: req.body.price,
            count: req.body.count
        },
        Customer:{
            name: req.body.name,
            phone: req.body.phone,
        },
      };
      if (!req.is("application/json"))
        res.status(500).send({ message: "Expects 'application/json'" });
    await db.Order.create(order,{include: [db.order_details,db.Customer]}).then((data, err) => {
        if (err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving data."
            });
        else res.status(201).json(data);
    }).catch((error) => res.status(400).send(error.message));
});

}