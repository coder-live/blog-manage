const express = require('express');
const router = express.Router();

const Friend = require('../../model/friend/friend');

router.post('/addFriend', (req, res) => {
  // console.log(req.body)
  let {title, icon, href, des} = req.body;
  Friend.create({title, icon, href, des}).then(data => {
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