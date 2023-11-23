import db from "../../database/models";
import bcrypt from "bcrypt";


// Read all users
const getAllUsers = async () => {
    try {
      const users = await User.findAll();
      return { success: true, data: users };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Internal Server Error" };
    }
  };


  


// Update user by ID
const updateUserById = async (id, email, password) => {
    try {
      const user = await User.findByPk(id);
  
      if (!user) {
        return { success: false, message: "User not found" };
      }
  
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      user.email = email;
      user.password = hashedPassword;
  
      await user.save();
  
      return { success: true, data: user };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Internal Server Error" };
    }
  };
  
  export {getAllUsers, updateUserById}