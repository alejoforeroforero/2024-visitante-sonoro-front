import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import recordingsRoutes from './routes/recordings.js';
import authorsRoutes from './routes/authors.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use('/auth', authRoutes);
app.use('/v1', recordingsRoutes);
app.use('/v1', authorsRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const connectDB = async () => {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  } else {
    console.log('Running without MongoDB - using mock data');
  }
};

connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend running on port ${PORT}`);
  });
});

export default app;
