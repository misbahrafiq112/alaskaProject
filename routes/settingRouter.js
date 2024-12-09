import Router from 'express'
const router = Router();

import { updateSettings, settings } from '../controllers/Settings.js';

router.put('/updateSetting',updateSettings)
router.post('/createSetting',updateSettings)
router.post('/update',settings)
export default router