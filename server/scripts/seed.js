import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = process.env.DB_NAME || 'asset_management';

const SAMPLE_ASSETS = [
  { tag: 'LAP-001', name: 'Dell Latitude 7420', category: 'Laptop', assignedTo: 'John Doe', department: 'IT', condition: 'Good', province: 'Lusaka', office: 'HQ', acquired: '2024-02-10', value: 1800, status: 'active' },
  { tag: 'DESK-010', name: 'HP ProDesk 600', category: 'Desktop', assignedTo: '—', department: 'Operations', condition: 'Repair', province: 'Copperbelt', office: 'Ndola', acquired: '2023-09-20', value: 950, status: 'active' },
  { tag: 'PRN-203', name: 'Canon LBP226dw', category: 'Printer', assignedTo: '—', department: 'Finance', condition: 'Good', province: 'Central', office: 'Kabwe', acquired: '2022-05-12', value: 420, status: 'active' },
  { tag: 'KBD-517', name: 'Logitech K120', category: 'Keyboard', assignedTo: '—', department: 'IT', condition: 'Bad', province: 'Southern', office: 'Choma', acquired: '2021-11-05', value: 20, status: 'active' },
  { tag: 'LAP-014', name: 'Lenovo ThinkPad T14', category: 'Laptop', assignedTo: 'Grace Phiri', department: 'IT', condition: 'Good', province: 'Lusaka', office: 'HQ', acquired: '2024-06-01', value: 1650, status: 'active' }
].map(a => ({ ...a, createdAt: new Date(), updatedAt: new Date() }));

async function main() {
  if (!MONGODB_URI || /<cluster-host>|<username>|<password>/.test(MONGODB_URI)) {
    console.error('ERROR: MONGODB_URI is not set or is a placeholder. Edit server/.env first.');
    process.exit(1);
  }
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const col = db.collection('assets');
    // Idempotent-ish: remove documents with sample tags, then insert fresh
    const tags = SAMPLE_ASSETS.map(a => a.tag);
    await col.deleteMany({ tag: { $in: tags } });
    const result = await col.insertMany(SAMPLE_ASSETS);
    console.log(`Seeded ${result.insertedCount} assets into '${DB_NAME}.assets'.`);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

main();
