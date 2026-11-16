import express from 'express';
import cors from "cors";
import productRouter from './routes/product.routes.js';

const app = express();

app.use(cors()); // Wajib diletakkan SEBELUM route
// Middleware parsing JSON body
app.use(express.json());

// Mounting route produk
app.use('/products', productRouter);

export default app;