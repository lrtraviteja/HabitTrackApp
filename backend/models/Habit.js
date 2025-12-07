import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  frequency: { type: String, enum: ['daily', 'weekly'], default: 'daily' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  streak: { type: Number, default: 0 },
  completedDates: [{ type: Date }]
}, { timestamps: true });

export default mongoose.model('Habit', habitSchema);
