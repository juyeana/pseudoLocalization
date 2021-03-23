const multer = require('multer');

module.exports = upload = multer({
  dest: './data',
  fileFilter: (req, file, cb) => {
    console.log(file)
    if (file.mimetype === 'application/json') cb(null, true);
    else {
      cb(null, false);
      cb(new Error('Invalid file format! Only json file is supported'));
    }
  },
});