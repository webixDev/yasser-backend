// imports
const express = require('express');
const createErrors = require('http-errors');

const userRoute = require('./routes/user.route');
const categoryRoute = require('./routes/category.route');
const blogRoute = require('./routes/blog.route');


const contactRouter = require("./routes/contact.route") 
const serviceRouter = require("./routes/service.roure") 
const blogMeRoute =  require("./routes/blogMe.route")
const Analysis = require("./routes/Analysis.route")



const cors = require('cors');
const path = require('path');


const requestIp = require('request-ip');

// constants
const app = express();

app.use(requestIp.mw());

app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'upload')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
  }));

// routes
app.get('/', (req, res) => {
    res.send('welcome Ahmed-goda');
});

app.use('/user', userRoute);
app.use('/category', categoryRoute);
app.use('/blog', blogRoute);

app.use('/api/contact',contactRouter)
app.use('/api/service',serviceRouter)
app.use('/api/BlogMe',blogMeRoute)
app.use('/api/Analysis',Analysis)

// handle wildcard route
app.use(async(req, res, next) => {
    next(createErrors.NotFound('This route does not exists!'));
});

// handle errors
app.use((err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        err.status = 400;
    }
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message || 'Internal server error'
        }
    });
});

  
// exports
module.exports = app;