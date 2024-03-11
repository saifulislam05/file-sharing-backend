const express = require("express");
const {uploadFile}=require("../controllers/fileSharing")


const router = express.Router();

router.post("/", uploadFile)

module.exports = router;