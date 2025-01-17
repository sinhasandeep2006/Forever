import express from 'express'
import { addProduct,ListProduct ,removeProduct,SingleProduct } from '../controllers/productController.js';
import upload from '../middleware/multter.js';

const productRouter =express.Router();

productRouter.post('/add',upload,addProduct)
productRouter.post('/remove',removeProduct)
productRouter.post('/single',SingleProduct)
productRouter.get('/list',ListProduct)
export default productRouter