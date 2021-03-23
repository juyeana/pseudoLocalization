module.exports = function isValid(data) {
  let errors = {};
  if (
    parseInt(data.inputIdDigits) < 0 ||
    (data.inputIdDigits !== '' && !Number.isInteger(parseInt(data.inputIdDigits)))
  ) {
    errors.inputIdDigits =
      'The value should be 0 or positive number. Leaving it empty will form a 6 digit id as a default';
  }

  if (!data.inputStr) errors.inputStr = 'No input string provided';

  return errors;
};
