module.exports = function isValid(data) {
  let errors = {};
  if (
    parseInt(data.inputIdDigits) < 0 ||
    (data.inputIdDigits !== '' &&
      !Number.isInteger(parseInt(data.inputIdDigits)))
  ) {
    errors.inputIdDigits = 'The value is invalid';
  }

  if (!data.inputStr) errors.inputStr = 'No input string provided';

  return errors;
};
