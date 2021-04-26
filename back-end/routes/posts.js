const express = require('express');
const Post = require('../models/Post');
const route = express.Router();

/////////////////////// GET All
// option 1
// route.get('/', (req, res) => {
//     const posts = Post.find();
//     posts.then(data =>
//         res.status(200).json(data)
//     )
//         .catch(err =>
//             res.json(err
//             ));
// });

//option 2
route.get('/', async(req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts)
    } catch(err) {
        res.json({message: err});
    }
});


/////////////////////// CREATE NEW RECORD
// option 1
route.post('/', (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    post.save()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({ message: err })
        })
});

// option 2
// route.post('/', async(req, res) => {
//     const post = new Post({
//         title: req.body.title,
//         description: req.body.description
//     });


//     try {
//         const savedPost = await post.save();
//         res.json(savedPost);
//     } catch(err) {
//         res.json({message : err});
//     }
// })

/////////////////////// GET 1 POST
// Option 1
// route.get('/:postID', (req, res) => {
//     const postID = req.params.postID;
//     const post = Post.findById(postID);
//     post.then(data => res.json(data)).catch(err => res.json({message : err})) 
// })

// Option 2
route.get('/:postID', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postID);
        res.json(post);
    } catch (err) {
        res.json({ message: err })
    }
})

/////////////////////// DELETE 1 POST
// option 1
// route.delete('/:postID', (req, res) => {
//     const postRemove = Post.remove({"_id" : req.params.postID});
//     postRemove.then(data => 
//         res.json(data))
//     .catch(err =>
//         res.json({
//             message: err
//         }))
// })

// option 2
route.delete('/:postID', async (req, res) => {
    try {
        const postRemove = await Post.remove({ "_id": req.params.postID });
        res.json(postRemove);
    } catch (err) {
        res.json({ message: err });
    }

})

/////////////////////// UPDATE 1 POST
// OPTION 1
// route.patch('/:postID', (req, res)=>{
//     const postUpdate = Post.updateOne(
//         {"_id":req.params.postID},
//      { $set : { title : req.body.title, description : req.body.description}}
//      );
//     postUpdate.then(data => res.json(data))
//     .catch(err => {
//         res.json(err);
//     });
// })

// OPTION 2
route.patch('/:postID', async (req, res) => {
    try {
        const postUpdate = await Post.updateOne(
            { "_id": req.params.postID },
            {
                $set:
                {
                    title: req.body.title,
                    description: req.body.description
                }
            });
        res.json(postUpdate)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = route;