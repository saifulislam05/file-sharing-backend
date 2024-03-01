import express from "express";
import { downloadFile, generateLink, sendFileLinkOnEmail, uploadFile } from "../controllers/fileSharing.js";


const router = express.Router();

router.post("/api/files",uploadFile)
router.get("/files/:uuid",generateLink)
router.get("/files/download/:uuid",downloadFile)
router.post("/api/files/send",sendFileLinkOnEmail);

export default router;