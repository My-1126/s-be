import { RequestHandler } from 'express';
import * as httpStatus from 'http-status';

import handleErrorMiddleware from '../../../middleware/handle-error';
import User from '../../../models/User';
import ApiError from '../../../utils/api-error';

let updateUser: RequestHandler = async (req, res) => {
  let updatedColumn = '';
  let query = {};
  const { name, email, location } = req.body;
  const id = req.params.id;

  try {
    const userForUpdate = await User.findById(id);
    if (!userForUpdate) {
      res.send({
        error: {
          statusCode: 404,
        },
        message: 'No user found for this user ID',
      });
    }

    if (name) {
      query = { ...query, name };
      updatedColumn = 'Name';
    } else if (email) {
      query = { ...query, email };
      updatedColumn = 'Email';
    } else if (location) {
      query = { ...query, location };
      updatedColumn = 'Location';
    }

    const user = await User.findByIdAndUpdate(id, query, { new: true });

    res.send({
      message: `User ${updatedColumn} Updated`,
      user: user.toJSON(),
    });
  } catch (error) {
    new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
};

updateUser = handleErrorMiddleware(updateUser);

export default updateUser;
