const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//留言板块
const session = mongoose.model('session', {});


module.exports = session ;