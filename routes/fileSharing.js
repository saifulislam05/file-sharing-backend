const express = require("express");
const {
  uploadFile,
  downloadFile,
  sendDownloadableLinkOnEmail,
} = require("../controllers/fileSharing");


const router = express.Router();

router.post("/api/files", uploadFile);
router.get("/files/download/:fileId", downloadFile);
router.post("/api/files/sendmail", sendDownloadableLinkOnEmail);

module.exports = router;