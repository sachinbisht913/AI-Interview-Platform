const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {

    getHistory,

    report

} = require("../controllers/historyController");

router.get(

    "/",

    verifyToken,

    getHistory

);
router.get(

    "/report/:id",

    verifyToken,

    report

);

module.exports = router;