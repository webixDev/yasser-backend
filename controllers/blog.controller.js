// imports
const express = require('express');
const createErrors = require('http-errors');
const blogService = require('../services/blog.service');
const { Blog } = require('../models/blog.model');
const utils = require('../util');
const cloudinary = require('../helpers/cloudinary.helper');

const itemsPerPage = 6;

// const createBlog = async(req, res, next) => {
//     try {
        
//         let blogBody = req.body;

//         if( req.file ) {
//             blogBody.img = req.file.path;

//             const uploadResult = await cloudinary.uploader.upload(blogBody.img, {
//                 folder: "blogs"
//             });
    
//             if( uploadResult.secure_url ) {
//                 blogBody.img = uploadResult.secure_url;
//             } else {
//                 throw createErrors.Forbidden("Opps, image upload failed! Try again.")
//             }
//         }

//         blogBody.writter = req.body.userId;

//         const savedblog = await blogService.createBlog(blogBody)
//         res.send(savedblog);

//     } catch (error) {
//         next(error);
//     }
// }
const createBlog = async (req, res) => {
  
    // const { filename, originalname, path } = req.file;
    // const { title } = req.body; // استخراج العنوان من الطلب
  
    try {
      // const { image, title } = req.body;
      const savedPartner = await Partner.create(req.body);

      return res.status(201).json(savedPartner);
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload image',msg:error });
    }
  };
const getBlogList = async(req, res, next) => {
    try {

        const bloggerId = req.params.bloggerId;
        const categoryId = req.params.categoryId;

        let searchParams = {};
        if( bloggerId && bloggerId.toLowerCase() != 'all' ) {
            searchParams.writter = bloggerId;
        }
        if( categoryId && categoryId.toLowerCase() != 'all' ) {
            searchParams.category = categoryId
        }

        let selectFields = 'posted title img';
        let perPage = itemsPerPage;
        let page = req.query.page && req.query.page > 0 ? req.query.page-1 : 0;

        
        const numBlogs = await blogService.countBlogs(searchParams);
        let blogs = await blogService.readBlogs(searchParams, selectFields, perPage, page);
        
        let totalPages = Math.ceil(numBlogs / perPage);
        let currentPage = page+1;

        res.send({
            result: blogs, 
            totalBlogs: numBlogs,
            totalPages: totalPages,
            currentPage: currentPage
        });

    } catch (error) {
        next(error);
    }
}

const getSingleBlog = async(req, res, next) => {
    try {

        let searchParams = {_id: req.params.blogId};
        let selectFields = '';
        let blog = await blogService.readBlogs(searchParams, selectFields);

        blog = blog[0];
        if( !blog ) {
            throw createErrors.NotFound('No blog found with this blog id');
        }

        res.send(blog);

    } catch (error) {
        next(error);
    }
}

const reactToBlog = async(req, res, next) => {
    try {

        let reactBody = req.body;
        const searchParams = { _id: reactBody.blogId };
        const selectFields = '';

        let blog = await blogService.readBlogs(searchParams, selectFields);
        if( blog.length == 0 ) {
            throw createErrors.NotFound('This blog does not exists');
        }

        blog = blog[0];
        const updatedBlog = await blogService.reactBlog(blog, reactBody);
        res.send(updatedBlog);

    } catch (error) {
        next(error);
    }
}

const commentToBlog = async(req, res, next) => {
    try {

        const commentBody = req.body;
        if( commentBody.body.trim().length == 0 ) {
            throw createErrors.BadRequest('Comment must not be empty!');
        }

        const searchParams = { _id: commentBody.blogId };
        const selectFields = '';

        let blog = await blogService.readBlogs(searchParams, selectFields);
        if( blog.length == 0 ) {
            throw createErrors.NotFound('This blog does not exists');
        }
        blog = blog[0];

        let updatedBlog = await blogService.postComment(blog, commentBody);
        res.send(updatedBlog);

    } catch (error) {
        next(error);
    }
}

const deleteComment = async(req, res, next) => {
    try {

        const commentBody = req.body;
        const searchParams = { _id: commentBody.blogId };
        const selectFields = '';

        let blog = await blogService.readBlogs(searchParams, selectFields);
        if( blog.length == 0 ) {
            throw createErrors.NotFound('This blog does not exists');
        }
        blog = blog[0];

        const updatedBlog = await blogService.deleteComment(blog, commentBody);
        res.send(updatedBlog);

    } catch (error) {
        next(error);
    }
}

 // exports
 module.exports = {
    createBlog,
    getBlogList,
    getSingleBlog,
    reactToBlog,
    commentToBlog,
    deleteComment
 }