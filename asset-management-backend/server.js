import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import assetRoutes from './routes/assetRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import officeRoutes from './routes/officeRoutes.js';
import provinceRoutes from './routes/provinceRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// DB
await connectDB();

// Health/root
app.get('/', (_req, res) => res.json({ ok: true, service: 'asset-backend' }));
app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'asset-backend', time: new Date().toISOString() }));

// Routes
app.use('/api/assets', assetRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/offices', officeRoutes);
app.use('/api/provinces', provinceRoutes);

// Error handler (last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
