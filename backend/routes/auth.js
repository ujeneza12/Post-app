require("dotenv").config();
const router = require("express").Router();
const Post= require('../models/PostModels');
const Comment = require('../models/Comment');



// Create a new post
router.post('/posts', async (req, res) => {
  try {
    const { userId, title, body } = req.body;
    const newPost = await Post.create({ userId, title, body });
    res.status(201).json(newPost);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// Display all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// Display a single post
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// Get comments for a specific post
router.get('/posts/:postId/comments', async (req, res) => {
  try {
      const { postId } = req.params;
      const comments = await Comment.findAll({ where: { postId } });
      if (comments.length > 0) {
          res.status(200).json(comments);
      } else {
          res.status(404).json({ message: 'No comments found for this post' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


// Delete a specific post
router.delete('/posts/:id', async (req, res) => {
  try {
    const result = await Post.destroy({ where: { id: req.params.id } });
    if (result) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
} catch (error) {
    res.status(500).json({ error: error.message });
 
}
});


module.exports = router;
