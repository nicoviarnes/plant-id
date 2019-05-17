const express = require("express");
const router = express.Router();
const config = require("config");
const Plant = require("../../models/Plants");

//@Route	get api/plant
//@Desc		User Garden Data
//@Access	Public
router.get("/", (req, res) => {
  //const { name, email, password } = req.body;
  Plant.find(req.body).then(plant => res.json(plant));
});

module.exports = router;
