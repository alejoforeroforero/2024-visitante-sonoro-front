import express from 'express';
import {
  register,
  login,
  googleSignIn,
  logout,
  getUser,
  updateUser,
  addFavorite,
  removeFavorite,
  updateProfilePicture
} from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/register/', register);
router.post('/token/', login);
router.post('/google-signin/', googleSignIn);
router.post('/logout/', authenticateToken, logout);

router.get('/user/', authenticateToken, getUser);
router.put('/user/', authenticateToken, updateUser);

router.post('/favorites/', authenticateToken, addFavorite);
router.delete('/favorites/', authenticateToken, removeFavorite);

router.post('/update-profile-picture/', authenticateToken, upload.single('profile_picture'), updateProfilePicture);

export default router;
