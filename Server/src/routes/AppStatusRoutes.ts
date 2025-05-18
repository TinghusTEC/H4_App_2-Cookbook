import { Router } from 'express';
import { getAppStatus, addAppStatus } from '../controllers/AppStatusController';

const router = Router();

router.get('/', getAppStatus);
router.post('/', addAppStatus);

export default router;