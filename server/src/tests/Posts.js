const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { verifyToken } = require('../utils/auth');

// @route   POST /api/posts
// Create a new post (requires authentication)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const post = await Post.create({
      title,
      content,
      category,
      author: req.user._id,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/posts
// Get all posts or filter/paginate
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = category ? { category } : {};

    const posts = await Post.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/posts/:id
// Get single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/posts/:id
// Update a post (author only)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    Object.assign(post, req.body);
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/posts/:id
// Delete a post (author only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

