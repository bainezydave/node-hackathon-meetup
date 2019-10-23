const mongoose = require('mongoose');
const Event = mongoose.model('events');
const User = mongoose.model('users');
const Group = mongoose.model('groups');

const index = (req, res) =>
{
    Event.find()
        .populate('user')
        .sort({ date: 'desc' })
        .then(events => res.render('events/index', { events }));
};


const viewCreate = (req, res) =>
{
    Group.find({
        user: req.params.userId
    })
    .then(groups => res.render('events/new', { groups }));

}

const create = (req, res) =>
{
    console.log(req.user._id);

    const newEvent = {
        name: req.body.name,
        details: req.body.details,
        address: req.body.address,
        city: req.body.city,
        postCode: req.body.postCode,
        state: req.body.state,
        time: req.body.time,
        photo: req.body.photo,
        user: req.user._id,
        accepted: req.body.accepted,
        declined: req.body.declined
    };

    try
    {
        new Event(newEvent)
            .save()
            .then(event => res.redirect(`/events/show/${event._id}`));

    } catch(error)
    {
        res.json(error);
    }

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



const attending = (req, res) =>
{
    User.findOne({ _id: req.params.userId })
        .then(user =>
        {
            Event.findOne({ _id: req.params.eventId })
                .then(event =>
                {
                    let x = { firstName: user.firstName, lastName: user.lastName, email: user.email };

                    event.accepted.push(x);

                    console.log(event.accepted);

                    event.save().then(event => res.redirect(`/events/show/${event.id}`));

                });
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
    removeComment,
    attending
};
