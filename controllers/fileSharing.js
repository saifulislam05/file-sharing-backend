const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const fileSharingModel =require("../models/fileSharing");
const { log } = require("console");

const uploadPath = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => {
        const fileName = uuidv4() + path.extname(file.originalname);
        cb(null, fileName);
    }
})

const upload = multer({
    storage: storage
}).single("attachment")

const uploadFile = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            res.status(500).json({
                success: false,
                message:"Error uploading file"
            })
        }
        else {
            console.log("File uploaded Successfully");
            const newFile = new fileSharingModel({
                filename: req.file.filename,
                path: req.file.path,
                size:req.file.size,
            });

            const newlyInsertedFile= await newFile.save();

            console.log(newlyInsertedFile);
            res.status(500).json({
              success: true,
                message: "File uploaded Successfully",
              fileId:newlyInsertedFile._id, //unique id from db
            });
        }
    })
    
    
    
}

module.exports = { uploadFile };