import mongoose from 'mongoose';

export default async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri || /<cluster-host>|<username>|<password>/.test(uri)) {
    console.warn('[asset-backend] MONGODB_URI is missing or a placeholder. Skipping MongoDB connection.');
    return; // Allow server to start for local/dev without DB
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, {
    dbName: process.env.DB_NAME || 'asset_management',
  });
  console.log('MongoDB connected');
}
