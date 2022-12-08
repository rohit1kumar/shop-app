# Shopping App
It's a baisc API that allows view to products and place orders. It also allows users to view their previous orders and items available for purchase, and also get orders in a given duration.\
**Deployed on [Render](https://shop-tu9t.onrender.com). Test the endpoints on [Swagger](https://shop-tu9t.onrender.com/docs)**

## Installation
1. Clone the repo
   ```sh
   git clone https://github.com/rohit1kumar/shop-app.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Create `.env` or rename `.env.example` to `.env` and add your environment variables in the file.
    ```sh
    DATABASE_NAME="shopdb"
    DATABASE_USER="postgres"
    DATABASE_PASSWORD="postgres"
    DATABASE_HOST="localhost"
    COOKIE_SECRET="cookie_secret"
    JWT_SECRET="jwt_secret"
    ```

4. Create a database with the name `shopdb` and run the migrations to add data in products table.
    ```sh
    npm run migrate
    ```

5. Run the app
    ```sh
    npm run dev
    ```

6. Base URL: `http://localhost:3000/api/v1`
