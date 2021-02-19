const express = require("express");
const fs = require("fs");
const hash = require("hash.js");
const chars = JSON.parse(
  fs.readFileSync(`${__dirname}/../../data/charMap.json`)
)

const router = express.Router();

// @route POST /api/v1/pseudo
// @desc convert input string to pseudo characters
// @access PUBLIC

router.post('/', async (req, res, next) => {


    const {inputStr, checked} = await req.body;
    
    let output=""
    
    // prepend and append string to wrap altered string
    const prepend='[||'
    const append='||]'


    if(inputStr){
    
      // iterate the input string
      // letters are altered to a pseudo characters 
      // empty string and special characters remained the same
      for(const letter of inputStr){
        
        output = chars[letter]? output.concat(chars[letter]) : output.concat(letter)
        
      }
      // only add wrapper characters when it was checked
      if(checked){
      output = prepend+output+append
    }

    // generate hash of output result
    let hashGenerated = hash.sha256().update(output).digest('hex')

    // generate hash id based on the generated hash
    let hashId = (parseInt(hashGenerated, 16) % 10**5)

    console.log(hashGenerated, hashId);
    output = `${hashId}_${output}`
    res.status(200).json(output)
  }else{
    res.status(400).json('No input is provided')
  }
})


module.exports = router
