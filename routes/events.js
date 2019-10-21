const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = mongoose.model('events');
const User = mongoose.model('users');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

router.get('/', (req, res) =>
{
    Event.find({ status: 'public' })
        .populate('user')
        .sort({ date: 'desc' })
        .then(events =>
        {
            res.render('events/index', {
                events: events
            });
        });

});

router.get('/show/:id', (req, res) =>
{
    Event.findOne({
        _id: req.params.id
    })
        .populate('user')
        .populate('comments.commentUser')
        .then(event =>
        {
            if (event.status == 'public')
            {
                res.render('events/show', {
                    event: event
                });
            } else
            {
                if (req.user)
                {
                    if (req.user.id === event.user.id)
                    {
                        res.render('events/show', {
                            event: event
                        });
                    } else
                    {
                        res.redirect('/events');
                    }
                } else
                {
                    res.redirect('/events');
                }
            }
        });
});


router.get('/user/:userId', (req, res) =>
{
    Event.find({
        user: req.params.userId,
        status: 'public'
    })
        .populate('user')
        .then(events =>
        {
            res.render('events/index', {
                events: events
            });
        });
});

router.get('/new', ensureAuthenticated, (req, res) => res.render('events/new'));


router.get('/edit/:id', ensureAuthenticated, (req, res) =>
{
    Event.findOne({
        _id: req.params.id
    })
        .then(event =>
        {
            if (event.user != req.user.id)
            {
                res.redirect('/events');
            } else
            {
                res.render('events/edit', {
                    event: event
                });
            }
        });
});

router.post('/', (req, res) =>
{
    let allowComments;

    if (req.body.allowComments)
    {
        allowComments = true;
    } else
    {
        allowComments = false;
    }

    const newEvent = {
        name: req.body.name,
        details: req.body.details,
        address: req.body.address,
        city: req.body.city,
        postCode: req.body.postCode,
        state: req.body.state,
        time: req.body.time,
        photo: req.body.photo,
        accepted: req.body.accepted,
        declined: req.body.declined,
        allowComments: allowComments,
        user: req.user.id
    };

    new Event(newEvent)
        .save()
        .then(event =>
        {
            res.redirect(`/events/show/${event.id}`);
        });
});

router.put('/:id', (req, res) =>
{
    Event.findOne({
        _id: req.params.id
    })
        .then(event =>
        {
            let allowComments;

            if (req.body.allowComments)
            {
                allowComments = true;
            } else
            {
                allowComments = false;
            }

            event.name = req.body.name;
            event.details = req.body.details;
            event.address = req.body.address;
            event.city = req.body.city;
            event.postCode = req.body.postCode;
            event.state = req.body.state;
            event.time = req.body.time;
            event.photo = req.body.photo;
            event.accepted = req.body.accepted;
            event.declined = req.body.declined;
            event.allowComments = allowComments;

            event.save()
                .then(event =>
                {
                    res.redirect('/dashboard');
                });
        });
});

router.delete('/:id', (req, res) =>
{
    Event.remove({ _id: req.params.id })
        .then(() =>
        {
            res.redirect('/dashboard');
        });
});

router.post('/comment/:id', (req, res) =>
{
    Event.findOne({
        _id: req.params.id
    })
        .then(event =>
        {
            console.log(event.user);
            console.log(req.user.id);
            if (event.user == req.user.id)
            {
                res.redirect(`/events/show/${event.id}`);
            } else
            {
                const newComment = {
                    commentBody: req.body.commentBody,
                    commentUser: req.user.id
                };

                event.comments.unshift(newComment);
                event.save()
                    .then(event =>
                    {
                        res.redirect(`/events/show/${event.id}`);
                    });
            }
        });
});

router.delete('/:event_id/comments/:id', (req, res) =>
{
    Event.update({
        $pull: { comments: { _id: req.params.id } }
    })
    .then(() =>
    {
        console.log(S);
    });
});
module.exports = router;
