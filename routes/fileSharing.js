const express = require("express");
const { uploadFile, downloadFile } = require("../controllers/fileSharing");


const router = express.Router();

router.post("/api/files", uploadFile);
router.get("/files/download/:fileId", downloadFile);

module.exports = router;