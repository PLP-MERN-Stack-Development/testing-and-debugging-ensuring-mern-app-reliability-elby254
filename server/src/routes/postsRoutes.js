const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { verifyToken } = require('../utils/auth');

// CREATE POST
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
      author: req.user._id.toString(),   // IMPORTANT: test requires string
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET ALL POSTS (with filtering + pagination)
router.get('/', async (req, res) => {
  try {
    let { category, page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const query = category ? { category } : {};

    const posts = await Post.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET SINGLE POST
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.status(200).json(post);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE POST
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    // MUST MATCH test expectation
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const { title, content, category } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;
    if (category) post.category = category;

    await post.save();

    res.status(200).json(post);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE POST
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await post.deleteOne();

    res.status(200).json({ message: 'Post deleted' });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


