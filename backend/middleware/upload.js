// //middleware/upload.js

// const multer = require("multer");
// const path = require("path");
// const fs=require("fs");

// const uploadFolder = path.join(__dirname, "../upload")

// // Make sure folder exists
// if (!fs.existsSync(uploadFolder)) {
//     fs.mkdirSync(uploadFolder, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination:(req,file,cb) =>{
//             cb(null, uploadFolder);
//     },
//     filename:(req, file, cb)=>{
//         cb(null, Date.now()+"_"+ file.originalname);
//     },
// });

// const upload = multer({storage});

// module.exports = upload;

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "png", "jpeg"]
  }
});

const upload = multer({ storage });

module.exports = upload;
