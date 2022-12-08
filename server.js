require('dotenv').config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./swagger.yaml');

const { sequelize } = require('./db');
const { notFound, error } = require('./middlewares/error');

// router
const customerRouter = require('./routes/customer');
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');

// Security Middleware
app.use(cors());
app.use(helmet());
// app.use(rateLimit({
//     windowMs: 30 * 60 * 1000, // 30 minutes
//     max: 4 // limit each IP to 4 requests per windowMs
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('<p>Welcome To ShoppingApp API<br>Visit <a href="/docs">/docs</a> For The API Documentation</p>');
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/', customerRouter);
app.use('/api/v1/', productRouter);
app.use('/api/v1/', orderRouter);

// Error Handling Middleware
app.use(error); // 500
app.use(notFound); // 404

const port = process.env.PORT || 3000;
// const data = require('./product.json');
// const Product = require('./models/product');

const startServer = async () => {
    try {
        // await sequelize.sync({ force: true }); // force: true will drop the table if it already exists

        await sequelize.sync();
        await sequelize.authenticate();

        // await Product.bulkCreate(data);
        console.log('Database connected successfully');
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

startServer();