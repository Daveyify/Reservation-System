const express = require('express');

/*
import productRoutes from './routes/productRoutes.js';
import { connectDB } from './modules/connection.js';
*/

const app = express();
const PORT = 3000;

app.use(express.json());

/*
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger-output.json' with { type: 'json' };

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/products', productRoutes);
*/

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});