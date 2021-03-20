const express = require('express');
const upload = require('../../utils/upload'); //multer file upload options

const pseudoController = require('../../controllers/pseudoController')

// const fs = require('fs');
// const hash = require('hash.js');
// const upload = require('../../utils/upload'); //multer file upload options

// const chars = JSON.parse(
//   fs.readFileSync(`${__dirname}/../../data/charMap.json`)
// );

const router = express.Router();

// @route POST /api/v1/pseudo
// @desc convert input string to pseudo characters with default setting
// @access PUBLIC
router.post('/', upload.single('inputJson'), pseudoController.pseudo);


// @route POST /api/v1/pseudo/customize
// @desc convert input string to pseudo characters by user's custimized input
// @access PUBLIC
// router.post('/customize', upload.single('inputJson'), pseudoController.customizedPseudo);

module.exports = router;
