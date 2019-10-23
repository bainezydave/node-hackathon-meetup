const mongoose = require('mongoose');
const Group = mongoose.model('groups');

const index = (req, res) =>
{
    Group.find({ status: 'public' })
    .populate('user')
    .sort({ date: 'desc' })
    .then(groups =>
    {
        res.render('groups/index', {
            groups: groups
        });
    });
};


const viewCreate = (req, res) => res.render('groups/new');


const create = (req, res) =>
{
    const newGroup = {
        name: req.body.name,
        purpose: req.body.purpose,
        created: Date.now(),
        members: req.body.members,
        hosts: req.body.hosts,
        photo: req.body.photo,
        user: req.user.id
    };

    new Group(newGroup)
    .save()
    .then(group => res.redirect(`/groups/show/${group.id}`));
};


const show = (req, res) =>
{
    Group.findOne({
        _id: req.params.id
    })
    .populate('user')
    .then(group =>
    {
        if (group.status == 'public')
        {
            res.render('groups/show', {
                group: group
            });
        } else
        {
            if (req.user)
            {
                if (req.user.id === group.user.id)
                {
                    res.render('groups/show', {
                        group: group
                    });
                } else
                {
                    res.redirect('/groups');
                }
            } else
            {
                res.redirect('/groups');
            }
        }
    });
};


const viewEdit = (req, res) =>
{
    Group.findOne({
        _id: req.params.id
    })
    .then(group =>
    {
        if (group.user != req.user.id)
        {
            res.redirect('/groups');
        } else
        {
            res.render('groups/edit', {
                group: group
            });
        }
    });
};


const edit = (req, res) =>
{
    Group.findOne({
        _id: req.params.id
    })
    .then(group =>
    {
        group.name = req.body.name;
        group.purpose = req.body.purpose;
        group.created = req.body.created;
        group.members = req.body.members;
        group.hosts = req.body.hosts;
        group.photo = req.body.photo;

        group.save()
        .then(group =>
        {
            res.redirect('/groups');
        });
    });
};


const remove = (req, res) =>
{
    Group.remove({ _id: req.params.id })
    .then(() =>
    {
        res.redirect('/groups');
    });
};


const user = (req, res) =>
{
    Group.find({
        user: req.params.userId
    })
    .populate('user')
    .then(groups =>
    {
        res.render('groups/index', {
            groups: groups
        });
    });
};



module.exports = {
    index,
    viewCreate,
    create,
    show,
    viewEdit,
    edit,
    remove,
    user
};