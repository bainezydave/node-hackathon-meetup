const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

router.get('/', (req, res) =>
{
    Story.find({ status: 'public' })
        .populate('user')
        .sort({ date: 'desc' })
        .then(stories =>
        {
            res.render('stories/index', {
                stories: stories
            });
        });

});

router.get('/show/:id', (req, res) =>
{
    Story.findOne({
        _id: req.params.id
    })
        .populate('user')
        .populate('comments.commentUser')
        .then(story =>
        {
            if (story.status == 'public')
            {
                res.render('stories/show', {
                    story: story
                });
            } else
            {
                if (req.user)
                {
                    if (req.user.id === story.user.id)
                    {
                        res.render('stories/show', {
                            story: story
                        });
                    } else
                    {
                        res.redirect('/stories');
                    }
                } else
                {
                    res.redirect('/stories');
                }
            }
        });
});


router.get('/user/:userId', (req, res) =>
{
    Story.find({
        user: req.params.userId,
        status: 'public'
    })
        .populate('user')
        .then(stories =>
        {
            res.render('stories/index', {
                stories: stories
            });
        });
});

// Logged user stories my story page
router.get('/my', ensureAuthenticated, (req, res) =>
{
    Story.find({
        user: req.user.id
    })
        .populate('user')
        .then(stories =>
        {
            res.render('stories/index', {
                stories: stories
            });
        });
});

router.get('/new', ensureAuthenticated, (req, res) =>
{
  res.render('stories/new');
});

router.get('/edit/:id', ensureAuthenticated, (req, res) =>
{
    console.log('edit story');
    Story.findOne({
        _id: req.params.id
    })
        .then(story =>
        {
            // if the story doesnot belong to user disable edit
            if (story.user != req.user.id)
            {
                res.redirect('/stories');
            } else
            {
                // res.send('STORIES');
                res.render('stories/edit', {
                    story: story
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
    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id
    };

    new Story(newStory)
        .save()
        .then(story =>
        {
            res.redirect(`/stories/show/${story.id}`);
        });
});

router.put('/:id', (req, res) =>
{
    Story.findOne({
        _id: req.params.id
    })
        .then(story =>
        {
            let allowComments;

            if (req.body.allowComments)
            {
                allowComments = true;
            } else
            {
                allowComments = false;
            }

            story.title = req.body.title;
            story.body = req.body.body;
            story.status = req.body.status;
            story.allowComments = allowComments;
            story.save()
                .then(story =>
                {
                    res.redirect('/dashboard');
                });
        });
});

router.delete('/:id', (req, res) =>
{
    Story.remove({ _id: req.params.id })
        .then(() =>
        {
            res.redirect('/dashboard');
        });
});

router.post('/comment/:id', (req, res) =>
{
    Story.findOne({
        _id: req.params.id
    })
        .then(story =>
        {
            console.log(story.user);
            console.log(req.user.id);
            if (story.user == req.user.id)
            {
                console.log('same user');
                res.redirect(`/stories/show/${story.id}`)
            } else
            {
                console.log('different user');

                const newComment = {
                    commentBody: req.body.commentBody,
                    commentUser: req.user.id
                };

                story.comments.unshift(newComment);
                story.save()
                    .then(story =>
                    {
                        res.redirect(`/stories/show/${story.id}`)
                    });
            }
        });
});

router.delete('/:story_id/comments/:id', (req, res) =>
{
    console.log('found delete route');
    Story.update({
        $pull: { comments: { _id: req.params.id } }
    })
    .then(() =>
    {
        console.log(S)
    });
});
module.exports = router;
