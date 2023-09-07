import { User } from '../models/User.js';
import { check, validationResult } from 'express-validator';

export const createUser = async(req, res) => {
  try{
    await check('username').isLength({min: 4, max: 12}).withMessage('Incorrect name length').run(req);
    await check('email').isEmail().withMessage('Not a valid email').custom(async value =>{
      const { email } = req.body;

      const user = await User.findOne({where: {email}});
      if(user){
        throw new Error('E-mail already in use');
      }
    }).run(req);
    await check('password').isLength({min: 4, max : 50}).
    withMessage('Password length is incorrect').run(req);

    let errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(400).json(errors.array());
    }
    
    const { username, email, password } = req.body;

    const newUser = await User.create({ username, email, password });

    console.log(newUser);

    return res.status(200).json(newUser);  
} catch (error) {
    console.error(error);
  }
}
export const readUsers = async(req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
  }
}

export const readUser = async(req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findOne({where: {id}})

    if(!user){
      return res.status(400).json({msg: 'User not found'})
      // throw new Error('User not found');
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
}
export const updateUser = async(req, res) => {
  try {
    await check('email').isEmail().withMessage('This is not an email').custom(async value => {
      const { email } = req.body;
      const { id } = req.params

      const user = await User.findOne({where: { id }});
      const othersEmail = await User.findOne({where: { email }});

      if (user && othersEmail !== null && user.email !== othersEmail.email ) {
        throw new Error('This email is from another account');
      }
    } ).run(req)
    await check('username').isLength({min: 4, max: 12}).withMessage('Incorrect name length').run(req);
    await check('password').isLength({min: 4, max : 50}).
    withMessage('Password length is incorrect').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { id } = req.params;
    const { username, email, password } = req.body;

    const user = await User.findOne({where: { id }});

    if (!user) {
      return res.status(400).json({error: 'User does not exists'});
    }

    await user.update({
      username: username ? username : this.username,
      email: email ? email : this.email,
      password: password ? password : this.password
    });

    user.save();

    return res.status(200).json(user);

  } catch (error) {
    console.error(error);
  }
}
export const deleteUser = async(req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({where: { id }});
    if (!user) {
      return res.status(400).json({error: 'User does not exists'});
    }

    await user.destroy();

    return res.status(204);
    
  } catch (error) {
    console.error(error);
  }
}
