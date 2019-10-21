const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const Event    = mongoose.model('events');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');


router.get('/', ensureGuest, (req, res) => res.render('index/home'));
router.get('/about', (req, res) => res.render('index/about'));

router.get('/dashboard', ensureAuthenticated, (req, res) =>
{
    Event.find({ user: req.user.id })
        .then(events =>
        {
            res.render('index/dashboard', {
                events: events
            });
        });
});


module.exports = router;
