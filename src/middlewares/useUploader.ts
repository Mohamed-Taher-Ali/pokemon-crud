import multer from "multer";
import path from "path";

const { UPLOAD_PATH: uploadPath, UPLOAD_MASK: mask } = process.env;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    let result = "";

    for (let i = 15; i > 0; --i)
      result += mask[Math.floor(Math.random() * mask.length)];

    let id = result + Date.now() + path.extname(file.originalname);
    cb(null, id);
  },
});

export const useUploader = multer({ storage: storage });
