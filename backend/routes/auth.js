require("dotenv").config();
const router = require("express").Router();
const Post = require("../models/PostModels");
const Comment = require("../models/Comment");
const db = require("../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


// Create a new post
router.post("/posts", async (req, res) => {
  try {
    const { userId, title, body } = req.body;
    const newPost = await Post.create({ userId, title, body });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Display all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Display a single post
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get comments for a specific post
router.get("/posts/:postId/comments", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.findAll({ where: { postId } });
    if (comments.length > 0) {
      res.status(200).json(comments);
    } else {
      res.status(404).json({ message: "No comments found for this post" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific post
router.delete("/posts/:id", async (req, res) => {
  try {
    const result = await Post.destroy({ where: { id: req.params.id } });
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate access token
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router;
