const express = require("express");
const fs = require("fs");
const chars = JSON.parse(
  fs.readFileSync(`${__dirname}/../../data/charMap.json`)
)

const router = express.Router();

// @route POST /api/v1/pseudo
// @desc convert input string to pseudo characters
// @access PUBLIC

router.post('/', async (req, res, next) => {
  const {inputStr, checked} = await req.body;


  // iterate the string
  // take each character as key and get the corresponding value
  // return the new string of values
  let output=""
  const prepend='[||'
 const append='||]'
  if(inputStr){

    for(const letter of inputStr){

      output = chars[letter]? output.concat(chars[letter]) : output.concat(letter)
      
    }

    if(checked){
      output = prepend+output+append
    }
    res.status(200).json(output)
  }
})

module.exports = router
