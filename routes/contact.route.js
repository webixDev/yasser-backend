const express = require("express")
const  router = express.Router();
const {verifyAccessToken} = require('../helpers/jwt.helper');

const contactController = require("../controllers/contact.controllers")

// get All Courses
router.get('/',contactController.getAllContact)


// router.route("./")
//          .get(coursesController.getAllCourses)
//          .post(coursesController.createCourse)


//  GEt one Courses
 router.get('/:ID',contactController.getSingleContact);

//create course 
router.post('/',contactController.createContact)

// update 
router.patch('/:ID',verifyAccessToken,contactController.updateContact)

//del 
router.delete('/:ID',verifyAccessToken,contactController.deleteContact)

module.exports = router ;