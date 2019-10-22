const express = require('express');
const router = express.Router();
const EventController = require("../controllers/event_controller");
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

router.get('/',                                  EventController.index);
router.get('/show',                              EventController.show);
router.get('/show/:id',                          EventController.showOne);
router.get('/user/:userId', ensureAuthenticated, EventController.user);
router.get('/new',          ensureAuthenticated, EventController.viewCreate);
router.get('/edit/:id',     ensureAuthenticated, EventController.viewEdit);
router.post('/new',         ensureAuthenticated, EventController.create);
router.put('/:id',          ensureAuthenticated, EventController.edit);
router.delete('/:id',       ensureAuthenticated, EventController.remove);
// Comments
router.post('/comment/:id',                  EventController.createComment);
router.delete('/:event_id/comments/:id',     EventController.removeComment);

module.exports = router;
