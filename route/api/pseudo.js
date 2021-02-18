const express = require("express");
const fs = require("fs");
const chars = JSON.parse(
  fs.readFileSync(`${__dirname}/../../data/charMap.json`)
)

const router = express.Router();

// @route POST /api/v1/pseudo
// @desc conver input string to pseudo characters

router.post('/', async (req, res, next) => {
  const input = await req.body.str;

  // iterate the string
  // take each character as key and get the corresponding value
  // return the new string of values
  let output=""

  if(input){

    for(const letter of input){

      output = chars[letter]? output.concat(chars[letter]) : output.concat(letter)

      console.log(letter, chars[letter])
      
    }
    console.log(output)
    res.status(200).json(output)
  }
})

module.exports = router
