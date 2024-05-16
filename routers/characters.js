import express from 'express';
import { getCharacter,createCharacter,deleteCharacter } from '../controllers/charactersController.js';

const characterRouter = express.Router();

characterRouter.get('/:id',getCharacter);
characterRouter.post('/',createCharacter);
characterRouter.delete('/:id',deleteCharacter);

export default characterRouter;