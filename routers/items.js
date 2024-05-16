import express from "express";
import { createItem,patchItem,getItemList,findItem } from "../controllers/itemController.js";

const itemsRouter = express.Router();

itemsRouter.post('/',createItem);
itemsRouter.patch('/:id',patchItem);
itemsRouter.get('/',getItemList);
itemsRouter.get("/:id",findItem);
export default itemsRouter;