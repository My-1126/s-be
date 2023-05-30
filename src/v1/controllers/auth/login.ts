import { RequestHandler, CookieOptions } from 'express';
import moment from 'moment';

import handleErrorMiddleware from '../../../middleware/handle-error';
import User from '../../../models/User';
import { JWT } from '../../../services/jwt';
import config from '../../../config/config';
import { IBodyRequest } from '../../../interfaces/request';

const JWTService = new JWT(config);

type ILoginRequest = IBodyRequest<{ number: string; password: string }>;

let login: RequestHandler = async (req: ILoginRequest, res) => {
  const { number, password } = req.body;

  const user = await User.findOne({ number });

  if (!user) {
    res.send({
      message: `No user found for this number`,
      status: 401,
    });
  }

  if (!(await user.comparePassword(password))) {
    res.send({
      message: `Incorrect password`,
      status: 401,
    });
  }

  const token = await JWTService.signPayload({ id: user.id });
  const options: CookieOptions = {
    expires: moment().add(config.ACCESS_TOKEN_LIFETIME_MIN, 'minutes').toDate(),
    secure: req.secure,
    httpOnly: true,
    sameSite: 'strict',
  };
  res.cookie('Authorization', `Bearer ${token}`, options);
  res.send({ token, type: 'Bearer' });
};

login = handleErrorMiddleware(login);

export default login;
