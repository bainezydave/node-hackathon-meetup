const mongoose = require('mongoose');
const Event = mongoose.model('events');


const index = (req, res) =>
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
};


const viewCreate = (req, res) => res.render('events/new');


const create = (req, res) =>
{
    let allowComments = false;

    if (req.body.allowComments) allowComments = true;

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
};

const show = (req, res) =>
{
    Event.find()
        .populate('user')
        .populate('comments.commentUser')
        .then(event =>
        {
            res.render('events/show', {
                event: event
            });
        });
};

const showOne = (req, res) =>
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
};


const viewEdit = (req, res) =>
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
};


const edit = (req, res) =>
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
};


const remove = (req, res) =>
{
    Event.remove({ _id: req.params.id })
    .then(() =>
    {
        res.redirect('/dashboard');
    });
};


const user = (req, res) =>
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
};


const createComment = (req, res) =>
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
};


const removeComment = (req, res) =>
{
    Event.update({
        $pull: { comments: { _id: req.params.id } }
    })
    .then(() =>
    {
        console.log(S);
    });
};


module.exports = {
    index,
    viewCreate,
    create,
    show,
    showOne,
    viewEdit,
    edit,
    remove,
    user,
    createComment,
    removeComment
};