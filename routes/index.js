const express  = require('express');
const router   = express.Router();
const indexController = require("../controllers/index_controller");
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');


router.get('/',      indexController.events);
router.get('/about', indexController.about);


// router.get('/dashboard', ensureAuthenticated, (req, res) =>
// {
//     Event.find({ user: req.user.id })
//         .then(events =>
//         {
//             res.render('index/dashboard', {
//                 events: events
//             });
//         });
// });


module.exports = router;



