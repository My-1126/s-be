import { RequestHandler } from 'express';
import * as httpStatus from 'http-status';

import handleErrorMiddleware from '../../../middleware/handle-error';
import Property from '../../../models/Property';
import Land from '../../../models/Land';
import House from '../../../models/House';
import Apartment from '../../../models/Apartment';
import Commercial from '../../../models/Commercial';
import ApiError from '../../../utils/api-error';

let deleteProperty: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const isProperty = await Property.findById(id);

    if (!isProperty) {
      res.send({
        error: {
          statusCode: 404,
        },
        message: 'No property found for this user ID',
      });
    }
    const property = await Property.findByIdAndDelete(id);

    if (property.category === 'HOUSE') {
      const house = await House.findByIdAndDelete(property.additionalInfoId);
    } else if (property.category === 'LAND') {
      const land = await Land.findByIdAndDelete(property.additionalInfoId);
    } else if (property.category === 'APARTMENT') {
      const apartment = await Apartment.findByIdAndDelete(property.additionalInfoId);
    } else if (property.category === 'COMMERCIAL') {
      const commercial = await Commercial.findByIdAndDelete(property.additionalInfoId);
    } else {
      res.send({
        message: `Invalid Category`,
        status: 400,
      });
    }
    res.send({
      message: `Property Deleted`,
      status: 200,
      user: property,
    });
  } catch (error) {
    new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
};

deleteProperty = handleErrorMiddleware(deleteProperty);

export default deleteProperty;
