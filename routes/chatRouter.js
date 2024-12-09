

import Router from 'express';
import { createChat, sendMessage, getMessages,fetchChat } from '../controllers/chatController.js';

const router = Router();

router.post('/createchat', createChat);

router.post('/sender', sendMessage);

router.get('/messages/:chatId', getMessages);
router.get('/fetchchats', fetchChat);


export default router;
