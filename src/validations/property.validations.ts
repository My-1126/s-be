import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import { PropertyCategory, PropertyType } from '../models/Property';

export const validateAddProperty = (req: Request, res: Response, next: NextFunction) => {
  const bodySchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().valid('SALE', 'RENT').required(), // Replace 'Type1', 'Type2', 'Type3' with actual property types
    category: Joi.string().valid('HOUSE', 'LAND', 'COMMERTIAL', 'APARTMENT').required(), // Replace 'Category1', 'Category2', 'Category3' with actual property categories
    price: Joi.number().required(),
    contact: Joi.array()
      .items(
        Joi.object({
          number: Joi.string().required(),
          isWhatsapp: Joi.boolean().required(),
        }),
      )
      .required(),
    landType: Joi.when('category', {
      is: Joi.valid('LAND', 'COMMERTIAL', 'APARTMENT'),
      then: Joi.string().required(),
      otherwise: Joi.string(),
    }),
    landSize: Joi.when('category', {
      is: Joi.valid('LAND', 'COMMERTIAL', 'APARTMENT', 'HOUSE'),
      then: Joi.number().required(),
      otherwise: Joi.number(),
    }),
    houseSize: Joi.when('category', {
      is: Joi.valid('HOUSE'),
      then: Joi.number().required(),
      otherwise: Joi.number(),
    }),
    bedroom: Joi.when('category', {
      is: Joi.valid('HOUSE'),
      then: Joi.number().required(),
      otherwise: Joi.number(),
    }),
    bathroom: Joi.when('category', {
      is: Joi.valid('HOUSE'),
      then: Joi.number().required(),
      otherwise: Joi.number(),
    }),
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

export const validateDeleteProperty = (req: Request, res: Response, next: NextFunction) => {
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

export const validateUpdateProperty = (req: Request, res: Response, next: NextFunction) => {
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
