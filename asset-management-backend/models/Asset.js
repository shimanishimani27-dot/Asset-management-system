import mongoose from 'mongoose';

const AssetSchema = new mongoose.Schema(
  {
    tag: { type: String, index: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    assignedTo: { type: String, default: '—' },
    department: { type: String, required: true },
    condition: { type: String, enum: ['Good', 'Repair', 'Bad'], default: 'Good' },
    province: { type: String },
    office: { type: String },
    acquired: { type: String },
    value: { type: Number },
    status: { type: String, default: 'active' },
  },
  { timestamps: true }
);

export default mongoose.model('Asset', AssetSchema);
