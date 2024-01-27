import express from 'express';
import asyncHandler from 'express-async-handler';
import {
   createPostHandler,
   deletePostHandler,
   getAllPostsHandler,
   getSinglePostHandler,
   updatePostHandler,
   updatePostImage,
} from '../handler/post.handler';
import { verifyToken } from '../middelwares/verifyToken';
import { photoUpload } from '../middelwares/photoUpload';

export const postRouter = express.Router();

postRouter
   .route('/')
   .post(verifyToken, photoUpload.single('image'), asyncHandler(createPostHandler))
   .get(asyncHandler(getAllPostsHandler));

postRouter
   .route('/:id')
   .get(asyncHandler(getSinglePostHandler))
   .delete(verifyToken, asyncHandler(deletePostHandler))
   .put(verifyToken, asyncHandler(updatePostHandler));

postRouter
   .route('/update-image/:id')
   .put(verifyToken, photoUpload.single('image'), asyncHandler(updatePostImage));
