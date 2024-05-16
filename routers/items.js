import express from "express";
import { createItem,patchItem,getItemList,findItem } from "../controllers/itemController.js";

const itemRouter = express.Router();

itemRouter.post('/',createItem);
itemRouter.patch('/:id',patchItem);
itemRouter.get('/',getItemList);
itemRouter.get("/:id",findItem);
export default itemRouter;