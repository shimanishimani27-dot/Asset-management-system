import { Router } from 'express';

const router = Router();

let staff = [
  { _id: 'mem-jdoe', name: 'John Doe', department: 'IT', email: 'john@example.com' },
  { _id: 'mem-gphiri', name: 'Grace Phiri', department: 'IT', email: 'grace@example.com' },
  { _id: 'mem-adaka', name: 'Anita Daka', department: 'Finance', email: 'anita@example.com' },
];

router.get('/', (_req, res) => {
  res.json(staff);
});

router.post('/', (req, res) => {
  const body = req.body || {};
  const name = (body.name || '').trim();
  if (!name) return res.status(400).json({ error: 'name is required' });
  const created = { _id: `mem-${Date.now()}`, name, department: body.department || 'Unknown', email: body.email || '' };
  staff.unshift(created);
  res.status(201).json(created);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const idx = staff.findIndex(s => s._id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  staff[idx] = { ...staff[idx], ...req.body };
  res.json(staff[idx]);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const before = staff.length;
  staff = staff.filter(s => s._id !== id);
  if (staff.length === before) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

export default router;
