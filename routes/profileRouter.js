import Router from 'express'
const router = Router();
import { upload } from "../multer/multer.js";

import {createProfile} from '../controllers/profileController.js'
import verifyJWT from '../middleware/verifyJWT.js';

router.post('/createProfile',verifyJWT,upload.array('profileImage',5),createProfile);


export default router