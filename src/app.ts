import express from 'express';
import productRouter from './routes/product.routes.js';

const app = express();

// Middleware parsing JSON body
app.use(express.json());

// Mounting route produk
app.use('/products', productRouter);

export default app;