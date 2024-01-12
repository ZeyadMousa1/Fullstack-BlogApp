import express from 'express';
import asyncHandler from 'express-async-handler';
import {
   getAllUsersHandler,
   getUserHandler,
   getUsersCountHandler,
   updateUserProfileHandler,
} from '../handler/users.handler';
import {
   authMiddelware,
   authMiddelwareAndIsAdminRole,
   authMiddelwareAndOnlyUsers,
   isAdminRole,
} from '../middelwares/authMiddelware';

export const userRouter = express.Router();

userRouter.route('/profile').get(authMiddelwareAndIsAdminRole, asyncHandler(getAllUsersHandler));

userRouter.route('/count').get(authMiddelwareAndIsAdminRole, asyncHandler(getUsersCountHandler));

userRouter
   .route('/profile/:id')
   .get(authMiddelware, asyncHandler(getUserHandler))
   .put(authMiddelwareAndOnlyUsers, asyncHandler(updateUserProfileHandler));
