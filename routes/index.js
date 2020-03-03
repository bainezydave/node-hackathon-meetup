const express  = require('express');
const router   = express.Router();
const indexController = require("../controllers/index_controller");

router.get('/',      indexController.events);

module.exports = router;



