import multer from "multer";

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop();
    const fileName = `${uniqueSuffix}.${fileExtension}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowMimeType = ["image/jpeg", "image/png"];
  if (allowMimeType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const parserImg = multer({
  storage,
  limit: {
    fileSize: 1024 * 1024,
  },
  fileFilter,
});
