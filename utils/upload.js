const multer = require('multer');

module.exports = upload = multer({
  dest: './data',
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/json') cb(null, true);
    else {
      cb(null, false);
      return cb(new Error('Invalid file format! Only json file is supported'));
    }
  },
});