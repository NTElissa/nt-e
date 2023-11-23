
import Blog from '../../database/model/blogsModel.js';

const createBlogController = async (req, res) => {
  const { title, content, image } = req.body;
  // const { userId } = req.user; 

 
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const newBlog = await Blog.create({
      title,
      content,
      image,
      // author: userId,
    });

    res.status(201).json({
      message: 'Blog created successfully',
      data: newBlog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getBlogController = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id).populate('author', 'firstName lastName');

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json({
      message: 'Blog retrieved successfully',
      data: blog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getAllBlogsController = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'firstName lastName');

    res.status(200).json({
      message: 'All blogs retrieved successfully',
      data: blogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export { createBlogController, getBlogController, getAllBlogsController };
