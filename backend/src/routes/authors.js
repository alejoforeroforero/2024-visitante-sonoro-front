import express from 'express';
import { getAuthors, getAuthorById } from '../controllers/authorsController.js';

const router = express.Router();

router.get('/authors/', getAuthors);
router.get('/authors/:id/', getAuthorById);

export default router;
