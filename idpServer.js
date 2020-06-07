if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const authRouter = require('./src/routes/auth')
const itemsRouter = require('./src/routes/items')

const port = process.env.PORT || "4200";

const app = express()

app.use(express.json())
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`IDP Server listening to requests on http://localhost:${port}...`);
});