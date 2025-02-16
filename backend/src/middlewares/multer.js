// src/middlewares/multer.js
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/temp');
  },
  filename: (req, file, cb) => {
    // You might want to customize the filename for uniqueness in production
    cb(null, file.originalname);
  }
});

export const upload = multer({ storage });
