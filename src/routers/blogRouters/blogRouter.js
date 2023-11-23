// blogRouter.js
import express from 'express';
import { createBlogController, getBlogController, getAllBlogsController } from '../../controllers/blogsControllers/create-getBlog.js';
import { updateBlogController, deleteBlogController } from "../../controllers/blogsControllers/delete-updateBlogController.js";
import { protect, admin, superAdmin} from "../../middleware/userMiddleware.js";

const blogRouter = express.Router();

blogRouter.post('/blogs',  protect, admin, createBlogController);
blogRouter.get('/blogs/:id',  protect, getBlogController); 
blogRouter.get('/blogs',  protect, getAllBlogsController); 
blogRouter.put('/blogs/:id',  protect, admin, updateBlogController); 
blogRouter.delete('/blogs/:id',  protect, admin, deleteBlogController); 

export default blogRouter;
