import { Router } from 'express';

const router = Router();

let offices = [
  { _id: 'mem-hq', name: 'HQ', province: 'Lusaka' },
  { _id: 'mem-ndola', name: 'Ndola', province: 'Copperbelt' },
  { _id: 'mem-kabwe', name: 'Kabwe', province: 'Central' },
];

router.get('/', (_req, res) => {
  res.json(offices);
});

router.post('/', (req, res) => {
  const body = req.body || {};
  const name = (body.name || '').trim();
  if (!name) return res.status(400).json({ error: 'name is required' });
  const created = { _id: `mem-${Date.now()}`, name, province: body.province || '' };
  offices.unshift(created);
  res.status(201).json(created);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const idx = offices.findIndex(o => o._id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  offices[idx] = { ...offices[idx], ...req.body };
  res.json(offices[idx]);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const before = offices.length;
  offices = offices.filter(o => o._id !== id);
  if (offices.length === before) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

export default router;
