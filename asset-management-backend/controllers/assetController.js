import mongoose from 'mongoose';
import Asset from '../models/Asset.js';

// In-memory fallback store used when MongoDB is not connected
let memoryAssets = [
  { _id: 'mem-LAP-001', tag: 'LAP-001', name: 'Dell Latitude 7420', category: 'Laptop', assignedTo: 'John Doe', department: 'IT', condition: 'Good', province: 'Lusaka', office: 'HQ', acquired: '2024-02-10', value: 1800, status: 'active', createdAt: new Date().toISOString() },
  { _id: 'mem-DESK-010', tag: 'DESK-010', name: 'HP ProDesk 600', category: 'Desktop', assignedTo: '—', department: 'Operations', condition: 'Repair', province: 'Copperbelt', office: 'Ndola', acquired: '2023-09-20', value: 950, status: 'active', createdAt: new Date().toISOString() },
  { _id: 'mem-PRN-203', tag: 'PRN-203', name: 'Canon LBP226dw', category: 'Printer', assignedTo: '—', department: 'Finance', condition: 'Good', province: 'Central', office: 'Kabwe', acquired: '2022-05-12', value: 420, status: 'active', createdAt: new Date().toISOString() },
];
const isDBConnected = () => mongoose.connection?.readyState === 1;

export const getAssets = async (req, res) => {
  try {
    if (isDBConnected()) {
      const items = await Asset.find().sort({ createdAt: -1 });
      return res.json(items);
    }
    // Fallback: in-memory
    const sorted = [...memoryAssets].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(sorted);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const createAsset = async (req, res) => {
  try {
    const body = req.body || {};
    const input = { ...(body || {}), ...(body?.metadata || {}) };
    if (isDBConnected()) {
      const asset = await Asset.create({
        tag: input.tag,
        name: input.name || 'Unnamed',
        category: input.category || 'Unknown',
        assignedTo: input.assignedTo || '—',
        department: input.department || 'Unknown',
        condition: input.condition || 'Good',
        province: input.province,
        office: input.office,
        acquired: input.acquired,
        value: input.value,
        status: input.status || 'active',
      });
      return res.status(201).json(asset);
    }
    const created = {
      _id: `mem-${Date.now()}`,
      tag: input.tag,
      name: input.name || 'Unnamed',
      category: input.category || 'Unknown',
      assignedTo: input.assignedTo || '—',
      department: input.department || 'Unknown',
      condition: input.condition || 'Good',
      province: input.province,
      office: input.office,
      acquired: input.acquired,
      value: input.value,
      status: input.status || 'active',
      createdAt: new Date().toISOString(),
    };
    memoryAssets.unshift(created);
    res.status(201).json(created);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const updateAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body || {};
    const input = { ...(body || {}), ...(body?.metadata || {}) };
    if (isDBConnected()) {
      const updated = await Asset.findByIdAndUpdate(
        id,
        { $set: input },
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: 'Not found' });
      return res.json(updated);
    }
    const idx = memoryAssets.findIndex(a => a._id === id || a.tag === id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    memoryAssets[idx] = { ...memoryAssets[idx], ...input };
    res.json(memoryAssets[idx]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;
    if (isDBConnected()) {
      const out = await Asset.findByIdAndDelete(id);
      if (!out) return res.status(404).json({ error: 'Not found' });
      return res.json({ ok: true });
    }
    const before = memoryAssets.length;
    memoryAssets = memoryAssets.filter(a => a._id !== id && a.tag !== id);
    if (memoryAssets.length === before) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
