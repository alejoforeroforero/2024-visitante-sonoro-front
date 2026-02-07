import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  image: { type: String },
  recordings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recording' }]
}, { timestamps: true });

export default mongoose.model('Author', authorSchema);
