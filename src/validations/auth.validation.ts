import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
  const bodySchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
    name: Joi.string().required(),
    number: Joi.string().required(),
    location: Joi.string().required(),
    nic: Joi.string().required(),
    isWhatsapp: Joi.boolean().required(),
  });

  // const paramsSchema = Joi.object({
  //   id: Joi.string().required(), // Add your params validation rules here
  // });

  const { error: bodyError } = bodySchema.validate(req.body);
  // const { error: paramsError } = paramsSchema.validate(req.params);

  if (bodyError) {
    const bodyErrorMessage = bodyError.details.map((details) => details.message).join(', ');
    return res.send({
      message: bodyErrorMessage,
      status: 400,
    });
  }

  // if (paramsError) {
  //   const paramsErrorMessage = paramsError.details.map((details) => details.message).join(', ');
  //   return res.status(400).json({ error: paramsErrorMessage });
  // }

  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const bodySchema = Joi.object({
    number: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error: bodyError } = bodySchema.validate(req.body);

  if (bodyError) {
    const bodyErrorMessage = bodyError.details.map((details) => details.message).join(', ');
    return res.send({
      message: bodyErrorMessage,
      status: 400,
    });
  }

  next();
};

export const validateUpdateUser = (req: Request, res: Response, next: NextFunction) => {
  const paramsSchema = Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  });

  const { error: paramsError } = paramsSchema.validate(req.params);

  if (paramsError) {
    const paramsErrorMessage = paramsError.details.map((details) => details.message).join(', ');
    return res.send({
      message: 'Invalid user ID',
      status: 400,
    });
  }

  next();
};

export const validateDeleteUser = (req: Request, res: Response, next: NextFunction) => {
  const paramsSchema = Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  });

  const { error: paramsError } = paramsSchema.validate(req.params);

  if (paramsError) {
    const paramsErrorMessage = paramsError.details.map((details) => details.message).join(', ');
    return res.send({
      message: 'Invalid user ID',
      status: 400,
    });
  }

  next();
};
