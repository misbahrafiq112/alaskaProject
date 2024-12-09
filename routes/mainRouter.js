import Router from 'express'
const router = Router();

import userRouter from './userRouter.js'
import chatRouter from './chatRouter.js'
import settingRouter from'./settingRouter.js'

router.use('/user',userRouter);
router.use('/chat',chatRouter);
router.use('/Setting',settingRouter)
export default router