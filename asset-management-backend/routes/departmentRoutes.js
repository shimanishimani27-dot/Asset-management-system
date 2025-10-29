import { Router } from 'express';

const router = Router();

let departments = [
  { _id: 'mem-it', name: 'IT' },
  { _id: 'mem-ops', name: 'Operations' },
  { _id: 'mem-fin', name: 'Finance' },
  { _id: 'mem-hr', name: 'HR' },
];

router.get('/', (_req, res) => {
  res.json(departments);
});

router.post('/', (req, res) => {
  const name = (req.body?.name || '').trim();
  if (!name) return res.status(400).json({ error: 'name is required' });
  const created = { _id: `mem-${Date.now()}`, name };
  departments.unshift(created);
  res.status(201).json(created);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const idx = departments.findIndex(d => d._id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  departments[idx] = { ...departments[idx], ...req.body };
  res.json(departments[idx]);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const before = departments.length;
  departments = departments.filter(d => d._id !== id);
  if (departments.length === before) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

export default router;
