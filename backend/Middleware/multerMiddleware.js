const multer = require("multer");
const uniqid = require("uniqid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    console.log(req);
    console.log(file);
    cb(null, Date.now() + uniqid() + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
