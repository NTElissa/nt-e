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

export { loginController };
