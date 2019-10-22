const express  = require('express');
const router   = express.Router();
const indexController = require("../controllers/index_controller");

router.get('/',      indexController.events);
router.get('/about', indexController.about);


module.exports = router;



