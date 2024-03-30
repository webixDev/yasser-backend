const Service = require("../models/service.model");

console.log(Service);


const getAllService = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
    try {
        const service = await Service.find().skip(skip).limit(limit);
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getSingleService = async (req,res)=> {
          try {
            const service = await Service.findById(req.params.ID)
            res.json(service)

            if (!service) {
                return res.status(404).json({msg:"not found cousre your my love"})
            }
          } catch (error) {
            return res.status(400).json({msg:"invaild cousre your my love"})
          }
    // const ID = +req.params.ID
    // const course = Course.find((courses)=>courses.id === ID)

}
const createService = async (req,res)=> {

     const newService = new Service(req.body)
     await  newService.save()
    res.status(201).json(newService)

}
const updateService = async (req,res)=> {
      const ID = req.params.ID
      try {
        // const updateCourse = await Course.findByIdAndUpdate(ID,{$set:{...req.body}});
        const updateService = await Service.findByIdAndUpdate({_id:ID},{$set:{...req.body}});

        return  res.status(200).json(updateService)
      } catch (error) {
       return res.status(404).json({msg:error})

      }
    }
    const deleteService = async(req,res) => {
        // const ID = +req.params.ID
        // Course = Course.filter((course)=> Course.id !== ID)
        const deleteService = await Service.deleteOne({_id:req.params.ID})
      res.status(200).json({secuss:true,msg:"this is deleted",service:deleteService})
    }
    
module.exports = {
    getAllService,
    getSingleService,
    createService,
    updateService,
    deleteService
}