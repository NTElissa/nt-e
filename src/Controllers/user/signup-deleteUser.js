// userController.js
import bcrypt from 'bcrypt';
import User from "../../database/models/userModel.js";

import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, 'yourSecretKey', { expiresIn: '1h' });
  return token;
};

const createUser = async (email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser._id);

    return { success: true, message: 'User created successfully', token };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Internal Server Error' };
  }
};

const deleteUserById = async (id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    await user.remove();

    return { success: true, message: 'User deleted successfully' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Internal Server Error' };
  }
};

export { createUser, deleteUserById };
