const mongoose = require('mongoose');
const Event = mongoose.model('events');

const index = (req, res) =>
{
    Event.find()
        .populate('user')
        .sort({ date: 'desc' })
        .then(events => res.render('events/index', { events }));
};


const viewCreate = (req, res) => res.render('events/new');


const create = (req, res) =>
{
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
        user: req.user._id
    };

    new Event(newEvent)
        .save()
        .then(event => res.redirect(`/events/show/${event._id}`));
};


const show = (req, res) =>
{
    Event.find()
        .populate('user')
        .populate('comments.commentUser')
        .then(event => res.render('events/show', { event }));
};

const showOne = (req, res) =>
{
    Event.findOne({ _id: req.params.id })
        .populate('user')
        .populate('comments.commentUser')
        .then(event => res.render('events/show', { event }));
};


const viewEdit = (req, res) =>
{
    Event.findOne({ _id: req.params.id })
        .then(event =>
        {
            if (event.user != req.user.id)
            {
                res.redirect('/events');
            } else
            {
                res.render('events/edit', {event});
            }
        });
};


const edit = (req, res) =>
{
    Event.findOne({ _id: req.params.id })
        .then(event =>
        {
            let allowComments = false;

            if (req.body.allowComments)  allowComments = true;

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
                .then(event => res.redirect('/'));
        });
};


const remove = (req, res) =>
{
    Event.remove({ _id: req.params.id })
        .then(() => res.redirect('/'));
};


const user = (req, res) =>
{
    Event.find({ user: req.params.userId })
        .populate('user')
        .then(events => res.render('events/index', { events }));
};


const createComment = (req, res) =>
{
    Event.findOne({ _id: req.params.id })
    .then(event =>
    {
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
                .then(event => res.redirect(`/events/show/${event.id}`));
        }
    });
};


const removeComment = (req, res) =>
{
    Event.update({ $pull: { comments: { _id: req.params.id } } })
        .then(() => console.log(S));
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
