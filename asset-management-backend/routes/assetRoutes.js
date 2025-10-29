import { Router } from 'express';
import { getAssets, createAsset, updateAsset, deleteAsset } from '../controllers/assetController.js';

const router = Router();

router.get('/', getAssets);
router.post('/', createAsset);
router.put('/:id', updateAsset);
router.delete('/:id', deleteAsset);

export default router;
