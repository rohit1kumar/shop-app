require('dotenv').config();

const express = require('express');
const app = express();
const { sequelize } = require('./db');
const cookieParser = require('cookie-parser');


// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const YAML = require('yamljs');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = YAML.load('./swagger.yaml');

// const { errorMiddleware } = require('./middleware/Error');
// const { notFound } = require('./utils/notFound');
// const { connectDB } = require('./config/db');

// router
const customerRouter = require('./routes/customer');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');

// security middleware
// app.use(cors());
// app.use(helmet());
// app.use(rateLimit({
//     windowMs: 10 * 60 * 1000, // 10 minutes
//     max: 20 // limit each IP to 20 requests per windowMs
// }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('<p>Welcome to Pet API<br>Visit <a href="/docs">/docs</a> to see the API documentation</p>');
});
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/', customerRouter);
app.use('/api/v1/', productRouter);
app.use('/api/v1/', cartRouter);

// loading error handler middleware
// app.use(notFound);
// app.use(errorMiddleware);


const port = process.env.PORT || 3000;
// const data = require('./product.json');
// const Product = require('./models/product');

const startServer = async () => {
    try {
        await sequelize.sync({ force: true}); // force: true will drop the table if it already exists

        // await sequelize.sync();
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