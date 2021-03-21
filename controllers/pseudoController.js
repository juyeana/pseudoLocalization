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

    // concat id + prefix + pseudo characters + suffix
    output = prefix + strArray.join('') + suffix;

    output = generateId(inputIdDigits, output) + output;

    res.status(200).json(output);
  } else {
    res.status(400).json('No input text is provided');
  }
};

/**
 * @function generateId - generate hash id
 * @param {number} val - user defined the number of digits of the id
 * @param {string} output - prefix + pseudo characters + suffix is used to generate a hash id
 * @return {number} id
 * */
const generateId = (val, output) => {
  let hashGenerated = hash.sha256().update(output).digest('hex');

  if (val) return parseInt(hashGenerated, 16) % 10 ** val;

  return parseInt(hashGenerated, 16) % 10 ** 6;
};

// exports.defaultPseudo = async (req, res, next) => {
//   const { inputStr, wrapperChecked, idChecked } = await req.body;

//   let output = '';

//   // prepend and append string to wrap altered string
//   const prepend = '[||';
//   const append = '||]';

//   if (inputStr) {
//     // iterate the input string
//     // letters are altered to a pseudo characters
//     // empty string and special characters remained the same
//     for (const letter of inputStr) {
//       output = chars[letter]
//         ? output.concat(chars[letter])
//         : output.concat(letter);
//     }
//     // only add wrapper characters when it was checked
//     if (wrapperChecked) {
//       output = prepend + output + append;
//     }

//     // add hash id when it was checked
//     if (idChecked) {
//       // generate hash of output result
//       let hashGenerated = hash.sha256().update(output).digest('hex');

//       // generate hash id based on the generated hash
//       let hashId = parseInt(hashGenerated, 16) % 10 ** 5;

//       output = `${hashId}_${output}`;
//     }
//     res.status(200).json(output);
//   } else {
//     res.status(400).json('No input tis provided');
//   }
// };

// exports.customizedPseudo = async (req, res, next) => {
//   const { inputStr, inputPrepend, inputAppend, id_digits } = await req.body;

//   let importedChars = {};
//   let output = '';

//   // store the parsed data into a variable and then remove the file

//   if (req.file && req.file.mimetype === 'application/json') {
//     try {
//       importedChars = JSON.parse(
//         fs.readFileSync(`${__dirname}/../data/${req.file.filename}`, 'utf8')
//       );
//       fs.unlink(`${__dirname}/../data/${req.file.filename}`, (err) => {
//         if (err) console.log(err);
//       });
//     } catch (err) {
//       fs.unlink(`${__dirname}/../data/${req.file.filename}`, (err) => {
//         if (err) console.log(err);
//       });
//       return res
//         .status(400)
//         .json('Something went wrong. Your json file may be corrupted');
//     }
//   }

//   // prepend and append string to wrap altered string
//   prepend = inputPrepend ? inputPrepend : '';
//   append = inputAppend ? inputAppend : '';

//   if (inputStr) {
//     // iterate the input string
//     // letters are altered to a pseudo characters
//     // empty string and special characters remained the same

//     for (const letter of inputStr) {
//       output = importedChars[letter]
//         ? output.concat(importedChars[letter])
//         : output.concat(letter);
//     }

//     // concat prepend and append
//     output = prepend + output + append;

//     // add hash id - user will pass the number of digits on the id
//     if (id_digits) {
//       // generate hash of output result
//       let hashGenerated = hash.sha256().update(output).digest('hex');

//       // generate hash id
//       let hashId = parseInt(hashGenerated, 16) % 10 ** id_digits;

//       output = `${hashId}_${output}`;
//     }
//     res.status(200).json(output);
//   } else {
//     res.status(400).json('No input is provided');
//   }
// };
