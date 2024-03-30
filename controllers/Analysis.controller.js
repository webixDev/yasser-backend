const Analysis = require("../models/Analysis.model");
const requestIp = require('request-ip');
const geoip = require('geoip-lite');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const visitorIp = async (req, res) => {
    try {
        const ip = requestIp.getClientIp(req);
        const geo = geoip.lookup(ip);
        const country = geo ? geo.country : 'Unknown';

        console.log(`IP Address: ${ip}, Country: ${country}`);

        const newVisitorData = await Analysis.create({ ip, country });
       return newVisitorData
    } catch (error) {
        console.error('Error saving visitor IP:', error);
        res.status(500).send('خطأ في حفظ عنوان الآي بي للزائر');
    }
};
const getvisitorIp = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
     
        const totalDocuments = await Analysis.countDocuments();

        // استخراج جميع الوثائق الموجودة
        const allVisitorData = await Analysis.find().skip(skip).limit(limit);
        // إرجاع العناوين والدول لكل وثيقة مع معرف الوثيقة
        const visitorInfo = allVisitorData.map(data => ({ _id: data._id, ip: data.ip, country: data.country }));

        res.send({visitorInfo,page:page,
            limit:limit,
            skip:skip,
            totalDocuments});
    } catch (error) {
        console.error('Error saving visitor IP:', error);
        res.status(500).send('خطأ في حفظ عنوان الآي بي للزائر');
    }
};

const deleteVisitorById = async (req, res) => {
    const { id } = req.params; // Corrected variable declaration
    
    try {
        const deleteVisit = await Analysis.findByIdAndDelete(id);
        if (!deleteVisit) {
            return res.status(404).json({ error: "Visitor not found" });
        }
        res.json({ message: "Visitor deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete visitor", msg: error.message });
    }
};



module.exports = {
    visitorIp,
    deleteVisitorById,
    getvisitorIp
};

