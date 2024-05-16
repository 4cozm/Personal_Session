//캐릭터의 스키마 모델 정의

import mongoose from "mongoose";

const characterSchema = new mongoose.Schema({
    id:{type:Number,unique:true},
    name:{type:String,required:true},
    health:{type:Number,default:500},
    power:{type:Number,default:100}
});

const character = mongoose.model("character",characterSchema);

export default character;

