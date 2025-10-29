import { Router } from 'express';

const router = Router();

let provinces = [
  { _id: 'mem-lusaka', name: 'Lusaka' },
  { _id: 'mem-copperbelt', name: 'Copperbelt' },
  { _id: 'mem-central', name: 'Central' },
  { _id: 'mem-southern', name: 'Southern' },
];

router.get('/', (_req, res) => {
  res.json(provinces);
});

router.post('/', (req, res) => {
  const name = (req.body?.name || '').trim();
  if (!name) return res.status(400).json({ error: 'name is required' });
  const created = { _id: `mem-${Date.now()}`, name };
  provinces.unshift(created);
  res.status(201).json(created);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const idx = provinces.findIndex(p => p._id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  provinces[idx] = { ...provinces[idx], ...req.body };
  res.json(provinces[idx]);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const before = provinces.length;
  provinces = provinces.filter(p => p._id !== id);
  if (provinces.length === before) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

export default router;
