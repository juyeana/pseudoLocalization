const express = require('express');
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
router.post('/', pseudoController.defaultPseudo);

// @route POST /api/v1/pseudo/customize
// @desc convert input string to pseudo characters by user's custimized input
// @access PUBLIC
router.post('/customize', pseudoController.customizedPseudo);

module.exports = router;
