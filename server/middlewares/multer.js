import multer from "multer";

export const parserImg = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowMimeType = ["image/jpeg", "image/png"];
    cb(null, allowMimeType.includes(file.mimetype));
  },
});
