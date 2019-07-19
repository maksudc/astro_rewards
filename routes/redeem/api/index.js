var express = require('express');
var router = express.Router();

const CreateRouter = require("./create");
router.use("/create", CreateRouter);

const SearchRouter = require("./search");
router.use("/search", SearchRouter);

const UpdateRouter = require("./update");
router.use("/update", UpdateRouter);

module.exports = router;
