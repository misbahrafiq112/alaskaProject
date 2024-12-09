// index.js

import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import routes from './routes/mainRouter.js'



dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join-chat', (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat room: ${chatId}`);
  });

  socket.on('send-message', async (data) => {
    const { chatId, senderId, message } = data;


    const newMessage = await prisma.message.create({
      data: {
        chatId,
        senderId,
        message,
      },
    });


    io.to(chatId).emit('new-message', newMessage);
  });


  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use(routes)

server.listen(3000, () => {
  console.log('Server running on port 3000');
});


