const express = require('express');
const router = express.Router();
const GroupController = require("../controllers/group_controller");
const { ensureUser, ensureGuest } = require('../helpers/auth');


router.get('/',                         GroupController.index);
router.get('/show/:id',                 GroupController.show);
router.get('/show/:id',                 GroupController.show);
router.get('/user/:userId', ensureUser, GroupController.user);

router.get('/new',          ensureUser, GroupController.viewCreate);
router.get('/edit/:id',     ensureUser, GroupController.viewEdit);

router.post('/new',         ensureUser, GroupController.create);
router.put('/:id',          ensureUser, GroupController.edit);
router.delete('/:id',       ensureUser, GroupController.remove);

module.exports = router;
