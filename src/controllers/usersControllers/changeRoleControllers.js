
import User from '../../database/model/userModel.js';

const updateRoleController = async (req, res) => {
  const { userId, newRole } = req.body;

  try {
    if (req.user.role !== 'superAdmin') {
      return res.status(403).json({ error: 'Only superAdmin can update roles' });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { role: newRole } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Role updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { updateRoleController };

