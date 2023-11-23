import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../model/userModel.js';

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Database connected successfully.');

    await User.deleteMany();

    const users = [
      {
        email: 'superadmin@gmail.com',
        password: await bcrypt.hash('Test@12345', 10),
        firstName: 'Super',
        lastName: 'Admin',
        role: 'superAdmin',
      },
    ];

    await User.insertMany(users);
    console.log('Users seeded successfully.');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedUsers();
