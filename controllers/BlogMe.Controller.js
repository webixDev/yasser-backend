const BlogMe = require("../models/BlogMe.model")
console.log({BlogMe}, "BlogMe");


const getAllBlog = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const totalDocuments = await BlogMe.countDocuments();

        const getAllBlog = await BlogMe.find().skip(skip).limit(limit);
        res.json({
          success: true,
          message: 'Blogs retrieved successfully',
          data: getAllBlog,
          page:page,
          limit:limit,
          skip:skip,
          totalDocuments
      });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createBlog = async (req, res) => {
  
    // const { filename, originalname, path } = req.file;
    // const { title } = req.body; // استخراج العنوان من الطلب
  
    try {
      const { img, title,desc } = req.body;
      const CreateBlog = await BlogMe.create({ img, title,desc });

      return res.status(201).json(CreateBlog);
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload image',msg:error });
    }
  };
  const OneBlog = async (req,res)=> {

    try {
      const OneBlog = await BlogMe.findById(req.params.id)
      res.json(OneBlog)
      if (!OneBlog) {
          return res.status(404).json({msg:"not found cousre your my love"})
      }
    } catch (error) {
      return res.status(400).json({msg:"invaild cousre your my love"})
    }
// const ID = +req.params.ID
// const course = Course.find((courses)=>courses.id === ID)


}

  const updateBlog = async (req, res) => {
    const { id } = req.params; // Extract the blog post ID from request parameters
    try {
        // Extract updated data from the request body
        const { img, title, desc } = req.body;

        // Perform the update operation using findByIdAndUpdate
        const updatedBlog = await BlogMe.findByIdAndUpdate(
            id, // Specify the blog post ID to update
            { img, title, desc }, // Set the updated fields
            { new: true } // Return the updated document
        );

        // Check if the blog post was found and updated successfully
        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog post not found" });
        }

        // Send the updated blog post as a response
        console.log(updatedBlog);
        res.json(updatedBlog);
    } catch (error) {
        // Handle any errors that occur during the update process
        res.status(500).json({ error: "Failed to update blog post", msg: error.message });
    }
};
  const deleteBlog = async (req, res) => {
    const { id } = req.params;
    
    try {
      const deleteBlog = await BlogMe.findByIdAndDelete(id);
      if (!deleteBlog) {
        return res.status(404).json({ error: "Partner not found" });
      }
      res.json({ message: "Partner deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete partner", msg: error.message });
    }
  };

  module.exports = {
    getAllBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    OneBlog

}

// app.post('/upload', upload.single('image'), 
