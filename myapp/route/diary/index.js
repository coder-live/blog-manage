const express = require('express');
const router = express.Router();

const Diary = require('../../model/diary/diary');

router.post('/addDiary', (req, res) => {
  // console.log(req.body)
  let {content} = req.body;
  let imgUrl = req.body.imgUrl ? req.body.imgUrl : '';
  Diary.create({
    content,
    img: imgUrl
  }).then(data => {
    res.json({
      code: 0,
      msg: '添加成功'
    })
  }).catch(() => {
    res.json({
      code: 4,
      msg: '服务器错误,添加失败!'
    })
  })
})


module.exports = router