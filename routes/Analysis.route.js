const express = require("express")
const  router = express.Router();

const AnalysisController = require("../controllers/Analysis.controller")



router.get('/ip',AnalysisController.visitorIp),
router.get('/getips',AnalysisController.getvisitorIp),


router.delete('/ip/:id', AnalysisController.deleteVisitorById);




module.exports = router ;