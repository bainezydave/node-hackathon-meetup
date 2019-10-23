const express = require('express');
const router = express.Router();
const EventController = require("../controllers/event_controller");
const { ensureUser, ensureGuest } = require('../helpers/auth');

router.get('/',                         EventController.index);
router.get('/show',                     EventController.show);
router.get('/show/:id',                 EventController.showOne);
router.get('/user/:userId', ensureUser, EventController.user);
router.get('/new',          ensureUser, EventController.viewCreate);
router.get('/edit/:id',     ensureUser, EventController.viewEdit);
router.post('/new',         ensureUser, EventController.create);
router.put('/:id',          ensureUser, EventController.edit);
router.delete('/:id',       ensureUser, EventController.remove);

router.get('/attending/:eventId/', ensureUser, EventController.attending);

// Comments
router.post('/comment/:id',             EventController.createComment);
router.delete('/:event_id/comments/:id',EventController.removeComment);

module.exports = router;
