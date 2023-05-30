import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import config from '../config/config';
import AuthMiddleware from '../middleware/auth';
import * as AuthValidation from '../validations/auth.validation';
import * as PropertyValidation from '../validations/property.validations';

import * as AuthController from './controllers/auth';
import * as UserController from './controllers/user';
import * as BookController from './controllers/book';
import * as PropertyController from './controllers/property';
import apiSpec from './openapi.json';

const router = Router();

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
};

router.get('/status', (req, res) => res.json({ status: 'UP' }));

router.post('/auth/login', AuthValidation.validateLogin, AuthController.login);
router.post('/auth/signup', AuthValidation.validateRegistration, AuthController.signup);
router.put('/auth/:id', AuthValidation.validateUpdateUser, AuthController.updateUser);
router.delete('/auth/:id', AuthValidation.validateDeleteUser, AuthController.deleteUser);

router.post('/user/me', [AuthMiddleware], UserController.me);
router.get('/user/all', UserController.all);

router.post('/book/add', BookController.add);
router.get('/book/all', BookController.all);
router.get('/book/search', BookController.search);

router.post('/property', PropertyValidation.validateAddProperty, PropertyController.add);
router.delete('/property/:id', PropertyValidation.validateDeleteProperty, PropertyController.deleteProperty);
router.put('/property/:id', PropertyValidation.validateUpdateProperty, PropertyController.updateProperty);

// Dev routes
if (config.isDevelopment) {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
