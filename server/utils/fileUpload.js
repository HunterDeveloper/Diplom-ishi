const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(file);
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    console.log(file);
    callback(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    if (
      ["png", "gif", "jpg", "mp4", "jpeg"].indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    ) {
      return callback(new Error("Wrong extension type"));
    }
    callback(null, true);
  },
});

exports.uploader = upload;
