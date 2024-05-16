import express from 'express';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import characterRoutes from './routers/characters.js';


const mongodb_password = process.env.mongodb_password;
let db; //데이터베이스 연결 저장하는 전역변수
const characterCollections = db.collection('character');
await characterCollections.createIndex({ name: 1 }, { unique: true }); //캐릭터 이름에 고유 인덱스 부여,중복되지 않도록 보장
const itemCollections = db.collection('item');
await itemCollections.createIndex({ item_name: 1 }, { unique: true }); //아이템 이름에 고유 인덱스 부여,중복 되지 않도록 보장

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/characters',characterRoutes);


async function startServer() {
  try {
    const client = new MongoClient(
      `mongodb+srv://sparta-user:${mongodb_password}@cluster0.hhqelee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    );
    await client.connect();
    db = client.db();
    console.log('mongodb연결 완료');

    app.listen(process.env.PORT, () => {
      console.log('서버 정상 작동');
    });
  } catch (error) {
    console.error('mongodb에러', error);
    process.exit(1);
  }
}
startServer();
