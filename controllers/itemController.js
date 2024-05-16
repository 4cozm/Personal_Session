//각 요청에 대한 핸들러

import mongoose from 'mongoose';
import item from '../models/itemModel.js';

export const getItemList = async (req, res) => {
  try {
    const itemList = await item.find(
      {},
      { item_name: 1, item_code: 1, _id: 0 },
    );
    !itemList ? res.status(404).json('아이템이 없습니다') : res.json(itemList);
  } catch {
    res.status(500).json({ error: '아이템 목록 가져오는중 오류 발생' });
  }
};
export const findItem = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await item.findOne({ item_code:id });
    !result ? res.status(404).json('아이템이 없습니다') : res.json(result);
  } catch (error) {
    res.status(500).json({ error: '아이템 정보 가져오는중 오류 발생' });
  }
};
export const createItem = async (req, res) => {
  const {
    item_name,
    item_stat: { health = 0, power = 0 },
  } = req.body;
  if (!item_name)
    return res.status(400).json({ error: '아이템 이름을 입력해주세요' });

  const existingitem = await item.findOne({ item_name });
  if (existingitem)
    return res.status(400).json({ error: '아이템 이름이 이미 존재합니다' });

  try {
    let lastItemId = await item.findOne({},{ _id: 0, item_code: 1 }, { sort: { item_code: -1 }});
    lastItemId = lastItemId.item_code;
    if (!lastItemId) {
      lastItemId = 0;
    }
    const newItem = new item({
      item_code: lastItemId + 1,
      item_name: item_name,
      item_stat: { health: health, power: power },
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch(error) {
    console.error(error);
    res.status(500).json({ error: '서버오류 발생' });
  }
};

export const patchItem = async (req, res) => {
  try {
    const item_code = req.params.id;
    const {
      item_name,
      item_stat: { health = 0, power = 0 },
    } = req.body;

    const updatedItem = await item.findByIdAndUpdate(
      item_code,
      { item_name, item_stat: { health, power } },
      {
        new: true,
      },
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: '서버 오류 발생' });
  }
};
