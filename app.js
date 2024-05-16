import express from 'express';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
const mongodb_password = process.env.mongodb_password;
let db; //데이터베이스 연결 저장하는 전역변수
const playerCollections = db.collection('player');
await playerCollections.createIndex({ name: 1 }, { unique: true }); //이름에 고유 인덱스 부여,중복되지 않도록 보장
const itemCollections = db.collection('item');
await itemCollections.createIndex({ item_name: 1 }, { unique: true });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/characters', async (req, res) => {
  if (!req.body.name)
    return res.status(400).json({ error: '캐릭터 이름을 입력해주세요' });
  let lastId = await playerCollections.findOne({}, { sort: { _id: -1 } });
  if (lastId == null) lastId = 0;
  const newPlayer = {
    character_id: lastId + 1, //가장 최근 생성된 캐릭터의 ID값에 +1을 하여 생성
    name: req.body.name,
    health: 500,
    power: 100,
  };

  await playerCollections.insertOne(newPlayer); //데이터를 삽입전 자동으로 중복확인 이루어짐
  res.status(201).json('캐릭터 생성됨! : ' + newPlayer.character_id);
});
app.delete('/api/characters/:id', async (req, res) => {
  //id 값을 params로 전달받아 해당하는 ID의 캐릭터를 삭제
  const characterId = req.params.id;

  try {
    await playerCollections.deleteOne({ character_id: characterId });
    res.status(200).json({ message: '삭제성공' });
  } catch (error) {
    res.status(500).json({ error: '캐릭터 삭제 중 오류 발생' });
  }
});
app.get('/api/characters/:id', async (req, res) => {
  const characterId = req.params.id;
  try {
    const find = await playerCollections.findOne({ character_id: characterId });
    if (!find)
      return res
        .status(404)
        .json({ error: '해당 ID를 가진 캐릭터가 존재하지 않습니다' });
    res.json(find);
  } catch (error) {
    res.status(500).json({ error: '캐릭터 검색 중 오류 발생' });
  }
});

const itemSchema = new mongoose.Schema({
  item_code: { type: Number, required: true },
  item_name: { type: String, required: true },
  item_stat: {
    health: { type: Number, required: true },
    power: { type: Number, required: true },
  },
});
const itemModel = mongoose.model('item', itemSchema);

app.post('/api/items', async (req, res) => {
  try {
    let lastItemId = await itemCollections.findOne({}, { sort: { _id: -1 } });
    if (lastItemId == null) {
      lastItemId = 0;
    }
    const { item_name, item_stat } = req.body;
    const item_code = lastItemId +1;

    const newItem = await itemModel.create({
        item_code,
        item_name,
        item_stat
    });
    res.status(201).json(newItem);

  } catch {
    res.status(500).json({error:"서버오류 발생"});
  }
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
