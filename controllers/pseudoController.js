const fs = require('fs');
const hash = require('hash.js');

const chars = JSON.parse(fs.readFileSync(`${__dirname}/../data/charMap.json`));

/**
 * @controller pseudo
 * @param {string} inputStr - user input string to be pseudo localized
 * @param {string} inputPrefix - delimiter, default value is '_['
 * @param {string} inputSuffix - delimiter, default value is ']'
 * @param {number} inputIdDigits - a number of digits of the id.
 * @returns {string} - concatenated id + prefix + pseudo characters + suffix
 * */
exports.pseudo = async (req, res, next) => {
  const { inputStr, inputPrefix, inputSuffix, inputIdDigits } = await req.body;

  console.log(inputIdDigits);
  let prefix, suffix;

  let receivedChars = {};
  let output = '';

  // store the parsed data (json file received from user) into a variable and then remove the file

  if (req.file && req.file.mimetype === 'application/json') {
    try {
      receivedChars = JSON.parse(
        fs.readFileSync(`${__dirname}/../data/${req.file.filename}`, 'utf8')
      );
      fs.unlink(`${__dirname}/../data/${req.file.filename}`, (err) => {
        if (err) console.log(err);
      });
    } catch (err) {
      fs.unlink(`${__dirname}/../data/${req.file.filename}`, (err) => {
        if (err) console.log(err);
      });
      return res
        .status(400)
        .json('Something went wrong. Your json file may be corrupted');
    }
  } else {
    receivedChars = chars;
  }

  // check if inputIdDigits is valide

  if (
    parseInt(inputIdDigits) < 0 ||
    inputIdDigits!== '' && !Number.isInteger(parseInt(inputIdDigits)) 
  ) {
    return res
      .status(400)
      .json('The input value should be 0 or positive number');
  }

  // if user didn't provide special character sets, use default.

  prefix = inputPrefix ? inputPrefix : '_[[';
  suffix = inputSuffix ? inputSuffix : ']]';

  if (inputStr) {
    // iterate each character in the input string
    // letters are altered to a pseudo characters
    // empty space and special characters remained the same
    // empty string will through an error
    let strArray = [];
    for (const letter of inputStr) {
      strArray.push(receivedChars[letter] ? receivedChars[letter] : letter);
    }
    0;

    // concat id + prefix + pseudo characters + suffix
    output = prefix + strArray.join('') + suffix;

    output = generateId(inputIdDigits, inputStr) + output;

    res.status(200).json(output);
  } else {
    res.status(400).json('No input text is provided');
  }
};

/**
 * @function generateId - generate hash id
 * @param {number} val - user defined the number of digits of the id
 * @param {string} str - prefix + inputStr + suffix is used to generate a hash id
 * @return {number} id
 * */
const generateId = (val, str) => {
  let hashGenerated = hash.sha256().update(str).digest('hex');

  if (val === '0') return '';
  else if (val > 0) return parseInt(hashGenerated, 16) % 10 ** val;
  else return parseInt(hashGenerated, 16) % 10 ** 6;
};
