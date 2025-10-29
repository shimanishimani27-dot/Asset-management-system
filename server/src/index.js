import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "";
const DB_NAME = process.env.DB_NAME || "asset_management";

// Middleware
app.use(cors());
app.use(express.json());

// Health
app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "asset-backend", time: new Date().toISOString() });
});

// Friendly root route (avoid 'Cannot GET /')
app.get('/', (_req, res) => {
  res.type('text/plain').send('Asset Management Backend is running. See /api/health and /api/assets');
});

let client; // shared client
let db; // shared db
let storageMode = "mongo"; // or "memory"
let memoryAssets = []; // used when storageMode === 'memory'

async function connectMongo() {
  if (db) return db;
  // Detect obvious placeholders or empty
  const looksPlaceholder = !MONGODB_URI || /<cluster-host>|<username>|<password>/.test(MONGODB_URI);
  if (looksPlaceholder) {
    storageMode = "memory";
    console.warn("[asset-backend] Using in-memory storage. Set MONGODB_URI in .env to enable MongoDB.");
    return null;
  }
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    storageMode = "mongo";
    return db;
  } catch (err) {
    // Fallback to memory on connection errors (e.g., EBADNAME, network)
    storageMode = "memory";
    console.error("[asset-backend] Mongo connection failed, falling back to in-memory store:", err.message);
    return null;
  }
}

function assetsCollection() {
  if (!db) throw new Error("Database not initialized");
  return db.collection("assets");
}

// CRUD routes
app.get("/api/assets", async (req, res) => {
  try {
    await connectMongo();
    if (storageMode === "memory") {
      const items = [...memoryAssets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.json(items);
    }
    const items = await assetsCollection().find({}).sort({ createdAt: -1 }).toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/assets", async (req, res) => {
  try {
    await connectMongo();
    const payload = req.body || {};
    // Flatten fields so clients receive consistent top-level properties
    const asset = {
      name: payload.name || "Unnamed",
      category: payload.category || "Unknown",
      department: payload.department || "Unknown",
      status: payload.status || "active",
      tag: payload.tag || payload.metadata?.tag,
      assignedTo: payload.assignedTo ?? payload.metadata?.assignedTo ?? "—",
      province: payload.province ?? payload.metadata?.province ?? "Lusaka",
      office: payload.office ?? payload.metadata?.office ?? "HQ",
      acquired: payload.acquired ?? payload.metadata?.acquired,
      value: payload.value ?? payload.metadata?.value,
      condition: payload.condition ?? payload.metadata?.condition ?? "Good",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    if (storageMode === "memory") {
      const memDoc = { _id: String(Date.now()), ...asset };
      memoryAssets.unshift(memDoc);
      return res.status(201).json(memDoc);
    }
    const result = await assetsCollection().insertOne(asset);
    res.status(201).json({ _id: result.insertedId, ...asset });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/assets/:id", async (req, res) => {
  try {
    await connectMongo();
    const { id } = req.params;
    const p = req.body || {};
    const update = {
      name: p.name,
      category: p.category,
      department: p.department,
      status: p.status,
      tag: p.tag ?? p.metadata?.tag,
      assignedTo: p.assignedTo ?? p.metadata?.assignedTo,
      province: p.province ?? p.metadata?.province,
      office: p.office ?? p.metadata?.office,
      acquired: p.acquired ?? p.metadata?.acquired,
      value: p.value ?? p.metadata?.value,
      condition: p.condition ?? p.metadata?.condition,
      updatedAt: new Date(),
    };
    if (storageMode === "memory") {
      const idx = memoryAssets.findIndex(a => String(a._id) === String(id));
      if (idx === -1) return res.status(404).json({ error: "Not found" });
      memoryAssets[idx] = { ...memoryAssets[idx], ...update };
      return res.json(memoryAssets[idx]);
    }
    const result = await assetsCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after" }
    );
    if (!result || !result.value) return res.status(404).json({ error: "Not found" });
    res.json(result.value);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/assets/:id", async (req, res) => {
  try {
    await connectMongo();
    const { id } = req.params;
    if (storageMode === "memory") {
      const before = memoryAssets.length;
      memoryAssets = memoryAssets.filter(a => String(a._id) !== String(id));
      if (memoryAssets.length === before) return res.status(404).json({ error: "Not found" });
      return res.json({ ok: true });
    }
    const result = await assetsCollection().deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, async () => {
  await connectMongo();
  if (storageMode === "mongo") {
    try {
      await assetsCollection().createIndex({ name: 1 });
    } catch (e) {
      console.warn("[asset-backend] Could not ensure indexes:", e.message);
    }
  }
  console.log(`API running on http://localhost:${PORT} (storage: ${storageMode})`);
});
