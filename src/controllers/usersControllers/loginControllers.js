import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../database/model/userModel.js';

const secretKey = process.env.JWT_SECRET;

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
        id: user._id,
      },
      secretKey,
      {
        expiresIn: '1h',
      }
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getAllUsers = async (req, res) => { 
  try {
    const users = await User.find();
  
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' }); 
    }

    return res.json(users); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { loginController, getAllUsers, getUserByEmail, getUserById };
