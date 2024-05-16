//각 요청에 대한 핸들러

import mongoose from 'mongoose';
import character from '../models/characterModel.js';

export const getCharacter = async (req, res) => {
  const characterId = req.params.id;
  try {
    const find = await character.findOne({ id: characterId }).select('-_id name health power');
    if (!find)
      return res
        .status(404)
        .json({ error: '해당 ID를 가진 캐릭터가 존재하지 않습니다' });
    res.json(find);
  } catch (error) {
    res.status(500).json({ error: '캐릭터 검색 중 오류 발생' });
  }
};

export const createCharacter = async (req, res) => {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({ error: '캐릭터 이름을 입력해주세요' });

  try {
    let lastCharacter = await character.findOne({},{ _id: 0, id: 1 }, { sort: { id: -1 }});
    let newId = lastCharacter ? lastCharacter.id+1 : 1;
    const newCharacter = new character({
      id: newId,
      name,
      health: 500,
      power: 100,
    });

    await newCharacter.save();
    res.status(201).json('캐릭터 생성됨! : ' + newCharacter.id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '캐릭터 생성중 오류 발생' });
  }
};

export const deleteCharacter = async (req, res) => {
  //id 값을 params로 전달받아 해당하는 ID의 캐릭터를 삭제
  const characterId = req.params.id;
  try {
    const deleteCharacter = await character.findOneAndDelete({
      id: characterId,
    });
    if (!deleteCharacter) {
      return res
        .status(400)
        .json({ error: '삭제할 캐릭터를 찾지 못하였습니다.' });
    }
    res.status(200).json({ message: '캐릭터가 삭제되었습니다' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '캐릭터 삭제중 오류 발생' });
  }
};
