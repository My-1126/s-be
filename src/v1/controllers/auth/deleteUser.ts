import { RequestHandler } from 'express';
import * as httpStatus from 'http-status';

import handleErrorMiddleware from '../../../middleware/handle-error';
import User from '../../../models/User';
import ApiError from '../../../utils/api-error';

let deleteUser: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const isUser = await User.findById(id);

    if (!isUser) {
      res.send({
        error: {
          statusCode: 404,
        },
        message: 'No user found for this user ID',
      });
    }
    const user = await User.findByIdAndDelete(id);

    res.send({
      message: `User Deleted`,
      status: 200,
      user: user,
    });
  } catch (error) {
    new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
};

deleteUser = handleErrorMiddleware(deleteUser);

export default deleteUser;
