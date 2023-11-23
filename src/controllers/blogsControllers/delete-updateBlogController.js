
import Blog from '../../database/model/blogsModel.js';
const secretKey =process.env.JWT_SECRET;
const updateBlogController = async (req, res) => {
    const { id } = req.params;
    const { title, content ,image } = req.body;
  
    try {
      const blog = await Blog.findByIdAndUpdate(
        id,
        { title, content ,image },
        { new: true }
      ).populate('author', 'firstName lastName');
  
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
  
      res.status(200).json({
        message: 'Blog updated successfully',
        data: blog,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  const deleteBlogController = async (req, res) => {
    const { id } = req.params;
  
    try {
      const blog = await Blog.findByIdAndDelete(id);
  
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
  
      res.status(204).json({ message: 'Blog deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  

export {
    updateBlogController,
    deleteBlogController,
  };