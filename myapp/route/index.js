const express = require('express');
const router = express.Router();

const article = require('./article');
const diary = require('./diary');
const friend = require('./friend');
const user = require('./user');
const message = require('./message');
const comment = require('./comment');

const login = require('./login');
const upload = require('./upload');


router.use( '/article', article );
router.use( '/diary', diary );
router.use( '/friend', friend );
router.use( '/user', user );
router.use( '/message', message );
router.use( '/comment', comment );

router.use( '/login', login );
router.use( '/upload', upload );


module.exports =  router