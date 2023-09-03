import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { check, validationResult } from 'express-validator';

export const createUser = async(req, res) => {
  try{

    await check('username').isLength({min: 4, max: 12}).withMessage('Incorrect name length. min 4 and max 12 characters').run(req);
    await check('email').isEmail().withMessage('Not a valid email').run(req);
    await check('password').isLength({min: 4, max : 50}).
    withMessage('Password length is incorrect').run(req);

    let errors = validationResult(req);

    console.log(req.body);

    if(!errors.isEmpty()){
      return res.status(400).json(errors.array());
    }
    
    const { username, email, password } = req.body;

    const user = await User.findOne({
      where: {email}
    })

    if(user){
      return res.status(400).json({error: "Email is already in use"});
    }

    const newUser = await User.create({username, email, password});

    console.log(newUser);

    return res.status(200).json(newUser);  
} catch (error) {
    console.error(error);
    res.status(400);
  }
}
export const readUsers = async(req, res) => {
  const users = await User.findAll();

  res.json(users);
}
export const readUser = (req, res) => {
  res.send("Leyendo ususario")
}
export const updateUser = (req, res) => {
  res.send("Actualizando usuario")
}
export const deleteUser = (req, res) => {
  res.send("Borrando usuario")
}
