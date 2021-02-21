const express = require('express');
const fs = require('fs');
const hash = require('hash.js');
const upload = require('../../utils/upload'); //multer file upload options

const chars = JSON.parse(
  fs.readFileSync(`${__dirname}/../../data/charMap.json`)
);

const router = express.Router();

// @route POST /api/v1/pseudo
// @desc convert input string to pseudo characters
// @access PUBLIC

router.post('/', async (req, res, next) => {
  const { inputStr, wrapperChecked, idChecked } = await req.body;

  let output = '';

  // prepend and append string to wrap altered string
  const prepend = '[||';
  const append = '||]';

  if (inputStr) {
    // iterate the input string
    // letters are altered to a pseudo characters
    // empty string and special characters remained the same
    for (const letter of inputStr) {
      output = chars[letter]
        ? output.concat(chars[letter])
        : output.concat(letter);
    }
    // only add wrapper characters when it was checked
    if (wrapperChecked) {
      output = prepend + output + append;
    }

    // add hash id when it was checked
    if (idChecked) {
      // generate hash of output result
      let hashGenerated = hash.sha256().update(output).digest('hex');

      // generate hash id based on the generated hash
      let hashId = parseInt(hashGenerated, 16) % 10 ** 5;

      output = `${hashId}_${output}`;
    }
    res.status(200).json(output);
  } else {
    res.status(400).json('No input is provided');
  }
});

// @route POST /api/v1/pseudo/customize
// @desc convert input string to pseudo characters by user's custimized input
// @access PUBLIC
router.post(
  '/customize',
  upload.single('inputJson'),
  async (req, res, next) => {
    const { inputStr, inputPrepend, inputAppend, id_digits } = await req.body;

    let importedChars = {};
    let output = '';

    // store the parsed data into a variable and then remove the file

    if (req.file.mimetype === 'application/json') {
      importedChars = JSON.parse(
        fs.readFileSync(`${__dirname}/../../data/${req.file.filename}`, 'utf8')
      );
      fs.unlink(`${__dirname}/../../data/${req.file.filename}`, (err) => {
        if (err) console.log(err);
      });
    }

    // prepend and append string to wrap altered string
    prepend = inputPrepend ? inputPrepend : '';
    append = inputAppend ? inputAppend : '';

    if (inputStr) {
      // iterate the input string
      // letters are altered to a pseudo characters
      // empty string and special characters remained the same

      for (const letter of inputStr) {
        output = importedChars[letter]
          ? output.concat(importedChars[letter])
          : output.concat(letter);
      }

      // concat prepend and append
      output = prepend + output + append;

      // add hash id - user will pass the number of digits on the id
      if (id_digits) {
        // generate hash of output result
        let hashGenerated = hash.sha256().update(output).digest('hex');

        // generate hash id 
        let hashId = parseInt(hashGenerated, 16) % 10 ** id_digits;

        output = `${hashId}_${output}`;
      }
      res.status(200).json(output);
    } else {
      res.status(400).json('No input is provided');
    }
  }
);

module.exports = router;
