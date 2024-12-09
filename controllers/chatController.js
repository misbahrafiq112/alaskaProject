

import prisma from "../DB/db.config.js";

export const createChat = async (req, res) => {
  const { userOneId, userTwoId } = req.body;

  try {
    const existingChat = await prisma.chat.findFirst({
      where: {
        OR: [
          { userOneId, userTwoId },
          { userOneId: userTwoId, userTwoId: userOneId },
        ],
      },
    });

    if (existingChat) {
      return res.status(400).json({ message: 'Chat already exists between these users' });
    }

    const chat = await prisma.chat.create({
      data: {
        userOneId,
        userTwoId,
      },
      
    });

    res.status(201).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating chat' });
  }
};
export const sendMessage = async (req, res) => {

  const { chatId,senderId, message } = req.body;
  console.log(req.body,"vvv");
  

  try {
    const newMessage = await prisma.message.create({
      data: {
        chatId,
        senderId,
        message,
       },
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending message' });
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await prisma.message.findMany({
      where: { chatId },
      include: {
        sender: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
};
export const fetchChat = async (req, res, io) => {
  const { userId } = req.body;//assuming the user 
  try {
  
    const chats = await prisma.chat.findMany({
      where: {
        OR: [
          { userOneId: userId },
          { userTwoId: userId }
        ]
      },
      
    });
    res.status(200).json(chats);
    console.log(chats);
    
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching chat' });
  }
};


   