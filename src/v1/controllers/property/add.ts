import { RequestHandler } from 'express';

import handleErrorMiddleware from '../../../middleware/handle-error';
import Property from '../../../models/Property';
import House from '../../../models/House';
import Land from '../../../models/Land';
import Apartment from '../../../models/Apartment';
import Commercial from '../../../models/Commercial';

let add: RequestHandler = async (req, res) => {
  const { title, description, type, category, price, contact } = req.body;
  let additionalInfoId = null;

  if (category === 'HOUSE') {
    const { bedroom, bathroom, landSize, homeSize } = req.body;
    const house = new House({ bedroom, bathroom, landSize, homeSize });
    await house.save();
    additionalInfoId = house._id;
  } else if (category === 'LAND') {
    const { landType, landSize } = req.body;
    const land = new Land({ landType, landSize });
    await land.save();
    additionalInfoId = land._id;
  } else if (category === 'APARTMENT') {
    const { landType, landSize } = req.body;
    const apartment = new Apartment({ landType, landSize });
    await apartment.save();
    additionalInfoId = apartment._id;
  } else if (category === 'COMMERCIAL') {
    const { landType, landSize } = req.body;
    const commercial = new Commercial({ landType, landSize });
    await commercial.save();
    additionalInfoId = commercial._id;
  } else {
    res.send({
      message: `Invalid Category`,
      status: 400,
    });
  }

  const property = new Property({ title, description, type, category, price, contact, additionalInfoId });
  await property.save();

  res.send({
    message: `Saved`,
    book: property.toJSON(),
  });
};

add = handleErrorMiddleware(add);

export default add;
