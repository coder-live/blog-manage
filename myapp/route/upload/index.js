const express = require('express');
const path = require('path');
const router = express.Router();


let multer  = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/upload/artImg'))
  },
  //用于更改 文件格式
  filename: function (req, file, cb) {
    // console.log(file)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + /\.(jpg|png|jpeg|gif)$/i.exec(file.originalname)[0])
  }
});
//single 跟随文件名字
let upload = multer({ storage }).single('file');

router.post('/artImg', (req, res) => {
  upload(req, res, function (err) {
    
    if (err instanceof multer.MulterError) {
      res.sendStatus(500);
      return
      //  上传时发生Multer错误。
    } else if (err) {
      // 上传时发生未知错误。
      res.sendStatus(500);
      return
    }
    // Everything went fine.

    // console.log(req.file);
    
    res.status(200).json({
      code: 1,
      msg: '成功',
      data: 'http://localhost:3000/upload/artImg/' + req.file.filename
    });
  })
});

module.exports = router