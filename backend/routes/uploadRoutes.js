import multer from "multer";
import fs from "fs"

import path from "path";
import express from "express";
import color from "colors";

const router = express.Router();

const fileImages = fs.existsSync("uploads");
if (!fileImages) {
  fs.mkdirSync("uploads");
}
console.log(color.red("path: " + path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// console.log(color.red(upload.fileFilter));

router.post("/", upload.single("image"), (req, res) => {
  console.log(color.red(upload));
  console.log(color.red(req.file?.path));
  res.send(`/${req.file?.path}`);
});

export default router;
