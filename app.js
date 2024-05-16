import express from 'express';
import { MongoClient } from 'mongodb';

const mongodb_password = process.env.mongodb_password;
let db; //데이터베이스 연결 저장하는 전역변수
const playerCollections = db.collection('player');
await playerCollections.createIndex({ name: 1 }, { unique: true }); //중복되지 않도록 보장
const itemCollections = db.collection('item');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {});

app.post('/create', async (req, res) => {
  const id = await (playerCollections.countDocuments() + 1); //이미 존재하는 캐릭터의 개수 +1을 하여 생성
  const newPlayer = {
    character_id: id,
    name: req.body.name,
    health: 500,
    power: 100,
  };

  await playerCollections.insertOne(newPlayer); //데이터를 삽입전 자동으로 중복확인 이루어짐
  res.status(201).json('캐릭터 생성됨! : ' + newPlayer.character_id);
});

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
