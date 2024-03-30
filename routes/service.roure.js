const express = require("express")
const  router = express.Router();
const {verifyAccessToken} = require('../helpers/jwt.helper');

const ServiceController = require("../controllers/service.controller")

// get All Courses
router.get('/',ServiceController.getAllService)


// router.route("./")
//          .get(coursesController.getAllCourses)
//          .post(coursesController.createCourse)


//  GEt one Courses
 router.get('/:ID',verifyAccessToken,ServiceController.getSingleService);

//create course 
router.post('/',verifyAccessToken,ServiceController.createService)

// update 
router.patch('/:ID',verifyAccessToken,ServiceController.updateService)

//del 
router.delete('/:ID',verifyAccessToken,ServiceController.deleteService)

module.exports = router ;