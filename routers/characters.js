import express from 'express';
import { getCharacter,createCharacter,deleteCharacter } from '../controllers/charactersController.js';

const charactersrouter = express.Router();

charactersrouter.get('/:id',getCharacter);
charactersrouter.post('/',createCharacter);
charactersrouter.delete('/:id',deleteCharacter);

export default charactersrouter;