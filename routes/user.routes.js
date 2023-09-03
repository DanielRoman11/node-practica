import express from 'express';
import { createUser, deleteUser, readUser, readUsers, updateUser } from '../controllers/user.Controller.js';

export const route = express.Router();

route.post('/create', createUser);
route.get('/read', readUser);
route.get('/read-all', readUsers);
route.get('/update', updateUser);
route.get('/delete', deleteUser) ;