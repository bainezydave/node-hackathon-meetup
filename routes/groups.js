const express = require('express');
const router = express.Router();
const GroupController = require("../controllers/group_controller");
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');


router.get('/', GroupController.index);

router.get('/show/:id', GroupController.show);

router.get('/show/:id', GroupController.show);

router.get('/user/:userId', GroupController.user);

router.get('/new', ensureAuthenticated, GroupController.viewCreate);

router.get('/edit/:id', ensureAuthenticated, GroupController.viewEdit);

router.post('/', GroupController.create);

router.put('/:id', GroupController.edit);

router.delete('/:id', GroupController.remove);

module.exports = router;
