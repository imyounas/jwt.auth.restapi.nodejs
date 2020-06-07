if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const tokenAuthService = require('./src/services/tokenAuthService')

const itemsRouter = require('./src/routes/items')

const adminRouter = require('./src/routes/admin')
const errorRoutes = require('./src/routes/error');

const port = process.env.PORT || "3200";

const app = express()

app.use(express.json())

app.use("/", itemsRouter);

app.use(errorRoutes.get404);

app.listen(port, () => {
  console.log(`App Server listening to requests on http://localhost:${port}...`);
});