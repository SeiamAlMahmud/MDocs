const express = require("express");
const { fileUploadController } = require("../controllers/uploadController");

const router = express.Router();


const multer = require('multer');



// Configure multer to handle file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const fileName = `${Date.now()}${ext}`;
      cb(null, fileName);
    }
  });
  
  const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10 MB file size limit




router.get("/", upload.single('file') ,fileUploadController)
module.exports = router




