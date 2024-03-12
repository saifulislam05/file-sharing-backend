const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const sendMailHandler = require("../utils/sendMail");

const nodemailer = require("nodemailer");

const fileSharingModel = require("../models/fileSharing");
const { log } = require("console");

const uploadPath = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const fileName = uuidv4() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
}).single("attachment");

const uploadFile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Error uploading file",
      });
    } else {
      console.log("File uploaded Successfully");
      const newFile = new fileSharingModel({
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
      });

      const newlyInsertedFile = await newFile.save();

      const downloadStr = `http://localhost:10000/files/download/${newlyInsertedFile._id}`;
      console.log(newlyInsertedFile);
      res.status(500).json({
        success: true,
        message: "File uploaded Successfully",
        fileId: newlyInsertedFile._id, //unique id from db
        downloadLink: downloadStr, //donwloadable Link
      });
    }
  });
};

const downloadFile = async (req, res) => {
  const fileId = req.params.fileId;
  console.log(req.params.fileId);

  const file = await fileSharingModel.findById(fileId);

  if (!file) {
    return res.status(404).json({
      success: false,
      message: "File does not exist or removed for the given ID",
    });
  }
  res.download(file.path);
};

const sendDownloadableLinkOnEmail = async (req, res) => {
  console.log(req.body);
  const fileId = req.body.fileId;
  const file = await fileSharingModel.findById(fileId);

  if (!file) {
    return res.status(404).json({
      success: false,
      message: "File does not exist or removed",
    });
  }

  const downloadLink = `http://localhost:10000/files/download/${fileId}`;
  const to = req.body.to;
  const subject = "File Downloadable Link";
  const text = "Hello ✔️";
  const html = `email link : ${downloadLink}`;

  sendMailHandler(to, subject, text, html,res);
};
module.exports = { uploadFile, downloadFile, sendDownloadableLinkOnEmail };
