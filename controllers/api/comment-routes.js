const router = require('express').Router();
const { Comment } = require('../../models');
const { restore } = require('../../models/User');

router.get('/', (req, res) => {
    Comment.findAll({})
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    // check the session
    if (req.session) {
        Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        // user_id: req.body.user_id,
        post_id: req.body.post_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

router.delete('/:id', (req, res) => {
    Comment.destroy(
        {
            where: {
                id: req.params.id
            }
        })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;