import Recording from '../models/Recording.js';
import Category from '../models/Category.js';

export const getRecordings = async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const skip = (page - 1) * limit;

    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }

    const recordings = await Recording.find(query)
      .populate('category')
      .populate('author_id')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Recording.countDocuments(query);

    res.json({
      results: recordings,
      count: total,
      next: skip + recordings.length < total ? page + 1 : null,
      previous: page > 1 ? page - 1 : null
    });
  } catch (error) {
    console.error('Get recordings error:', error);
    res.status(500).json({ error: 'Error al obtener grabaciones' });
  }
};

export const getRecordingById = async (req, res) => {
  try {
    const recording = await Recording.findById(req.params.id).populate('category');
    if (!recording) {
      return res.status(404).json({ error: 'Grabación no encontrada' });
    }
    res.json(recording);
  } catch (error) {
    console.error('Get recording error:', error);
    res.status(500).json({ error: 'Error al obtener grabación' });
  }
};

export const getRecordingsByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const categoryDoc = await Category.findOne({ slug: category });

    if (!categoryDoc) {
      return res.json({ results: [], count: 0 });
    }

    const recordings = await Recording.find({ category: categoryDoc._id })
      .populate('category')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Recording.countDocuments({ category: categoryDoc._id });

    res.json({
      results: recordings,
      count: total,
      next: skip + recordings.length < total ? page + 1 : null,
      previous: page > 1 ? page - 1 : null
    });
  } catch (error) {
    console.error('Get recordings by category error:', error);
    res.status(500).json({ error: 'Error al obtener grabaciones por categoría' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
};

export const getRandomRecording = async (req, res) => {
  try {
    const count = await Recording.countDocuments();
    const random = Math.floor(Math.random() * count);
    const recording = await Recording.findOne().skip(random).populate('category');
    res.json(recording);
  } catch (error) {
    console.error('Get random recording error:', error);
    res.status(500).json({ error: 'Error al obtener grabación aleatoria' });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(category);
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ error: 'Error al obtener categoría' });
  }
};
