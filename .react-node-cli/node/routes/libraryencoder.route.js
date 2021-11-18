const express = require('express');
const libraryEncoderController = require('../controllers/libraryencoder.controller')
const route = express.Router()

route.get('/download-sonic-library-encoder',libraryEncoderController.downloadLibraryEncoder);
route.get('/sonic-library-encoder-version-history',libraryEncoderController.getLibraryEncoderVersionHistory);
module.exports = route;