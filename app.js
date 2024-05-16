import express from 'express';
import mongoose from 'mongoose';
import characterRouter from './routers/characters.js';
import itemRouter from './routers/items.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/characters',characterRouter);
app.use('/api/items',itemRouter);


async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB 연결 완료');

    app.listen(process.env.PORT, () => {
      console.log(`서버가 포트 ${process.env.PORT}에서 정상 작동 중입니다.`);
    });
  } catch (error) {
    console.error('MongoDB 에러:', error);
    process.exit(1);
  }
}

startServer();
