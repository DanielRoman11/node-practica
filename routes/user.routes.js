import express from 'express';
import { createUser, deleteUser, readUser, readUsers, updateUser } from '../controllers/user.Controller.js';

export const route = express.Router();

route.post('/create', createUser);
route.get('/read/:id', readUser);
route.get('/read-all', readUsers);
route.patch('/update/:id', updateUser);
route.get('/delete', deleteUser) ;