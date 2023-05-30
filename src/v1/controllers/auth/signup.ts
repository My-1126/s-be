import { RequestHandler } from 'express';
import * as httpStatus from 'http-status';

import handleErrorMiddleware from '../../../middleware/handle-error';
import User, { IUser } from '../../../models/User';
import { IBodyRequest } from '../../../interfaces/request';
import { Email } from '../../../services/email';
import config from '../../../config/config';
import ApiError from '../../../utils/api-error';

const emailService = new Email(config);

type ISignupRequest = IBodyRequest<IUser>;

let signup: RequestHandler = async (req: ISignupRequest, res) => {
  const { email, password, role, name, number, location, nic } = req.body;
  console.log(req.body);
  try {
    const user = new User({ email, password, role, name, number, location, nic });
    await user.save();

    res.send({
      message: `User Created`,
      user: user.toJSON(),
    });
  } catch (error) {
    new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
};

signup = handleErrorMiddleware(signup);

export default signup;
