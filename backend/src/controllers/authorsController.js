import Author from '../models/Author.js';

export const getAuthors = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const authors = await Author.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ name: 1 });

    const total = await Author.countDocuments();

    res.json({
      results: authors,
      count: total,
      next: skip + authors.length < total ? page + 1 : null,
      previous: page > 1 ? page - 1 : null
    });
  } catch (error) {
    console.error('Get authors error:', error);
    res.status(500).json({ error: 'Error al obtener autores' });
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate('recordings');
    if (!author) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.json(author);
  } catch (error) {
    console.error('Get author error:', error);
    res.status(500).json({ error: 'Error al obtener autor' });
  }
};
