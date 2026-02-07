import express from 'express';
import {
  getRecordings,
  getRecordingById,
  getRecordingsByCategory,
  getCategories,
  getCategoryById
} from '../controllers/recordingsController.js';

const router = express.Router();

router.get('/recordings/', getRecordings);
router.get('/recordings/:id/', getRecordingById);
router.get('/category/', getRecordingsByCategory);
router.get('/categories/', getCategories);
router.get('/categories/:id/', getCategoryById);

export default router;
