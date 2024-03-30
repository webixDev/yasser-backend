const express = require("express")
const  router = express.Router();

const { v4: uuidv4} = require('uuid')
const multer = require('multer');
const {verifyAccessToken} = require('../helpers/jwt.helper');

// import authController from "../controllers/authController"
const BlogController = require("../controllers/BlogMe.Controller")

const multerStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"upload");
    },
    filename: function (req,file,cb) {
        const ext =file.mimetype.split("/")[1];
        const filename = `Blog-${uuidv4()}-${Date.now()}.${ext}`;
        cb(null,`${filename}`);
        req.body.img = filename;

    }
})
const upload = multer({ storage: multerStorage }); // تحديد مسار حفظ الملفات

// get All Courses
router.get('/',BlogController.getAllBlog)


router.get('/:id',BlogController.OneBlog)

//create course 
router.post('/',verifyAccessToken,upload.single('img'), BlogController.createBlog)
//update course 
router.put("/:id",verifyAccessToken,upload.single('img'), BlogController.updateBlog);
//del course 
router.delete("/:id",verifyAccessToken, BlogController.deleteBlog);



module.exports = router ;