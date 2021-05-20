const fs = require("fs/promises");
const Exceptions = require("../utils/custom_exceptions");

module.exports = async function (err, req, res, next) {
  let statusCode = 500;
  let message = "Server error";
  let name = "SERVER_ERROR";
  let errors = [];

  await removeFilesIfExists(req.file, req.files);
  console.log(err);

  if (err instanceof Exceptions.HttpError) {
    if (err instanceof Exceptions.ValidationError) {
      errors = err.errors;
    }
    statusCode = err.statusCode;
    message = err.message;
    name = err.name;
  }

  res.status(statusCode).send({ message, name, errors });
};

async function removeFilesIfExists(file, files) {
  if (!file && !files) return;

  if (file) {
    await removeSingleFile(file.path);
    return;
  }

  const all_files = [];

  for (let prop in files) {
    if (Array.isArray(files[prop])) {
      files[prop].forEach((file) => {
        all_files.push(file.path);
      });
    } else {
      all_files.push(files[prop].path);
    }
  }

  for (let i = 0; i < all_files.length; i++) {
    await removeSingleFile(all_files[i]);
  }
}

async function removeSingleFile(fileName) {
  try {
    await fs.unlink(fileName);
  } catch (err) {}
}
