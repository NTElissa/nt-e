import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../database/model/userModel.js';

// Secret key for JWT (replace with a strong and secure secret)
const secretKey =process.env.JWT_SECRET;

const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { email, password, confirmPassword, firstName, lastName, image, role, location, age, gender } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user fields
    user.email = email || user.email;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.image = image || user.image;
    user.role = role || user.role;
    user.location = location || user.location;
    user.age = age || user.age;
    user.gender = gender || user.gender;
    if (password && confirmPassword && password === confirmPassword) {
      user.password = await bcrypt.hash(password, 10);
    } else if (password || confirmPassword) {
      return res.status(400).json({ error: 'Password and confirm password must match' });
    }
    await user.save();

    res.json({ message: 'User updated successfully', data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteUserController = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
export { updateUserController, deleteUserController };
