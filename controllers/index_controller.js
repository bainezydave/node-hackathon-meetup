const mongoose = require('mongoose');
const Event = mongoose.model('events');


const events = (req, res) =>
{
    Event.find()
        .populate('user')
        .populate('comments.commentUser')
        .limit(4)
        .then(events =>
        {
            res.render('index/home', {events});
        });
};


const about = (req, res) =>
{
    res.render('index/about');
};


module.exports = {
    events,
    about
};