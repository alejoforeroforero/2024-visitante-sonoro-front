import mongoose from 'mongoose';

const recordingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  audio: { type: String, required: true },
  image: { type: String },
  author: { type: String },
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  duration: { type: Number },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  }
}, { timestamps: true });

export default mongoose.model('Recording', recordingSchema);
