const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs/promises");
const Exceptions = require("../../utils/custom_exceptions");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    // const filename = uuidv4() + "-" + file.originalname;
    cb(null, file.originalname);
  },
});

const fileFilter = async (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    await removeFileFromUploadDirIfExists(file.originalname);
    cb(null, true);
  } else {
    cb(
      new Exceptions.ValidationError(file.mimetype + " is not supported .."),
      false
    );
  }
};

const uploads = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});

module.exports = uploads;

async function removeFileFromUploadDirIfExists(filename) {
  try {
    await fs.unlink("uploads/" + filename);
  } catch (err) {
    //
  }
}
