import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../database/model/userModel.js';
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.JWT_SECRET;

const signupController = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await newUser.save();
    const token = jwt.sign({ email: newUser.email }, secretKey, {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const sendTokenByEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: '2FA Token',
    text: `Your 2FA token is: ${token}`,
  };

  await transporter.sendMail(mailOptions);
};

export { signupController, sendTokenByEmail };
 