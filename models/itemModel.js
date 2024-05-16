//아이템의 스키마 정의
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    item_code: { type: Number, required: true,unique:true },
    item_name: { type: String, required: true,unique:true },
    item_stat: {
      health: { type: Number, required: false },
      power: { type: Number, required: false },
    },
  });
  const item = mongoose.model('item', itemSchema);

export default item;