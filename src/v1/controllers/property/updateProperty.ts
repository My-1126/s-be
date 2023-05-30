import { RequestHandler } from 'express';

import handleErrorMiddleware from '../../../middleware/handle-error';
import Property from '../../../models/Property';
import House from '../../../models/House';
import Land from '../../../models/Land';
import Apartment from '../../../models/Apartment';
import Commercial from '../../../models/Commercial';

let updateProperty: RequestHandler = async (req, res) => {
  const { title, description, type, category, price, contact } = req.body;
  const id = req.params.id;
  let additionalInfoId = req.body.additionalInfoId;

  const property = await Property.findById(id);
  if (!property) {
    res.send({
      message: `Property not found`,
      status: 404,
    });
    return; // Exit the function if the property is not found
  }
  if (property.category !== category) {
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
    if (property.category === 'HOUSE') {
      await House.findByIdAndDelete(req.body.additionalInfoId);
    } else if (property.category === 'LAND') {
      await Land.findByIdAndDelete(req.body.additionalInfoId);
    } else if (property.category === 'APARTMENT') {
      await Apartment.findOneAndDelete(req.body.additionalInfoId);
    } else if (property.category === 'COMMERCIAL') {
      await Commercial.findOneAndDelete(req.body.additionalInfoId);
    } else {
      res.send({
        message: `Invalid Category`,
        status: 400,
      });
    }
  } else {
    if (category === 'HOUSE') {
      const { bedroom, bathroom, landSize, homeSize } = req.body;
      const updatedFields = {
        ...(bedroom && { bedroom }),
        ...(bathroom && { bathroom }),
        ...(landSize && { landSize }),
        ...(homeSize && { homeSize }),
      };
      const house = await House.findByIdAndUpdate(additionalInfoId, updatedFields, { new: true });
    } else if (category === 'LAND') {
      const { landType, landSize } = req.body;
      const updatedFields = {
        ...(landType && { landType }),
        ...(landSize && { landSize }),
      };
      const land = await Land.findByIdAndUpdate(additionalInfoId, updatedFields, { new: true });
    } else if (category === 'APARTMENT') {
      const { landType, landSize } = req.body;
      const updatedFields = {
        ...(landType && { landType }),
        ...(landSize && { landSize }),
      };
      const apartment = await Apartment.findByIdAndUpdate(additionalInfoId, updatedFields, { new: true });
    } else if (category === 'COMMERCIAL') {
      const { landType, landSize } = req.body;
      const updatedFields = {
        ...(landType && { landType }),
        ...(landSize && { landSize }),
      };
      const commercial = await Commercial.findByIdAndUpdate(additionalInfoId, updatedFields, { new: true });
      console.log(commercial);
    } else {
      res.send({
        message: `Invalid Category`,
        status: 400,
      });
      return; // Exit the function early if the category is invalid
    }
  }
  try {
    const updatedFields = {
      ...(title && { title }),
      ...(description && { description }),
      ...(type && { type }),
      ...(category && { category }),
      ...(price && { price }),
      ...(contact && { contact }),
      ...(additionalInfoId && { additionalInfoId }),
    };

    const property = await Property.findByIdAndUpdate(id, updatedFields, { new: true });
    res.send({
      message: `Updated`,
      property: property.toJSON(),
    });
  } catch (error) {
    res.send({
      message: `Error updating property`,
      status: 500,
      error: error.message,
    });
  }
};

updateProperty = handleErrorMiddleware(updateProperty);

export default updateProperty;
