
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../../database/model/userModel.js';
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.JWT_SECRET;

// Signup Controller
const signupController = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Validate required fields
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Debugging log to check if password is coming in
    console.log('Password:', password);

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user instance
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ email: newUser.email , password:newUser.password.hashedPassword,firstName:newUser.firstName,lastName:newUser.lastName }, secretKey, {
      expiresIn: '1h',
    });

    // Send response with token
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// for 2FA or confirmation purposes
const sendTokenByEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Set up email options
  const mailOptions = {
    from: 'your-email@gmail.com', // Replace with your actual email
    to: email,
    subject: '2FA Token',
    text: `Your 2FA token is: ${token}`,
  };

  // Send the email with the token
  await transporter.sendMail(mailOptions);
};

// Export the controllers for use in routes
export { signupController, sendTokenByEmail };
