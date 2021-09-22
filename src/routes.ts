import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multerConfig';
import ProductController from './controllers/ProductController';

export const routes = Router();

const upload = multer(multerConfig).single('photo');

routes.get('/products', ProductController.index);
routes.get('/products/:name', ProductController.show);

routes.post('/products', upload, ProductController.create);
routes.put('/products/:id', upload, ProductController.update);

routes.delete('/products/:id', ProductController.delete);
