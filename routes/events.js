const express = require('express');
const router = express.Router();
const EventController = require("../controllers/event_controller");
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');


router.get('/', EventController.index);

router.get('/show/:id', EventController.show);

router.get('/show/:id', EventController.show);

router.get('/user/:userId', EventController.user);

router.get('/new', ensureAuthenticated, EventController.viewCreate);

router.get('/edit/:id', ensureAuthenticated, EventController.viewEdit);

router.post('/', EventController.create);

router.put('/:id', EventController.edit);

router.delete('/:id', EventController.remove);

router.post('/comment/:id', EventController.createComment);

router.delete('/:event_id/comments/:id', EventController.removeComment);


module.exports = router;
