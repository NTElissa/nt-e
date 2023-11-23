
import User from '../../database/model/userModel.js';

const enableUser = async (req, res) => {
  const { userId } = req.body;

  try {
    if (req.user.role !== 'superAdmin') {
      return res.status(403).json({ error: 'Only superAdmin can enable users' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { isEnabled: true } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User enabled successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const disableUser = async (req, res) => {
  const { userId } = req.body;

  try {
    if (req.user.role !== 'superAdmin') {
      return res.status(403).json({ error: 'Only superAdmin can disable users' });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { isEnabled: false } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User disabled successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { enableUser, disableUser };
