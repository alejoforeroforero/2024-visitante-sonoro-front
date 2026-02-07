import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRES_IN = '7d';
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

const setTokenCookie = (res, token) => {
  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario o email ya existe' });
    }

    const user = new User({ username, email, password });
    await user.save();

    const token = generateToken(user);
    setTokenCookie(res, token);

    res.status(201).json({ message: 'Usuario registrado exitosamente', data: user });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: username }, { username }]
    });

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ message: 'La contraseña es incorrecta' });
    }

    const token = generateToken(user);
    setTokenCookie(res, token);

    res.json({ message: 'Inicio de sesión exitoso', data: user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

export const googleSignIn = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub: google_id, email, name, picture } = payload;

    let user = await User.findOne({ google_id });

    if (!user) {
      user = await User.findOne({ email });
      if (user) {
        user.google_id = google_id;
        user.google_picture = picture;
        await user.save();
      } else {
        user = new User({
          username: email.split('@')[0],
          email,
          google_id,
          google_picture: picture,
          first_name: name?.split(' ')[0],
          last_name: name?.split(' ').slice(1).join(' ')
        });
        await user.save();
      }
    }

    const jwtToken = generateToken(user);
    setTokenCookie(res, jwtToken);

    res.json({ message: 'Inicio de sesión con Google exitoso', data: user });
  } catch (error) {
    console.error('Google sign-in error:', error);
    res.status(500).json({ error: 'Error al iniciar sesión con Google' });
  }
};

export const logout = async (req, res) => {
  res.clearCookie('access_token');
  res.json({ message: 'Sesión cerrada exitosamente' });
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ data: user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { first_name, last_name, bio } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { first_name, last_name, bio },
      { new: true }
    );

    res.json({ message: 'Perfil actualizado', data: user });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
};

export const addFavorite = async (req, res) => {
  try {
    const { record_id } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { favorites: record_id } },
      { new: true }
    ).populate('favorites');

    res.json({ message: 'Favorito agregado', data: user.favorites });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({ error: 'Error al agregar favorito' });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { record_id } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { favorites: record_id } },
      { new: true }
    ).populate('favorites');

    res.json({ message: 'Favorito eliminado', data: user.favorites });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({ error: 'Error al eliminar favorito' });
  }
};

export const updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó imagen' });
    }

    const profilePicturePath = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profile_picture: profilePicturePath },
      { new: true }
    );

    res.json({ message: 'Imagen actualizada', data: user });
  } catch (error) {
    console.error('Update profile picture error:', error);
    res.status(500).json({ error: 'Error al actualizar imagen' });
  }
};
