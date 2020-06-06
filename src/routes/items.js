const express = require("express")
const router = express.Router();
const ItemsDB = require('../data/itemsDB')
const authTokenMW = require('../middlewares/authTokenMW')

router.get("/items", authTokenMW, (req, res, next) => {
    res.json(ItemsDB.items);
});



module.exports = router;